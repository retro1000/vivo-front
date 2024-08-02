import { lazy } from "react";
import Loadable from "app/components/Loadable";


const Home = Loadable(lazy(() => import('../home/MainLayout.jsx')))
const AboutPage = Loadable(lazy(() => import('../home/AboutPage')))
const ContactPage = Loadable(lazy(() => import('../home/ContactPage.jsx')))



const homeRoutes = [
  {
    path: "/",
    element: <Home />
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
