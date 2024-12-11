use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum PluginError {
    #[error("Connection error: {0}")]
    Connection(String),
    #[error("Query error: {0}")]
    Query(String),
}

pub type Result<T> = std::result::Result<T, PluginError>;

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
pub trait DatabasePlugin: Send + Sync {
    async fn connect(&mut self, config: ConnectionConfig) -> Result<()>;
    async fn disconnect(&mut self) -> Result<()>;
    async fn query(&self, sql: &str) -> Result<QueryResult>;
    async fn execute(&self, sql: &str) -> Result<QueryResult>;
    fn get_capabilities(&self) -> Vec<Capability>;
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ConnectionConfig {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub database: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Capability {
    Transaction,
    PreparedStatement,
    BatchOperation,
    StoredProcedure,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PluginType {
    /// 内置插件，随应用一起打包
    Builtin,
    /// 外部插件，通过下载安装
    External,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginMetadata {
    pub name: String,
    pub version: String,
    pub plugin_type: PluginType,
    pub path: Option<String>,  // 外部插件的路径
    pub checksum: Option<String>,  // 外部插件的校验和
} 