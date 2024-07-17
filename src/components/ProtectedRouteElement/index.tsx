import { ReactElement, useState, useCallback, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";
import { userSelectors, userThunks } from "../../services";

import { Loader } from "../Loader";

export const ProtectedRouteElement = ({
  element,
  isGuest = false,
}: {
  element: ReactElement;
  isGuest?: boolean;
}) => {
  const isLoggedIn = useAppSelector(userSelectors.getUserIsLoggedIn);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(userThunks.fetchUser());
    setUserLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isUserLoaded) {
    return <Loader />;
  }

  if (isGuest && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!isGuest && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};
