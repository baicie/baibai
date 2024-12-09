mod common;

use baibai_core::{DatabaseConfig, QueryResult};
use common::setup;

#[tokio::test]
async fn test_database_connection() {
    let config = DatabaseConfig {
        host: "localhost".to_string(),
        port: 3306,
        username: "root".to_string(),
        password: "password".to_string(),
        database: None,
    };

    let result = baibai_core::test_connection(config).await;
    assert!(result.is_ok());
}

#[tokio::test]
async fn test_list_databases() {
    let config = DatabaseConfig {
        host: "localhost".to_string(),
        port: 3306,
        username: "root".to_string(),
        password: "password".to_string(),
        database: None,
    };

    let result = baibai_core::list_databases(config).await;
    assert!(result.is_ok());
    let databases = result.unwrap();
    assert!(!databases.is_empty());
} 