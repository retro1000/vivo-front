import { useContext } from "react";
import LayoutContext from "app/contexts/LayoutContext";

const useLayout = () => useContext(LayoutContext);
export default useLayout;
