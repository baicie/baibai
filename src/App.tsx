import { defineComponent, watch, computed } from "vue";
import { RouterView } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { ConfigProvider } from "ant-design-vue";
import { theme } from "ant-design-vue/es";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";

export default defineComponent({
  name: "App",
  setup() {
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);
    const { locale } = useI18n();

    // Ant Design Vue 的主题配置
    const antdTheme = {
      algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        borderRadius: 4,
        colorPrimary: "#1890ff",
      },
    };

    // 监听主题变化
    watch(isDark, (newValue) => {
      antdTheme.algorithm = newValue
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm;
    });

    // 根据当前语言返回对应的 Ant Design Vue 语言包
    const antdLocale = computed(() => {
      return locale.value === "zh-CN" ? zhCN : enUS;
    });

    return () => (
      <ConfigProvider theme={antdTheme} locale={antdLocale.value}>
        <div class={`app ${isDark.value ? "dark" : "light"}`}>
          <RouterView />
        </div>
      </ConfigProvider>
    );
  },
});
