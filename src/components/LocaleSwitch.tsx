import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { invoke } from "@tauri-apps/api/core";
import dayjs from "dayjs";
import { Button, Tooltip } from "ant-design-vue";

export default defineComponent({
  name: "LocaleSwitch",
  setup() {
    const { locale, t } = useI18n();

    const toggleLocale = async () => {
      const newLocale = locale.value === "zh-CN" ? "en-US" : "zh-CN";
      // 同步前端语言
      locale.value = newLocale;
      // 同步 dayjs 语言
      dayjs.locale(newLocale.toLowerCase().replace("-", "_"));
      // 同步后端语言
      await invoke("set_locale", { locale: newLocale });
    };

    return () => (
      <Tooltip title={t("locale.switch")} placement="bottom">
        <Button onClick={toggleLocale}>
          {locale.value === "zh-CN" ? "EN" : "中"}
        </Button>
      </Tooltip>
    );
  },
});
