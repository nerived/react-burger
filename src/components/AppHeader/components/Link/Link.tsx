import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Link.module.css";

type LinkProps = {
  Icon: ({ type }: { type: any }) => ReactElement; //Didn't export TIconProps type from ya lib
  text: string;
  to: string;
};

export const Link = ({ Icon, text, to }: LinkProps) => {
  return (
    <NavLink to={to} className={styles.link}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <span
            className={`pl-2 text text_type_main-default ${
              isActive ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Link;
