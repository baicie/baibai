import { computed } from "vue";
import { useI18n } from "vue-i18n";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";

export function useLocaleProvider() {
  const { locale } = useI18n();

  const antdLocale = computed(() => {
    return locale.value === "zh-CN" ? zhCN : enUS;
  });

  return {
    locale,
    antdLocale,
  };
}
