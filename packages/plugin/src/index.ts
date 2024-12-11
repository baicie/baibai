import type { Component } from "vue";

export interface PluginContext {
  i18n: {
    t: (key: string, params?: Record<string, any>) => string;
    locale: string;
  };
  theme: {
    isDark: boolean;
    primaryColor: string;
  };
  settings: {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
  };
}

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

// export type { Manifest } from "./schema/types";
// export { validateManifest } from "./schema/validator";

export * from "./types";
export * from "./store";
