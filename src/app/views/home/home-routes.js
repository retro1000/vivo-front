import { lazy } from "react";
import Loadable from "app/components/Loadable";
import AuthGuard from "app/auth/AuthGuard";
import { authRoles } from "app/auth/authRoles";

const HomePage = Loadable(lazy(() => import('../home/HomePage')))

const homeRoutes = [
  {
    path: "/",
    element: <HomePage />
  }
];

export default homeRoutes;
