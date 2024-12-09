import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { clearState, clearToken } from "../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/app";

export default function PrivateRoute() {
  const stateUser = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (stateUser.isError) {
      dispatch(clearToken());
      navigate("/login");
    }
    if (stateUser.isSuccess) {
      dispatch(clearState());
    }
  }, [dispatch, navigate, stateUser.isError, stateUser.isSuccess]);

  return stateUser.token !== null &&
    stateUser.token !== undefined &&
    stateUser.token !== "" ? (
    !stateUser.isFetching ? (
      <Outlet />
    ) : null
  ) : (
    <Navigate to={{ pathname: "/login" }} replace={true} />
  );
}
