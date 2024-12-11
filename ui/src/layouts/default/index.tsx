import React from "react";
import { Layout, Space, Tabs, type TabsProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitch from "@/components/LocaleSwitch";
import DatabaseTree from "@/components/DatabaseTree";

const { Sider, Content } = Layout;

interface TabItem {
  key: string;
  label: string;
  route: string;
}

const DefaultLayout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = React.useState<TabItem[]>([]);
  const [activeKey, setActiveKey] = React.useState("");

  // 监听路由变化，更新标签页
  React.useEffect(() => {
    const pathname = location.pathname;
    const routeName = pathname === "/" ? "query" : pathname.slice(1);
    setActiveKey(routeName);

    // 如果标签不存在则添加
    if (!tabs.some((tab) => tab.key === routeName)) {
      setTabs((prev) => [
        ...prev,
        {
          key: routeName,
          label: t(`menu.${routeName}`),
          route: pathname,
        },
      ]);
    }
  }, [location, t]);

  // 切换标签页
  const handleTabChange = (key: string) => {
    const tab = tabs.find((tab) => tab.key === key);
    if (tab) {
      navigate(tab.route);
    }
  };

  // 关闭标签页
  const handleTabEdit: TabsProps["onEdit"] = (
    targetKey,
    action
  ) => {
    if (action === "remove" && typeof targetKey === "string") {
      const targetIndex = tabs.findIndex((tab) => tab.key === targetKey);
      if (targetIndex === -1) return;

      const newTabs = tabs.filter((tab) => tab.key !== targetKey);
      setTabs(newTabs);

      // 如果关闭的是当前标签，切换到前一个标签
      if (targetKey === activeKey) {
        const newActiveKey = newTabs[targetIndex - 1]?.key || newTabs[0]?.key;
        if (newActiveKey) {
          const tab = newTabs.find((tab) => tab.key === newActiveKey);
          if (tab) {
            navigate(tab.route);
          }
        }
      }
    }
  };

  return (
    <Layout className="h-screen">
      <Sider width={250} className="bg-white">
        {/* 顶部工具栏 */}
        <div className="p-4 border-b">
          <Space>
            <ThemeSwitch />
            <LocaleSwitch />
          </Space>
        </div>
        {/* 数据库树 */}
        <div className="flex-1 overflow-auto p-4">
          <DatabaseTree />
        </div>
      </Sider>
      <Layout>
        <Content className="flex flex-col">
          <Tabs
            type="editable-card"
            activeKey={activeKey}
            onChange={handleTabChange}
            onEdit={handleTabEdit}
            className="border-b px-4"
            hideAdd
            items={tabs.map((tab) => ({
              key: tab.key,
              label: tab.label,
              closable: true,
            }))}
          />
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
