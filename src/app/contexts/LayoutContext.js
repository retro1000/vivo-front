import useAuth from "app/hooks/useAuth";
import { useAxios } from "app/hooks/useAxios";
import { createContext, useReducer } from "react";

const searchResult = [
  {
    type: "Electronics",
    count: 2,
    result: [
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "Smartphone X10", // Product name
        price: 150000, // Original price
        discount: 130000, // Discounted price (optional)
        nav: "/product/view/1",
      },
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes   Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes",
        price: 25000,
        nav: "/product/view/1",
      },
    ],
  },
  {
    type: "Furniture",
    count: 1,
    result: [
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "Modern Chair",
        price: 12000,
        nav: "http://new/product/view/1",
      },
    ],
  },
  {
    type: "Clothing",
    count: 3,
    result: [
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "Leather Jacket",
        price: 50000,
        discount: 45000,
        nav: "/product/view/1",
      },
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "Jeans",
        price: 8000,
        nav: "/product/view/1",
      },
      {
        img: "https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp", // Image URL
        name: "T-Shirt",
        price: 3000,
        nav: "/product/view/1",
      },
    ],
  },
];

const initialState = {
  logo: "/assets/images/logos/HH01.jpg",
  search: {
    searchText: '',
    searchImg: '',
    loading: '',
    // values: [],
    values: searchResult,
    abortController: null,
    searchBarOn: true
  },
  categories: {
    loading: true,
    values: [
      {
        id: 1,
        name: "Electronics",
        subCategories: [
          {
            id: 11,
            name: "Mobile Phones",
            subCategories: [
              { id: 111, name: "Smartphones", subCategories: [] },
              { id: 112, name: "Feature Phones", subCategories: [] },
            ],
          },
          {
            id: 12,
            name: "Laptops",
            subCategories: [
              { id: 121, name: "Gaming Laptops", subCategories: [] },
              { id: 122, name: "Ultrabooks", subCategories: [] },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Clothing",
        subCategories: [
          {
            id: 21,
            name: "Men",
            subCategories: [
              { id: 211, name: "Shirts", subCategories: [] },
              { id: 212, name: "Jeans", subCategories: [] },
            ],
          },
          {
            id: 22,
            name: "Women",
            subCategories: [
              { id: 221, name: "Dresses", subCategories: [] },
              { id: 222, name: "Tops", subCategories: [] },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Accessories",
        subCategories: [
          { id: 31, name: "Watches", subCategories: [] },
          { id: 32, name: "Bags", subCategories: [] },
        ],
      },
    ],
  },
  notifications: {
    loading: false,
    newNotiCount: 0,
    values: [],
  },
  sideMenuOn: false,
  loading: false
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
    case "LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        loading: loading!==undefined ? loading : !state.loading
      };
    }
    case "SIDEMENU_TOGGLE": {
      const { sideMenuOn } = action.payload;
      return {
        ...state,
        sideMenuOn: sideMenuOn!==undefined ? sideMenuOn : !state.sideMenuOn
      };
    }
    case "SEARCH_BAR_TOGGLE": {
      const { searchBarOn } = action.payload;
      return {
        ...state,
        search: { ...state.search, searchBarOn: searchBarOn!==undefined ? searchBarOn : !state.search.searchBarOn }
      };
    }
    case "SEARCH_BAR_LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        search: { ...state.search, loading: loading }
      };
    }
    case "NOTIFI_LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        notifications: { ...state.notifications, loading: loading },
      };
    }
    case "SEARCH_LOADING": {
      const { loading } = action.payload;
      return {
        ...state,
        search: { ...state.search, loading: loading },
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
    case "SEARCH_VALUE_CHANGE": {
      const { searchVal, abortController } = action.payload;
      return {
        ...state,
        search: {
          ...state.search, 
          values: searchVal && searchVal!=='' ? state.search.values : [],
          loading: searchVal && searchVal!=='' ? !state.search.loading : false, 
          searchText: searchVal, 
          abortController: searchVal && searchVal!=='' ? abortController : null 
        }
      };
    }
    case "UPDATE_SEARCH_RESULT": {
      const { searchResults } = action.payload;
      return {
        ...state,
        search: { ...state.search, loading: false, values: searchResults, abortController: null }
      };
    }
    default:
      return state;
  }
};

const LayoutContext = createContext({
  ...initialState,
  getNotifications: () => {},
  getAllCategories: () => {},
  sideMenuToggle: () => {},
  handleFileChange: () => {},
  handleSearch: () => {},
  searchBarDropDownToggle: () => {},
});

export const LayoutProvider = ({ children }) => {
  const { api, apiNonAuth } = useAxios();

  const { user, role } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllCategories = async () => {
    dispatch({ type: "CATEGORY_LOADING", payload: { loading: true } });
    await apiNonAuth
      .get("/category/view", {customData: {silentError: true}})
      .then((response) => {
        if (response.status === 200 && response.data && response.data.length > 0) {
            dispatch({ type: "CATEGORY_UPDATE", payload: { categories: response.data } });
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

  const searchBarDropDownToggle = (searchBarOn=undefined) => {
    dispatch({ type: "SEARCH_BAR_TOGGLE" , payload: { searchBarOn: searchBarOn }});
  }

  const handleSearch = async(event) => {
    if(!event || !event.target) return;

    if(state.search.abortController) state.search.abortController.abort();

    const abortController = new AbortController();
    const signal = abortController.signal

    dispatch({ type: "SEARCH_VALUE_CHANGE", payload: { searchVal: event.target.value.trim(), abortController: abortController } }); 
    
    event.target.value && 
    event.target.value !== '' && 
    await apiNonAuth.get(`/search?value=${event.target.value.trim()}`, {signal, customData: { silentError: true }})
      .then((response) => {
        if(response && response.status && response.status === 200 && response.data){
          dispatch({ type: "UPDATE_SEARCH_RESULT", payload: { searchResults: response.data } });
        }

        if(response && response.status && response.status === 204){
          dispatch({ type: "UPDATE_SEARCH_RESULT", payload: { searchResults: [] } });
        }
      })
      .catch((error) => {

      })
      .finally(() => {
        dispatch({ type: "SEARCH_LOADING", payload: { loading: false } })
      })

  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch({ type: "FILE_CHANGE", payload: { file: file } });
    }
  };

  return (
    <LayoutContext.Provider value={
        { 
          ...state, 
          getAllCategories, 
          getNotifications, 
          sideMenuToggle,
          handleFileChange,
          handleSearch,
          searchBarDropDownToggle
        }
      }
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;