mod storage;
use crate::storage::{DbConnection, Storage};
use async_trait::async_trait;
use once_cell::sync::Lazy;
use rust_i18n::t;
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPoolOptions;
use std::error::Error;
use std::sync::Mutex;
use tauri::State;

pub type DbResult<T> = Result<T, Box<dyn Error + Send + Sync>>;

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryResult {
    pub columns: Vec<String>,
    pub rows: Vec<Vec<Value>>,
    pub affected_rows: u64,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum Value {
    Null,
    Bool(bool),
    Int(i64),
    Float(f64),
    String(String),
    Bytes(Vec<u8>),
}

#[async_trait]
pub trait DatabaseDriver: Send + Sync {
    async fn connect(&mut self) -> DbResult<()>;
    async fn disconnect(&mut self) -> DbResult<()>;
    async fn execute(&self, sql: &str) -> DbResult<QueryResult>;
    async fn query(&self, sql: &str) -> DbResult<QueryResult>;
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DatabaseConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub database: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct TestResult {
    pub success: bool,
    pub message: String,
}

impl DatabaseConfig {
    pub fn to_url(&self) -> String {
        let database = self.database.as_deref().unwrap_or("");
        format!(
            "mysql://{}:{}@{}:{}/{}",
            self.username, self.password, self.host, self.port, database
        )
    }
}

// 设置翻译文件路径
rust_i18n::i18n!("locales");

// 全局语言设置
static LOCALE: Lazy<Mutex<String>> = Lazy::new(|| Mutex::new("zh-CN".to_string()));

// 设置当前语言
#[tauri::command(rename_all = "snake_case")]
pub fn core_set_locale(locale: String) {
    let mut current = LOCALE.lock().unwrap();
    *current = locale;
    rust_i18n::set_locale(&current);
}

// 获取当前语言
#[tauri::command(rename_all = "snake_case")]
pub fn core_get_locale() -> String {
    LOCALE.lock().unwrap().clone()
}

#[tauri::command]
pub async fn test_connection(config: DatabaseConfig) -> Result<TestResult, String> {
    let pool = MySqlPoolOptions::new()
        .max_connections(1)
        .connect_timeout(std::time::Duration::from_secs(5))
        .connect(&config.to_url())
        .await;

    match pool {
        Ok(_) => Ok(TestResult {
            success: true,
            message: t!("database.connection.success"),
        }),
        Err(e) => Ok(TestResult {
            success: false,
            message: t!("database.connection.failed", error = e.to_string()),
        }),
    }
}

#[tauri::command]
pub async fn list_databases(config: DatabaseConfig) -> Result<Vec<String>, String> {
    let pool = MySqlPoolOptions::new()
        .max_connections(1)
        .connect(&config.to_url())
        .await
        .map_err(|e| t!("database.list.failed", error = e.to_string()))?;

    let rows = sqlx::query("SHOW DATABASES")
        .fetch_all(&pool)
        .await
        .map_err(|e| t!("database.list.failed", error = e.to_string()))?;

    let databases: Vec<String> = rows.iter().map(|row| row.get::<String, _>(0)).collect();

    if databases.is_empty() {
        return Err(t!("database.list.empty"));
    }

    Ok(databases)
}

#[tauri::command]
pub async fn list_tables(config: DatabaseConfig) -> Result<Vec<TableInfo>, String> {
    let database = config
        .database
        .as_deref()
        .ok_or_else(|| t!("database.tables.no_database"))?;
    let pool = MySqlPoolOptions::new()
        .max_connections(1)
        .connect(&config.to_url())
        .await
        .map_err(|e| t!("database.tables.failed", error = e.to_string()))?;

    let rows = sqlx::query(
        r#"
        SELECT 
            table_name,
            table_type,
            engine,
            table_comment
        FROM information_schema.tables 
        WHERE table_schema = ?
        "#,
    )
    .bind(database)
    .fetch_all(&pool)
    .await
    .map_err(|e| e.to_string())?;

    let tables = rows
        .iter()
        .map(|row| TableInfo {
            name: row.get(0),
            table_type: row.get(1),
            engine: row.get(2),
            comment: row.get(3),
        })
        .collect::<Vec<_>>();

    if tables.is_empty() {
        return Err(t!("database.tables.empty", database = database));
    }

    Ok(tables)
}

#[derive(Debug, Serialize)]
pub struct TableInfo {
    pub name: String,
    pub table_type: String,
    pub engine: String,
    pub comment: String,
}

#[derive(Debug, Serialize)]
pub struct ColumnInfo {
    pub name: String,
    pub column_type: String,
    pub nullable: bool,
    pub key: String,
    pub default: Option<String>,
    pub extra: String,
    pub comment: String,
}

#[tauri::command]
pub async fn get_table_columns(
    config: DatabaseConfig,
    table_name: String,
) -> Result<Vec<ColumnInfo>, String> {
    let database = config.database.as_deref().ok_or("未指定数据库")?;
    let pool = MySqlPoolOptions::new()
        .max_connections(1)
        .connect(&config.to_url())
        .await
        .map_err(|e| e.to_string())?;

    let rows = sqlx::query(
        r#"
        SELECT 
            column_name,
            column_type,
            is_nullable,
            column_key,
            column_default,
            extra,
            column_comment
        FROM information_schema.columns
        WHERE table_schema = ? AND table_name = ?
        ORDER BY ordinal_position
        "#,
    )
    .bind(database)
    .bind(table_name)
    .fetch_all(&pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(rows
        .iter()
        .map(|row| ColumnInfo {
            name: row.get(0),
            column_type: row.get(1),
            nullable: row.get::<String, _>(2) == "YES",
            key: row.get(3),
            default: row.get(4),
            extra: row.get(5),
            comment: row.get(6),
        })
        .collect())
}

// 全局存储实例
pub struct StorageState(pub Mutex<Storage>);

#[tauri::command]
pub async fn save_connection(
    state: State<'_, StorageState>,
    connection: DbConnection,
) -> Result<i64, String> {
    let storage = state.0.lock().unwrap();
    storage
        .add_connection(&connection)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn list_connections(state: State<'_, StorageState>) -> Result<Vec<DbConnection>, String> {
    let storage = state.0.lock().unwrap();
    storage.list_connections().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_connection(
    state: State<'_, StorageState>,
    connection: DbConnection,
) -> Result<(), String> {
    let storage = state.0.lock().unwrap();
    storage
        .update_connection(&connection)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_connection(state: State<'_, StorageState>, id: i64) -> Result<(), String> {
    let storage = state.0.lock().unwrap();
    storage.delete_connection(id).map_err(|e| e.to_string())
}
