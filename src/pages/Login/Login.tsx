import { useCallback, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { LoginPayload } from "../../services/api/auth/types";

import { useAppDispatch } from "../../store";
import { useForm } from "../../hooks";

import { sendLoginForm } from "../../services/api/auth";
import { setUser } from "../../services/user";

import { PageLayout } from "../../components/PageLayout";
import { PasswordField } from "../../components/PasswordField";

import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm<LoginPayload>({
    email: "",
    password: "",
  });

  let handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await sendLoginForm(values);

      if (res?.success) {
        dispatch(setUser(res.user));
        navigate("/");
      }
    },
    [values, navigate, dispatch]
  );

  return (
    <PageLayout>
      <div className={styles.container}>
        <h2 className="text text_type_main-medium pb-6">Вход</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            size={"default"}
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <PasswordField handleChange={handleChange} value={values.password} />

          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>

        <div className="pb-20" />
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </span>{" "}
          <Link to={"/register"} className="text text_type_main-default">
            Зарегистрироваться
          </Link>
        </div>
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>{" "}
          <Link to={"/forgot-password"} className="text text_type_main-default">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
