import cn from "classnames";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { initStart, close, feedsSelectors } from "../../services/feeds";

import { PageLayout } from "../../components/PageLayout";
import { Feed } from "../../components/Feed";
import { FeedBoard } from "../../components/FeedBoard";

import styles from "./FeedList.module.css";

export const FeedList = () => {
  const feeds = useAppSelector(feedsSelectors.getFeeds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initStart());

    return () => {
      dispatch(close());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={cn(styles.left, "pl-5 pr-5 pt-10")}>
        <h2 className="text text_type_main-large">Лента заказов</h2>
        <div className="pt-5" />
        <div className={styles.scroll}>
          <ul className={cn(styles.list, "pl-1 pr-1 pt-3 pb-5")}>
            {feeds.orders.map((item) => {
              return (
                <li className={cn(styles.item, "pb-4")} key={item._id}>
                  <Feed {...item} route="/feed" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={cn(styles.right, "pl-5 pr-5 pt-25")}>
        <FeedBoard />
        <b className="pt-15 text">Выполнено за все время:</b>
        <div className="text text_type_digits-large">{feeds.total}</div>
        <b className=" pt-15 text">Выполнено за сегодня:</b>
        <div className="text text_type_digits-large">{feeds.totalToday}</div>
      </div>
    </PageLayout>
  );
};

export default FeedList;
