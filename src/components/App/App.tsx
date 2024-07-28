import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import {
  Constructor,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  Ingredients,
  NotFound,
  History,
  FeedList,
  Feed,
} from "../../pages";

import { useAppDispatch } from "../../store";
import { ingredientsThunks } from "../../services";

import { ProtectedRouteElement } from "../../components/ProtectedRouteElement";

import { IngredientDetailsModal } from "../IngredientDetailsModal";
import { FeedDetailsModal } from "../FeedDetailsModal";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(ingredientsThunks.fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Constructor />} />
        <Route
          path="/login"
          element={<ProtectedRouteElement element={<Login />} isGuest />}
        />
        <Route
          path="/register"
          element={<ProtectedRouteElement element={<Register />} isGuest />}
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement element={<ForgotPassword />} isGuest />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement element={<ResetPassword />} isGuest />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<History />} />}
        />
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement element={<Feed isProfile={true} />} />
          }
        />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/ingredients/:id" element={<Ingredient />} />

        <Route path="/feed" element={<FeedList />} />
        <Route path="/feed/:id" element={<Feed />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <IngredientDetailsModal handleCloseModal={() => navigate("/")} />
            }
          />
          <Route
            path="/feed/:id"
            element={
              <FeedDetailsModal handleCloseModal={() => navigate("/feed")} />
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <FeedDetailsModal
                handleCloseModal={() => navigate("/profile/orders")}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
