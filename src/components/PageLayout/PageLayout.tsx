import { PropsWithChildren } from "react";
import cn from "classnames";

import { AppHeader } from "../../components/AppHeader";

import styles from "./PageLayout.module.css";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AppHeader />
      <main className={cn(styles.main, "pb-4")}>{children}</main>
    </>
  );
};

export default PageLayout;
