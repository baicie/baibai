import "@testing-library/jest-dom";
import { config } from "@vue/test-utils";
import { vi } from "vitest";

// 模拟 Tauri API
vi.mock("@tauri-apps/api", () => ({
  invoke: vi.fn(),
}));
