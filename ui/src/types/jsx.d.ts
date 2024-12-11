import { ComponentRenderProxy } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    AButton: (typeof import("ant-design-vue"))["Button"];
    ALayout: (typeof import("ant-design-vue"))["Layout"];
    ALayoutSider: (typeof import("ant-design-vue"))["LayoutSider"];
    ALayoutContent: (typeof import("ant-design-vue"))["LayoutContent"];
    ATree: (typeof import("ant-design-vue"))["Tree"];
    ATable: (typeof import("ant-design-vue"))["Table"];
    ASpace: (typeof import("ant-design-vue"))["Space"];
    ASwitch: (typeof import("ant-design-vue"))["Switch"];
  }
}
