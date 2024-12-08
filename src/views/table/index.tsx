import { defineComponent, ref } from "vue";
import { Tabs } from "ant-design-vue";
import TableStructure from "./components/TableStructure";
import TableData from "./components/TableData";
import TableER from "./components/TableER";

const { TabPane } = Tabs;

export default defineComponent({
  name: "TableDetail",
  setup() {
    const activeTab = ref("structure");

    return () => (
      <div class="table-detail">
        <Tabs v-model:activeKey={activeTab.value}>
          <TabPane key="structure" tab="结构">
            <TableStructure />
          </TabPane>
          <TabPane key="data" tab="数据">
            <TableData />
          </TabPane>
          <TabPane key="er" tab="ER图">
            <TableER />
          </TabPane>
        </Tabs>
      </div>
    );
  },
});
