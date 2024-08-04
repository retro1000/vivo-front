import { lazy } from "react";
import Loadable from "app/components/Loadable";


const HomePage = Loadable(lazy(() => import('../home/HomePage')))

const homeRoutes = [
  {
    path: "/",
    element: <HomePage />
  }
];

export default homeRoutes;
