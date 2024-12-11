import type { Component } from "vue";
import { PluginContext } from "./types";

export interface PluginComponents {
  editor?: Component;
  viewer?: Component;
  settings?: Component;
}

export interface Plugin {
  name: string;
  version: string;
  init: (context: PluginContext) => Promise<void>;
  destroy: () => Promise<void>;
  getComponents: () => PluginComponents;
}

export interface DatabasePlugin extends Plugin {
  connect: (config: ConnectionConfig) => Promise<void>;
  disconnect: () => Promise<void>;
  query: (sql: string) => Promise<QueryResult>;
  execute: (sql: string) => Promise<QueryResult>;
  getCapabilities: () => Capability[];
}

export interface ConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
}

export interface QueryResult {
  columns: string[];
  rows: any[][];
  affectedRows: number;
}

export enum Capability {
  Transaction = "transaction",
  PreparedStatement = "prepared_statement",
  BatchOperation = "batch_operation",
  StoredProcedure = "stored_procedure",
}

export * from "./types";
export * from "./store";
export * from "./PluginManager";
export * from "./BasePlugin";
export * from "./context";
export { usePluginContext } from "./hooks/usePluginContext";
export { useContextProvider } from "./hooks/useContextProvider";
