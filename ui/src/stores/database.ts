import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";

interface Connection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
}

interface DatabaseState {
  connections: Connection[];
  currentConnection?: Connection;
  loading: boolean;
  addConnection: (connection: Omit<Connection, "id">) => Promise<void>;
  removeConnection: (id: string) => Promise<void>;
  setCurrentConnection: (connection: Connection) => void;
  loadConnections: () => Promise<void>;
}

export const useDatabaseStore = create<DatabaseState>((set) => ({
  connections: [],
  currentConnection: undefined,
  loading: false,

  addConnection: async (connection) => {
    set({ loading: true });
    try {
      const id = await invoke<string>("add_connection", connection);
      set((state) => ({
        connections: [...state.connections, { ...connection, id }],
      }));
    } finally {
      set({ loading: false });
    }
  },

  removeConnection: async (id) => {
    set({ loading: true });
    try {
      await invoke("remove_connection", { id });
      set((state) => ({
        connections: state.connections.filter((c) => c.id !== id),
      }));
    } finally {
      set({ loading: false });
    }
  },

  setCurrentConnection: (connection) => {
    set({ currentConnection: connection });
  },

  loadConnections: async () => {
    set({ loading: true });
    try {
      const connections = await invoke<Connection[]>("get_connections");
      set({ connections });
    } finally {
      set({ loading: false });
    }
  },
}));
