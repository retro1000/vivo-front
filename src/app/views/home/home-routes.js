import { lazy } from "react";
import Loadable from "app/components/Loadable";


const HomePage = Loadable(lazy(() => import('../home/HomePage.jsx')))
const AboutPage = Loadable(lazy(() => import('../home/AboutPage')))
const ContactPage = Loadable(lazy(() => import('../home/ContactPage.jsx')))



const homeRoutes = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/About",
    element: <AboutPage />
  },
  {
    path: "/Contactus",
    element: <ContactPage />
  },
  
];

export default homeRoutes;
