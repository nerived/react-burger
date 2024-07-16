import { RootState } from "../../store";

export const getUser = (state: RootState) => {
  return state.user;
};

export const getUserIsLoggedIn = (state: RootState) => {
  return !!state.user.email;
};
