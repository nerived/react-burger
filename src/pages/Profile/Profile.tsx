import { FormEvent } from "react";
import cn from "classnames";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store";
import { userSelectors, userThunks } from "../../services";
import { UpdateUserPayload } from "../../services/api/user/types";

import { PageLayout } from "../../components/PageLayout";
import { ProfileNavigation } from "../../components/ProfileNavigation";

import styles from "./Profile.module.css";

export const Profile = () => {
  const { email, name } = useAppSelector(userSelectors.getUser);
  const dispatch = useAppDispatch();

  const { values, handleChange, reset, isChanged } = useForm<UpdateUserPayload>(
    {
      email: email,
      password: "",
      name: name,
    }
  );

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userThunks.updateUser(values));
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <PageLayout>
      <div className={cn(styles.nav, "mr-15 pt-30")}>
        <ProfileNavigation />
      </div>

      <form className={cn(styles.form, "pt-30")} onSubmit={handleSave}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name}
          name="name"
          size="default"
          extraClass="mb-6"
          icon="EditIcon"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          type="text"
          placeholder="Логин"
          onChange={handleChange}
          value={values.email}
          name="email"
          size="default"
          extraClass="mb-6"
          icon="EditIcon"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />

        <Input
          type="text"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password}
          name="password"
          size="default"
          extraClass="mb-6"
          icon="EditIcon"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        {isChanged && (
          <div className={styles.actions}>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </PageLayout>
  );
};

export default Profile;
