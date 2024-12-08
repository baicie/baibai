describe("Database Connection", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display connection form", () => {
    cy.get("select").should("exist");
    cy.get("button").contains("连接").should("exist");
  });

  it("should switch between MySQL and SQLite forms", () => {
    // 检查默认显示 MySQL 表单
    cy.get('input[placeholder="主机地址"]').should("be.visible");
    cy.get('input[placeholder="端口"]').should("be.visible");

    // 切换到 SQLite
    cy.get("select").select("sqlite");
    cy.get('input[placeholder="数据库文件路径"]').should("be.visible");
    cy.get('input[placeholder="主机地址"]').should("not.exist");
  });

  it("should attempt connection with valid MySQL credentials", () => {
    cy.get('input[placeholder="主机地址"]').type("localhost");
    cy.get('input[placeholder="端口"]').type("3306");
    cy.get('input[placeholder="用户名"]').type("root");
    cy.get('input[placeholder="密码"]').type("password");
    cy.get('input[placeholder="数据库名"]').type("test_db");

    cy.get("button").contains("连接").click();

    // 验证连接请求是否发送
    cy.window().its("console.log").should("be.called");
  });
});
