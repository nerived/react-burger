import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";

import { useAppDispatch } from "../../store";
import { logout } from "../../services/api/auth";
import { resetUser } from "../../services/user";

import styles from "./ProfileNavigation.module.css";

export const ProfileNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await logout();
    if (result?.success) {
      dispatch(resetUser());
      navigate("/login");
    }
  };

  return (
    <div className={styles.nav}>
      <NavLink
        to={"/profile"}
        end
        className={({ isActive }) =>
          isActive ? cn(styles.link, styles.linkActive) : styles.link
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to={"/profile/orders"}
        className={({ isActive }) =>
          isActive ? cn(styles.link, styles.linkActive) : styles.link
        }
      >
        История заказов
      </NavLink>
      <button
        onClick={handleLogout}
        className={cn(
          styles.btn,
          "btn pt-4 pb-4 text text_type_main-medium text_color_inactive"
        )}
      >
        Выход
      </button>
      <div className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};

export default ProfileNavigation;
