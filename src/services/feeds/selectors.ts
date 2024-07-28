import { RootState } from "../../store";

export const getFeeds = (state: RootState) => {
  return state.feeds;
};

export const getFeedsOrders = (state: RootState) => {
  return getFeeds(state).orders;
};

export const getFeedsState = (state: RootState) => {
  return getFeeds(state).state;
};

export const getFeedByNumber = (state: RootState, number: string) => {
  return getFeedsOrders(state).find((feed) => String(feed.number) === number);
};
