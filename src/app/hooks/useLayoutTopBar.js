import { useContext } from "react";
import LayoutTopBarContext from "app/contexts/LayoutTopBarContext";

const useLayoutTopBar = () => useContext(LayoutTopBarContext);
export default useLayoutTopBar;
