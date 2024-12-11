import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("error.pageNotFound")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("error.backHome")}
        </Button>
      }
    />
  );
};

export default NotFound;
