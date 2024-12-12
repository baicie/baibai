import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
      toggleTheme: () =>
        set((state) => {
          const newIsDark = !state.isDark;
          document.documentElement.classList.toggle("dark", newIsDark);
          return { isDark: newIsDark };
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);

// 监听系统主题变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    useThemeStore.setState({ isDark: e.matches });
    document.documentElement.classList.toggle("dark", e.matches);
  });
