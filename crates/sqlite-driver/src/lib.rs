use async_trait::async_trait;
use rusqlite::Connection;
use sql_gui_core::{DatabaseDriver, DbResult, QueryResult, Value};
use tokio::sync::Mutex;

pub struct SQLiteDriver {
    conn: Option<Mutex<Connection>>,
    path: String,
}

impl SQLiteDriver {
    pub fn new(path: String) -> Self {
        Self {
            conn: None,
            path,
        }
    }
}

#[async_trait]
impl DatabaseDriver for SQLiteDriver {
    async fn connect(&mut self) -> DbResult<()> {
        let conn = Connection::open(&self.path)?;
        self.conn = Some(Mutex::new(conn));
        Ok(())
    }

    async fn disconnect(&mut self) -> DbResult<()> {
        self.conn = None;
        Ok(())
    }

    async fn execute(&self, sql: &str) -> DbResult<QueryResult> {
        // 实现 SQLite 执行逻辑
        todo!()
    }

    async fn query(&self, sql: &str) -> DbResult<QueryResult> {
        // 实现 SQLite 查询逻辑
        todo!()
    }
} 