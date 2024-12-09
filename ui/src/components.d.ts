import type { DefineComponent } from "vue";
import type {
  Layout,
  Button,
  Switch,
  Space,
  Tooltip,
  Tabs,
} from "ant-design-vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ALayout: typeof Layout;
    ALayoutSider: typeof Layout.Sider;
    ALayoutContent: typeof Layout.Content;
    AButton: typeof Button;
    ASwitch: typeof Switch;
    ASpace: typeof Space;
    ATooltip: typeof Tooltip;
    ATabs: typeof Tabs;
    ATabPane: typeof Tabs.TabPane;
    RouterView: DefineComponent<{}, {}, any>;
  }
}

export {};
