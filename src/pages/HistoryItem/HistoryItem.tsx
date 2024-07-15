import cn from "classnames";

import { PageLayout } from "../../components/PageLayout";
import { ProfileNavigation } from "../../components/ProfileNavigation";

import styles from "./HistoryItem.module.css";

export const HistoryItem = () => {
  return (
    <PageLayout>
      <div className={cn(styles.nav, "mr-15 pt-30")}>
        <ProfileNavigation />
      </div>

      <div className={cn(styles.form, "pt-30")}>History Item Info</div>
    </PageLayout>
  );
};

export default HistoryItem;
