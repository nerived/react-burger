import cn from "classnames";
import { useMemo } from "react";

import { useAppSelector } from "../../store";
import { TOrder, OrderStatus } from "../../types";
import { feedsSelectors } from "../../services/feeds";

import styles from "./FeedBoard.module.css";

export const FeedBoard = () => {
  const orders = useAppSelector(feedsSelectors.getFeedsOrders);

  const data = useMemo(() => {
    return orders.reduce(
      (acc, item) => {
        acc[item.status].push(item.number);
        return acc;
      },
      {
        [OrderStatus.DONE]: [],
        [OrderStatus.CREATED]: [3123123, 312312, 312131, 132321, 3123123123],
        [OrderStatus.PENDING]: [],
      } as Record<OrderStatus, TOrder["number"][]>
    );
  }, [orders]);

  return (
    <div className={styles.board}>
      <div className={styles.left}>
        <b className="text">Готовы:</b>
        <ul
          className={cn(styles.list, styles.completed)}
          style={{ columnCount: Math.ceil(data[OrderStatus.DONE].length / 10) }}
        >
          {data[OrderStatus.DONE].map((number) => {
            return (
              <li
                key={number}
                className={cn(
                  styles.item,
                  "text text_type_digits-default pb-1 pt-1"
                )}
              >
                {number}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.right}>
        <b className="text pb-6 ">В работе:</b>
        <ul
          className={styles.list}
          style={{
            columnCount: Math.ceil(data[OrderStatus.PENDING].length / 10),
          }}
        >
          {data[OrderStatus.PENDING].map((number) => {
            return (
              <li
                key={number}
                className={cn(
                  styles.item,
                  "text text_type_digits-default pb-1 pt-1"
                )}
              >
                {number}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FeedBoard;
