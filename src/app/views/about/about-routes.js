import { lazy } from "react";
import Loadable from "app/components/Loadable";


const AboutPage = Loadable(lazy(() => import('../about/AboutPage.jsx')))


const aboutRoutes = [
  {
    path: "/about",
    element: <AboutPage />
  }
  
];

export default aboutRoutes;
