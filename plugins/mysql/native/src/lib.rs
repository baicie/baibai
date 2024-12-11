mod connection;
mod query;

use async_trait::async_trait;
use baibai_plugin_core::{DatabasePlugin, QueryResult, Value, ConnectionConfig, Result, PluginError};
use connection::MySQLConnection;

#[derive(Default)]
pub struct MySQLPlugin {
    connection: Option<MySQLConnection>,
}

#[async_trait]
impl DatabasePlugin for MySQLPlugin {
    async fn connect(&mut self, config: ConnectionConfig) -> Result<()> {
        let conn = MySQLConnection::new(config).await?;
        self.connection = Some(conn);
        Ok(())
    }

    async fn disconnect(&mut self) -> Result<()> {
        if let Some(conn) = self.connection.take() {
            conn.disconnect().await?;
        }
        Ok(())
    }

    async fn query(&self, sql: &str) -> Result<QueryResult> {
        let conn = self.connection.as_ref()
            .ok_or_else(|| PluginError::Connection("Not connected".into()))?;
        conn.query(sql).await
    }

    async fn execute(&self, sql: &str) -> Result<QueryResult> {
        let conn = self.connection.as_ref()
            .ok_or_else(|| PluginError::Connection("Not connected".into()))?;
        conn.execute(sql).await
    }

    fn get_capabilities(&self) -> Vec<Capability> {
        vec![
            Capability::Transaction,
            Capability::PreparedStatement,
            Capability::BatchOperation,
            Capability::StoredProcedure,
        ]
    }
} 