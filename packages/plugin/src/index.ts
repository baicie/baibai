import { Component } from "react";
import { PluginComponents, PluginContext } from "./types";
import { PluginManager } from "./PluginManager";

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
export * from "./hooks/usePluginContext";
export { PluginManager };
