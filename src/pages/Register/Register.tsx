import { useCallback, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch } from "../../store";
import { sendRegisterForm } from "../../services/api/auth";
import { RegisterPayload } from "../../services/api/auth/types";
import { setUser } from "../../services/user";
import { useForm } from "../../hooks";

import { PageLayout } from "../../components/PageLayout";
import { PasswordField } from "../../components/PasswordField";

import styles from "./Register.module.css";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm<RegisterPayload>({
    email: "",
    password: "",
    name: "",
  });

  let handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await sendRegisterForm(values);

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
        <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            size={"default"}
            extraClass="mb-6"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div className="pb-20" />
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>{" "}
          <Link to={"/login"} className="text text_type_main-default">
            Войти
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Register;
