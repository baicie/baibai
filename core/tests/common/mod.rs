use std::sync::Once;
use sqlx::MySqlPool;

static INIT: Once = Once::new();

pub async fn setup() -> MySqlPool {
    INIT.call_once(|| {
        // 初始化日志等
        env_logger::init();
    });

    // 创建测试数据库连接
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "mysql://root:password@localhost:3306/test".to_string());
    
    MySqlPool::connect(&database_url)
        .await
        .expect("Failed to connect to database")
}

pub async fn cleanup(pool: &MySqlPool) {
    // 清理测试数据
    sqlx::query("DROP DATABASE IF EXISTS test")
        .execute(pool)
        .await
        .expect("Failed to cleanup test database");
} 