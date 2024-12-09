import { defineComponent } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { Switch, Tooltip } from "ant-design-vue";

export default defineComponent({
  name: "ThemeSwitch",
  setup() {
    const { t } = useI18n();
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);

    return () => (
      <Tooltip
        title={t(`theme.${isDark.value ? "light" : "dark"}`)}
        placement="bottom"
      >
        <Switch
          checked={isDark.value}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          onChange={themeStore.toggleTheme}
        />
      </Tooltip>
    );
  },
});
