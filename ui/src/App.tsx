import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { ConfigProvider } from "ant-design-vue";
import { usePlugins } from "./plugins";
import { useThemeProvider } from "./composables/useThemeProvider";
import { useLocaleProvider } from "./composables/useLocaleProvider";

export default defineComponent({
  name: "App",
  setup() {
    usePlugins();
    const { isDark, antdTheme } = useThemeProvider();
    const { antdLocale } = useLocaleProvider();

    return () => (
      <ConfigProvider theme={antdTheme} locale={antdLocale.value}>
        <div class={`app ${isDark.value ? "dark" : "light"}`}>
          <RouterView />
        </div>
      </ConfigProvider>
    );
  },
});
