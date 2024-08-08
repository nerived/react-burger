import { useEffect } from "react";

import { PageLayout } from "../../components/PageLayout";
import { FeedDetailsContent } from "../../components/FeedDetailsContent";

import { useAppDispatch } from "../../store";
import { feedSlice } from "../../services/feeds";
import { historySlice } from "../../services/history";

import styles from "./Feed.module.css";

type FeedProps = {
  isProfile?: boolean;
};

export const Feed = ({ isProfile = false }: FeedProps) => {
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
  }, [dispatch, isProfile]);

  return (
    <PageLayout>
      <div className={styles.container}>
        <FeedDetailsContent />
      </div>
    </PageLayout>
  );
};

export default Feed;
