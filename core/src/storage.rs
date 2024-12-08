use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tauri_plugin_sql::{Migration, MigrationKind, SqlitePool};

#[derive(Debug, Serialize, Deserialize)]
pub struct DbConnection {
    pub id: i64,
    pub name: String,
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub database: Option<String>,
}

pub struct Storage {
    pool: SqlitePool,
}

impl Storage {
    pub async fn new(app: &AppHandle) -> Result<Self, Box<dyn std::error::Error>> {
        let migrations = vec![Migration {
            version: 1,
            description: "Create connections table",
            sql: "CREATE TABLE IF NOT EXISTS connections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                host TEXT NOT NULL,
                port INTEGER NOT NULL,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                database TEXT
            )",
            kind: MigrationKind::Up,
        }];

        let pool = SqlitePool::connect("sqlite:connections.db", migrations).await?;

        Ok(Self { pool })
    }

    pub async fn add_connection(&self, connection: &DbConnection) -> Result<i64, Box<dyn std::error::Error>> {
        let result = sqlx::query(
            "INSERT INTO connections (name, host, port, username, password, database)
             VALUES (?, ?, ?, ?, ?, ?)",
        )
        .bind(&connection.name)
        .bind(&connection.host)
        .bind(connection.port)
        .bind(&connection.username)
        .bind(&connection.password)
        .bind(&connection.database)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn list_connections(&self) -> Result<Vec<DbConnection>, Box<dyn std::error::Error>> {
        let connections = sqlx::query_as!(
            DbConnection,
            "SELECT id, name, host, port, username, password, database
             FROM connections"
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(connections)
    }

    pub async fn update_connection(&self, connection: &DbConnection) -> Result<(), Box<dyn std::error::Error>> {
        sqlx::query(
            "UPDATE connections 
             SET name = ?, host = ?, port = ?, username = ?, password = ?, database = ?
             WHERE id = ?",
        )
        .bind(&connection.name)
        .bind(&connection.host)
        .bind(connection.port)
        .bind(&connection.username)
        .bind(&connection.password)
        .bind(&connection.database)
        .bind(connection.id)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn delete_connection(&self, id: i64) -> Result<(), Box<dyn std::error::Error>> {
        sqlx::query("DELETE FROM connections WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(())
    }
} 