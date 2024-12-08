import { defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { Layout, Space, Tabs } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitch from "@/components/LocaleSwitch";
import DatabaseTree from "@/components/DatabaseTree";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export interface TabItem {
  key: string;
  label: string;
  closable: boolean;
  route: {
    name: string;
    params?: Record<string, string>;
    query?: Record<string, string>;
  };
}

export default defineComponent({
  name: "DefaultLayout",
  setup() {
    const { t } = useI18n();
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);
    const route = useRoute();
    const router = useRouter();

    // 管理打开的标签页
    const activeKey = ref(route.name as string);
    const tabs = ref<TabItem[]>([
      {
        key: "query",
        label: t("menu.query"),
        closable: false,
        route: { name: "query" },
      },
    ]);

    // 切换标签页
    const onTabChange = (key: string) => {
      const tab = tabs.value.find((tab) => tab.key === key);
      if (tab) {
        router.push(tab.route);
      }
    };

    // 关闭标签页
    const onTabEdit = (
      targetKey: string | MouseEvent,
      action: "add" | "remove"
    ) => {
      if (action === "remove" && typeof targetKey === "string") {
        const targetIndex = tabs.value.findIndex(
          (tab) => tab.key === targetKey
        );
        if (targetIndex === -1) return;

        tabs.value = tabs.value.filter((tab) => tab.key !== targetKey);

        // 如果关闭的是当前标签,切换到前一个标签
        if (targetKey === activeKey.value) {
          const newActiveKey =
            tabs.value[targetIndex - 1]?.key ||
            tabs.value[targetIndex]?.key ||
            "query";
          activeKey.value = newActiveKey;
          onTabChange(newActiveKey);
        }
      }
    };

    // 监听路由变化,添加新标签
    watch(
      () => route.name,
      (newName) => {
        if (!newName) return;

        activeKey.value = newName as string;

        // 如果标签不存在则添加
        if (!tabs.value.some((tab) => tab.key === newName)) {
          tabs.value.push({
            key: newName as string,
            label: t(`menu.${newName as string}`),
            closable: newName !== "query",
            route: {
              name: newName as string,
              params: route.params as Record<string, string>,
              query: route.query as Record<string, string>,
            },
          });
        }
      },
      { immediate: true }
    );

    return () => (
      <Layout class="h-screen flex">
        <Sider
          theme={isDark.value ? "dark" : "light"}
          class="border-r flex flex-col"
          width={280}
        >
          {/* 顶部工具栏 */}
          <div class="p-4 border-b">
            <Space>
              <ThemeSwitch />
              <LocaleSwitch />
            </Space>
          </div>
          {/* 数据库树 */}
          <div class="flex-1 overflow-auto p-4">
            <DatabaseTree />
          </div>
        </Sider>
        <Layout class="flex flex-col">
          <Content class="flex-1 flex flex-col">
            <Tabs
              v-model:activeKey={activeKey.value}
              type="editable-card"
              hideAdd
              class="flex-none border-b px-2"
              onChange={onTabChange}
              onEdit={onTabEdit}
            >
              {tabs.value.map((tab) => (
                <TabPane
                  key={tab.key}
                  tab={tab.label}
                  closable={tab.closable}
                />
              ))}
            </Tabs>
            <div class="flex-1 overflow-auto">
              <router-view />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  },
});
