import { defineComponent } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "ThemeSwitch",
  setup() {
    const { t } = useI18n();
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);

    return () => (
      <a-tooltip
        title={t(`theme.${isDark.value ? "light" : "dark"}`)}
        placement="bottom"
      >
        <a-switch
          checked={isDark.value}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          onChange={themeStore.toggleTheme}
        />
      </a-tooltip>
    );
  },
});
