import { useCallback, FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { sendNewPassword } from "../../services/api/recoveryPassword";
import { NewPasswordPayload } from "../../services/api/recoveryPassword/types";
import { useForm } from "../../hooks";

import { PageLayout } from "../../components/PageLayout";
import { PasswordField } from "../../components/PasswordField";

import styles from "./ResetPassword.module.css";

export const ResetPassword = () => {
  const { values, handleChange } = useForm<NewPasswordPayload>({
    token: "",
    password: "",
  });

  const locationState = useLocation();
  const navigate = useNavigate();

  const previousLocationPathname: string | undefined =
    locationState?.state?.previousLocationPathname;

  let handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await sendNewPassword(values);
      if (res?.success) {
        navigate("/");
      }
    },
    [values, navigate]
  );

  useEffect(() => {
    if (previousLocationPathname !== "/forgot-password") {
      navigate("/");
    }
  }, [navigate, previousLocationPathname]);

  return (
    <PageLayout>
      <div className={styles.container}>
        <h2 className="text text_type_main-medium pb-6">
          Восстановление пароля
        </h2>
        <form onSubmit={handleSubmit}>
          <PasswordField handleChange={handleChange} value={values.password} />

          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            size={"default"}
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
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

export default ResetPassword;
