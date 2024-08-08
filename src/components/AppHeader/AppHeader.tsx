import cn from "classnames";
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link as RouterLink } from "react-router-dom";

import { Link } from "./components/Link";

import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={cn("p-4", styles.header)}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link Icon={BurgerIcon} to="/" text={"Конструктор"} />
          <Link Icon={ListIcon} to="/feed" text={"Лента заказов"} />
        </div>
        <div className={styles.middle}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </div>
        <div className={styles.right}>
          <Link Icon={ProfileIcon} to="/profile" text={"Личный кабинет"} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
