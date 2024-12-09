import React, { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./pages/PrivateRoute";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

const Menu = lazy(() => import("./pages/Menu"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<PrivateRoute />} path="/">
        <Route
          element={<Menu component={Dashboard} title="Dashboard" />}
          path="/"
        />
        <Route element={<NotFound />} path="/404" />
      </Route>
      <Route element={<ServerError />} path="/error" />
      <Route element={<Navigate replace to="/404" />} path="*" />
    </>
  )
);
