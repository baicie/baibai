import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";

export default defineComponent({
  name: "LocaleSwitch",
  setup() {
    const { locale, t } = useI18n();

    const toggleLocale = () => {
      const newLocale = locale.value === "zh-CN" ? "en-US" : "zh-CN";
      locale.value = newLocale;
      // 同步切换 dayjs 的语言
      dayjs.locale(newLocale.toLowerCase().replace("-", "_"));
    };

    return () => (
      <a-tooltip title={t("locale.switch")} placement="bottom">
        <a-button onClick={toggleLocale}>
          {locale.value === "zh-CN" ? "EN" : "中"}
        </a-button>
      </a-tooltip>
    );
  },
});
