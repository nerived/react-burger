import { Link } from "react-router-dom";
import cn from "classnames";

import { ProfileNavigation } from "../../components/ProfileNavigation";
import { PageLayout } from "../../components/PageLayout";

import styles from "./History.module.css";

export const History = () => {
  return (
    <PageLayout>
      <div className={cn(styles.nav, "mr-15 pt-30")}>
        <ProfileNavigation />
      </div>

      <div className={cn(styles.form, "pt-30")}>
        <Link to={"/profile/orders/1"}>HistoryItem</Link>
      </div>
    </PageLayout>
  );
};

export default History;
