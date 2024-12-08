import Layout from "../../src/views/Layout";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { messages } from "../../src/i18n";

describe("ThemeSwitch", () => {
  it("toggles theme", () => {
    cy.mount(Layout, {
      global: {
        plugins: [
          createPinia(),
          createI18n({
            legacy: false,
            locale: "zh-CN",
            messages,
          }),
        ],
      },
    });

    // 检查默认主题
    cy.get(".ant-switch").should("not.have.class", "ant-switch-checked");

    // 切换主题
    cy.get(".ant-switch").click();
    cy.get(".ant-switch").should("have.class", "ant-switch-checked");
  });
});
