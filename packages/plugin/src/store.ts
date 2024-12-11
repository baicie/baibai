import type {
  PluginMetadata,
  PluginInstallOptions,
  PluginError,
} from "./types";

export interface PluginStore {
  // 获取可用插件列表
  listAvailable(): Promise<PluginMetadata[]>;

  // 获取已安装插件
  listInstalled(): Promise<PluginMetadata[]>;

  // 安装插件
  install(id: string, options?: PluginInstallOptions): Promise<void>;

  // 卸载插件
  uninstall(id: string): Promise<void>;

  // 更新插件
  update(id: string): Promise<void>;
}

export class DefaultPluginStore implements PluginStore {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async listAvailable(): Promise<PluginMetadata[]> {
    const response = await fetch(`${this.apiUrl}/plugins`);
    if (!response.ok) {
      throw this.createError(
        "FETCH_ERROR",
        "Failed to fetch available plugins"
      );
    }
    return response.json();
  }

  async listInstalled(): Promise<PluginMetadata[]> {
    const response = await fetch(`${this.apiUrl}/plugins/installed`);
    if (!response.ok) {
      throw this.createError(
        "FETCH_ERROR",
        "Failed to fetch installed plugins"
      );
    }
    return response.json();
  }

  async install(id: string, options: PluginInstallOptions = {}): Promise<void> {
    const response = await fetch(`${this.apiUrl}/plugins/${id}/install`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw this.createError("INSTALL_ERROR", "Failed to install plugin");
    }
  }

  async uninstall(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/plugins/${id}/uninstall`, {
      method: "POST",
    });

    if (!response.ok) {
      throw this.createError("UNINSTALL_ERROR", "Failed to uninstall plugin");
    }
  }

  async update(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/plugins/${id}/update`, {
      method: "POST",
    });

    if (!response.ok) {
      throw this.createError("UPDATE_ERROR", "Failed to update plugin");
    }
  }

  private createError(
    code: string,
    message: string,
    details?: any
  ): PluginError {
    const error = new Error(message) as PluginError;
    error.code = code;
    error.details = details;
    return error;
  }
}
