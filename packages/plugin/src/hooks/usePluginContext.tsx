import React, { createContext, useContext } from "react";
import type { PluginContext } from "../types";

const PluginContextInstance = createContext<PluginContext | null>(null);

export function usePluginContext() {
  const context = useContext(PluginContextInstance);
  if (!context) {
    throw new Error(
      "usePluginContext must be used within a PluginContextProvider"
    );
  }
  return context;
}

export function PluginContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: PluginContext;
}) {
  return (
    <PluginContextInstance.Provider value={value}>
      {children}
    </PluginContextInstance.Provider>
  );
}
