import { useEffect } from "react";

import { PageLayout } from "../../components/PageLayout";
import { FeedDetailsContent } from "../../components/FeedDetailsContent";

import { useAppDispatch, useAppSelector } from "../../store";
import { feedSlice, feedsSelectors } from "../../services/feeds";
import { historySlice, historySelectors } from "../../services/history";

import styles from "./Feed.module.css";

type FeedProps = {
  isProfile?: boolean;
};

export const Feed = ({ isProfile = false }: FeedProps) => {
  const feedsState = useAppSelector(feedsSelectors.getFeedsState);
  const historyState = useAppSelector(historySelectors.getHistoryState);
  let state = isProfile ? historyState : feedsState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      isProfile
        ? historySlice.actions.initStart()
        : feedSlice.actions.initStart()
    );

    return () => {
      dispatch(
        isProfile ? historySlice.actions.close() : feedSlice.actions.close()
      );
    };
  }, [dispatch, state, isProfile]);

  return (
    <PageLayout>
      <div className={styles.container}>
        <FeedDetailsContent />
      </div>
    </PageLayout>
  );
};

export default Feed;
