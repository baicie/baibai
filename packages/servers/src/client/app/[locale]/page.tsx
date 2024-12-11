import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Card, Row, Col, Statistic } from "antd";
import {
  DatabaseOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConnectionList } from "@/components/ConnectionList";
import { TeamList } from "@/components/TeamList";
import { Loading } from "@/components/Loading";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title={t("totalConnections")}
              value={15}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={t("totalTeams")}
              value={3}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={t("totalMembers")}
              value={12}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <h2 className="mb-4">{t("recentConnections")}</h2>
        <Suspense fallback={<Loading />}>
          <ConnectionList />
        </Suspense>
      </div>

      <div className="mt-6">
        <h2 className="mb-4">{t("myTeams")}</h2>
        <Suspense fallback={<Loading />}>
          <TeamList />
        </Suspense>
      </div>
    </div>
  );
}
