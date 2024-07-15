import { useEffect, useState, ReactElement, useCallback } from "react";
import { Navigate } from "react-router-dom";

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
  const { email } = useAppSelector(userSelectors.getUser);
  const dispatch = useAppDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(async () => {
    await dispatch(userThunks.fetchUser());
    setUserLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return <Loader />;
  }
  if (isGuest) {
    return email ? <Navigate to="/" replace /> : element;
  }

  return email ? element : <Navigate to="/login" replace />;
};
