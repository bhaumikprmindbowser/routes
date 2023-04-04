import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Loadable from "./components/Loadable";
import AuthGuard from "./auth/AuthGuard";
import PublicRoute from "./auth/PublicRoute";

const NotFound = Loadable(lazy(() => import("./components/NotFound")));

const Home = Loadable(lazy(() => import("./components/Home")));
const Login = Loadable(lazy(() => import("./components/Login")));

const routes = [
  {
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
