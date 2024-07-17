import { useState, useRef, ChangeEvent } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

type PasswordFieldProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const PasswordField = ({ handleChange, value }: PasswordFieldProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickIcon = () => {
    inputRef.current?.focus();
    setIsShowPassword(!isShowPassword);
  };

  return (
    <Input
      type={isShowPassword ? "text" : "password"}
      placeholder={"Пароль"}
      onChange={handleChange}
      icon={isShowPassword ? "ShowIcon" : "HideIcon"}
      value={value}
      name={"password"}
      error={false}
      ref={inputRef}
      errorText={"Ошибка"}
      onIconClick={handleClickIcon}
      size={"default"}
      extraClass="mb-6"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
  );
};

export default PasswordField;
