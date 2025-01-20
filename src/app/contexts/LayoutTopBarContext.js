import useAuth from "app/hooks/useAuth";
import { useAxios } from "app/hooks/useAxios";
import { createContext, useReducer } from "react";

const initialState = {
  logo: "/assets/images/logos/HH01.jpg",
  search: {
    searchText: '',
    searchImg: '',
    loading: '',
    values: []
  },
  categories: {
    loading: false,
    values: [{
      id: 3,
      name: "Accessories",
      subCategories: [
        { id: 31, name: "Watches", subCategories: [] },
        { id: 32, name: "Bags", subCategories: [] },
      ],
    },],
  },
  notifications: {
    loading: false,
    newNotiCount: 0,
    values: [],
  },
  sideMenuOn: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        categories: { ...state.categories, loading: loading },
      };
    }
    case "SIDEMENU_TOGGLE": {
      const { sideMenuOn } = action.payload;
      return {
        ...state,
        sideMenuOn: sideMenuOn!==undefined ? sideMenuOn : !state.sideMenuOn
      };
    }
    case "NOTIFI_LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        notifications: { loading: loading, ...state.notifications },
      };
    }
    case "CATEGORY_UPDATE": {
      const { categories } = action.payload;
      return {
        ...state,
        categories: { loading: false, values: categories },
      };
    }
    case "NOTIFI_UPDATE": {
      const { notifications, type } = action.payload;
      return {
        ...state,
        notifications: { loading: false, values: notifications },
      };
    }
    default:
      return state;
  }
};

const LayoutTopBarContext = createContext({
  ...initialState,
  getNotifications: () => {},
  getAllCategories: () => {},
  sideMenuToggle: () => {},
});

export const LayoutTopBarProvider = ({ children }) => {
  const { api, apiNonAuth } = useAxios();

  const { user, role } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllCategories = async () => {
    dispatch({ type: "CATEGORY_UPDATE", payload: { loading: true } });
    await apiNonAuth
      .get("/category/view")
      .then((response) => {
        if (response.status === 200 && response.data && response.data.length > 0) {
            dispatch({ type: "CATEGORY_LOADING", payload: { categories: response.data } });
        }
      })
      .catch((error) => {

      })
      .finally(() =>
        dispatch({ type: "CATEGORY_LOADING", payload: { loading: false } })
      );
  };

  const getNotifications = async (setAllCategories, setLoading) => {
    setLoading(true);
    await apiNonAuth
      .get("/category/view")
      .then((response) => {
        if (response.status === 200) {
          setAllCategories(response.data);
        }
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const sideMenuToggle = (sideMenuOn=undefined) => {
    dispatch({ type: "SIDEMENU_TOGGLE", payload: { sideMenuOn: sideMenuOn } });
  }

  return (
    <LayoutTopBarContext.Provider value={
        { 
          ...state, 
          getAllCategories, 
          getNotifications, 
          sideMenuToggle
        }
      }
    >
      {children}
    </LayoutTopBarContext.Provider>
  );
};

export default LayoutTopBarContext;
