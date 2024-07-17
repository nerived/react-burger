import { useNavigate } from "react-router-dom";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { PageLayout } from "../../components/PageLayout";

import styles from "./NotFound.module.css";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleOnClickBtn = () => {
    navigate("/");
  };

  return (
    <PageLayout>
      <div className={styles.container}>
        <h2 className="text text_type_main-medium pb-6">404</h2>
        <div className="pb-6" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleOnClickBtn}
        >
          На главную
        </Button>
      </div>
    </PageLayout>
  );
};

export default NotFound;
