import { lazy } from "react";
import Loadable from "app/components/Loadable";


const InquiriesPage = Loadable(lazy(() => import('../inquiries/InquiriesPage.jsx')))


const inquiriesRoutes = [
  {
    path: "/inquiries",
    element: <InquiriesPage />
  }
  
];

export default inquiriesRoutes;
