import { lazy } from "react";
import Loadable from "app/components/Loadable";

const ContactPage = Loadable(lazy(() => import('../contact/ContactPage.jsx')))

const contactRoutes = [
  {
    path: "/contact-us",
    element: <ContactPage />
  },
  
];

export default contactRoutes;
