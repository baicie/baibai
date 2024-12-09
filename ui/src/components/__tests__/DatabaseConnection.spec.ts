import { render, fireEvent, screen } from "@testing-library/vue";
import { createI18n } from "vue-i18n";
import DatabaseConnection from "../DatabaseConnection.vue";
import { messages } from "../../i18n";

const i18n = createI18n({
  legacy: false,
  locale: "zh-CN",
  messages,
});

describe("DatabaseConnection", () => {
  test("renders database type selector", () => {
    render(DatabaseConnection, {
      global: {
        plugins: [i18n],
      },
    });

    expect(screen.getByText("MySQL")).toBeInTheDocument();
    expect(screen.getByText("SQLite")).toBeInTheDocument();
  });

  test("shows MySQL form fields when MySQL is selected", async () => {
    render(DatabaseConnection, {
      global: {
        plugins: [i18n],
      },
    });

    const select = screen.getByRole("combobox");
    await fireEvent.update(select, "mysql");

    expect(screen.getByPlaceholderText("主机地址")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("端口")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("用户名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("密码")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("数据库名")).toBeInTheDocument();
  });
});
