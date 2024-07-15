import { useCallback, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ForgotPasswordPayload } from "../../services/api/recoveryPassword/types";
import { sendForgotPassword } from "../../services/api/recoveryPassword";
import { PageLayout } from "../../components/PageLayout";
import { useForm } from "../../hooks";

import styles from "./ForgotPassword.module.css";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm<ForgotPasswordPayload>({
    email: "",
  });

  let handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await sendForgotPassword(values);

      if (res?.success) {
        navigate("/reset-password", {
          state: { previousLocationPathname: window.location.pathname },
        });
      }
    },
    [values, navigate]
  );

  return (
    <PageLayout>
      <div className={styles.container}>
        <h2 className="text text_type_main-medium pb-6">
          Восстановление пароля
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            size={"default"}
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>

        <div className="pb-20" />
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>{" "}
          <Link to={"/login"} className="text text_type_main-default">
            Войти
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
