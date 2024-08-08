import cn from "classnames";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { initStart, close, historySelectors } from "../../services/history";

import { ProfileNavigation } from "../../components/ProfileNavigation";
import { PageLayout } from "../../components/PageLayout";
import { Feed } from "../../components/Feed";

import styles from "./History.module.css";

export const History = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(historySelectors.getHistory);

  useEffect(() => {
    dispatch(initStart());

    return () => {
      dispatch(close());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={cn(styles.nav, "mr-15 pt-30")}>
        <ProfileNavigation />
      </div>

      <div className={cn(styles.form, "pt-30")}>
        <div className={styles.scroll}>
          <ul className={cn(styles.list, "pl-1 pr-1 pt-3 pb-5")}>
            {history.orders.map((item) => {
              return (
                <li className={cn(styles.item, "pb-4")} key={item._id}>
                  <Feed {...item} route="/profile/orders" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default History;
