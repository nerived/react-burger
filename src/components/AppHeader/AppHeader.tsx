import cn from "classnames";
import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
    <header className={cn("p-4", styles.header)}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Button
            htmlType="button"
            extraClass={styles.button}
            type="secondary"
            size="medium"
          >
            <BurgerIcon type="primary" />
            <span className="pl-2 text text_type_main-default text_color_primary">
              Конструктор
            </span>
          </Button>

          <Button
            htmlType="button"
            extraClass={styles.button}
            type="secondary"
            size="medium"
          >
            <ListIcon type="secondary" />
            <span className="pl-2 text text_type_main-default text_color_inactive">
              Лента заказов
            </span>
          </Button>
        </div>
        <div className={styles.middle}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Button
            htmlType="button"
            extraClass={styles.button}
            type="secondary"
            size="medium"
          >
            <ProfileIcon type="secondary" />
            <span className="pl-2 text text_type_main-default text_color_inactive">
              Личный кабинет
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
