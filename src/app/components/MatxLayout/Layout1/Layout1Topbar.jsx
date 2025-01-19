import React from "react";
import { memo, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Typography,
  Stack,
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { useAxios } from "app/hooks/useAxios";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, TButton, TIconButton } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";

import { scrollBar, topBarHeight } from "app/utils/constant";

import {
  Home,
  Person,
  Settings,
  Menu,
  PowerSettingsNew,
  ArrowDropUp,
} from "@mui/icons-material";

import WishListIcon from "@mui/icons-material/Favorite";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

import { themeColors } from "app/components/MatxTheme/themeColors";
import { useRef } from "react";
import SearchBar from "../TopBarComponent/SearchBar";
import SideMenu from "../TopBarComponent/SideMenu";
import AllCategoryDropDown from "../TopBarComponent/AllCategoryDropDown";
import SearchBarDropDown from "../TopBarComponent/SearchBarDropDown";
import { useContext } from "react";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "6px",
  paddingLeft: 12,
  paddingRight: 12,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#191919",
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" },
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const categories = [
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
];

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

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user, role } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [sideMenuOn, setSideMenuOn] = useState(false);

  const [dropDownOn, setDropDownOn] = useState(false);

  const [searchBarOn, setSearchBarOn] = useState(false);

  const [allCategories, setAllCategories] = useState(categories);

  const [categoryLoading, setCategoryLoading] = useState(false);

  const [searchLoading, setSearchLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [searchRes, setSearchRes] = useState([]);

  const [initialSearchVal, setInitialSearchVal] = useState("");
  // const { initialSearchVal, setInitialSearchVal } = useContext(LayoutContext);

  const [tab, setTabs] = useState(0);

  const [allCategoryDropDownMenuPosition, setAllCategoryDropDownMenuPosition] =
    useState({ top: 0, left: 0 });

  const categoryButtonRef = useRef(null);

  const [searchBarDropDownMenuPosition, setsearchBarDropDownMenuPosition] =
    useState({ top: 0, left: 0 });

  const searchBarRef1 = useRef(null);
  const searchBarRef2 = useRef(null);
  const searchBarContainerRef = useRef(null);
  const categoryDropDownContainerRef = useRef(null);

  const location = useLocation();

  const { api, apiNonAuth } = useAxios();

  const getAllCategories = async (setAllCategories, setLoading) => {
    setLoading(true);
    await api
      .get("/category/view")
      .then((response) => {
        if (response.status === 200) {
          setAllCategories(response.data);
        }
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const handleResize = () => {
      if (categoryButtonRef.current) {
        const rect = categoryButtonRef.current.getBoundingClientRect();

        // Update the position on resize
        setAllCategoryDropDownMenuPosition({
          top: rect.bottom + 4, // Dropdown starts just below the button
          left: rect.left, // Align horizontally with the button
          width: rect.width, // Match dropdown width with button width
        });
      }
    };

    if (categoryButtonRef.current) {
      // Set initial position
      handleResize();

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [dropDownOn]);

  useEffect(() => {
    const handleResize = () => {
      var rect;
      if (!searchBarRef1.current || !searchBarRef2.current) return;

      rect = (
        window.innerWidth < 900 ? searchBarRef2 : searchBarRef1
      ).current.getBoundingClientRect();

      if (rect) {
        setsearchBarDropDownMenuPosition({
          top: rect.bottom + 4, // Dropdown starts just below the button
          left: rect.left, // Align horizontally with the button
          width: rect.width, // Match dropdown width with button width
        });
      }
    };

    if (searchBarRef1.current || searchBarRef2.current) {
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [searchRes]);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveNav("home");
        break;
      case "/product/filter-product":
        setActiveNav("product");
        break;
      case "/about":
        setActiveNav("about");
        break;
      case "/contact":
        setActiveNav("contact");
        break;
      case "/track-order":
        setActiveNav("track");
        break;
      case "/inquiries":
        setActiveNav("inquiries");
        break;
      default:
        setActiveNav("n");
    }
  }, [location]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        !searchBarRef1.current ||
        !searchBarRef2.current ||
        !searchBarContainerRef.current ||
        !categoryDropDownContainerRef.current ||
        !categoryButtonRef.current
      )
        return;

      if (
        searchBarContainerRef.current.contains(event.target) ||
        searchBarRef1.current.contains(event.target) ||
        searchBarRef2.current.contains(event.target)
      ) {
        setSideMenuOn(false);
        setDropDownOn(false);
      } else setSearchBarOn(false);
      console.log(
        event.target,
        categoryButtonRef.current,
        categoryDropDownContainerRef.current.contains(event.target),
        categoryButtonRef.current.contains(event.target)
      );
      if (
        categoryDropDownContainerRef.current.contains(event.target) ||
        categoryButtonRef.current.contains(event.target)
      ) {
        setSideMenuOn(false);
        setSearchBarOn(false);
      } else setDropDownOn(false);

      if (sideMenuOn && (searchBarOn || dropDownOn)) setSideMenuOn(false);
    };

    // Add event listener for window resize
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleClick);
    };
  }, []);

  const [activeNav, setActiveNav] = useState("home");

  const navigates = useNavigate();

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const TopbarRoot = styled("div")({
    zIndex: 1301,
    top: 0,
    padding: !user || role === "USER" ? "0 3%" : "0",
    // borderBottom: '0.1em solid gray',
    height:
      !user || role === "USER" || role === "GUEST" ? "136.41px" : topBarHeight,
    // boxShadow: themeShadows[8],
    transition: "all 0.3s ease",
    background: "#191919",
  });

  const navigate = (path) => {
    setActiveNav(path);
    switch (path) {
      case "home":
        navigates("/");
        break;
      case "product":
        navigates("/product/filter-product");
        break;
      case "about":
        navigates("/about");
        break;
      case "contact":
        navigates("/contact");
        break;
      case "track":
        navigates("/track-order");
        break;
      case "inquiries":
        navigates("/inquiries");
        break;
      default:
        navigates("/not-found");
    }
  };

  return (
    <React.Fragment>
      <TopbarRoot>
        <TopbarContainer>
          {!user && (role === "USER" || role === "GUEST") && (
            <React.Fragment>
              <Stack
                width={"100%"}
                mt={0.4}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Box
                  display="flex"
                  width={"100%"}
                  alignItems={"center"}
                  gap={"0.8em"}
                  justifyContent={"space-between"}
                  sx={{ height: "53.21px" }}
                >
                  {
                    <React.Fragment>
                      <Box
                        onClick={() => navigate("home")}
                        component="img"
                        src="/assets/images/logos/HH01.jpg"
                        alt="Logo"
                        sx={{
                          width: "120px",
                          height: "auto",
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                      ></Box>

                      {/* for categery bar */}
                      <div ref={categoryButtonRef}>
                        <Box
                          justifyContent={"center"}
                          alignItems={"center"}
                          minWidth={"170px"}
                          width={"40%"}
                          maxWidth={"220px"}
                          zIndex={100}
                          sx={{
                            display: { xs: "none", md: "flex" },
                            background: "gray",
                            padding: "0 0.2em",
                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                          color={"white"}
                          onClick={() => setDropDownOn(!dropDownOn)}
                        >
                          <StyledIconButton>
                            <Menu />
                          </StyledIconButton>
                          <Typography flex={1}>All Categories</Typography>
                          {!dropDownOn ? <ArrowDropDown /> : <ArrowDropUp />}
                        </Box>
                      </div>
                      {/* for search bar */}
                      <SearchBar
                        initialSearchVal={initialSearchVal}
                        setInitialSearchVal={setInitialSearchVal}
                        // search={search}
                        ref={searchBarRef1}
                        // searchVal={searchVal}
                      />
                      {/* <Box ref={searchBarRef1} flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'none', md: 'flex' }, background: 'white', borderRadius: 1, minWidth: '190px'}}>
                        <form onSubmit={search} style={{width: '100%'}}>
                          <TextField 
                            placeholder="Find your perfect match today!"
                            sx={{background: 'white', borderRadius: 1, flex: 1, height: '39.5px', width: '100%'}}
                            type="search"
                            value={searchVal.trim()}
                            focused
                            size="small"
                            onChange={search}
                          />
                        </form>
                        <Box display={'flex'} sx={{position: 'relative', background: 'white'}} alignItems={'center'} mr={1} gap={1}>
                          <TIconButton icon={SearchIcon} title={'Search'} fun={search} color={themeColors.red.palette.secondary.main} name={'search'} disabled={searchVal===undefined || searchVal.trim()===''}></TIconButton>
                          <TIconButton icon={PhotoCamera} title={'Search by image'} fun={search} color={themeColors.red.palette.secondary.main} name={'img'}></TIconButton>
                        </Box>
                      </Box> */}

                      {!user ? (
                        <React.Fragment>
                          <Box gap="0.8em" display={"flex"}>
                            <TButton
                              title="Login"
                              label="Log in"
                              variant="outlined"
                              sx={{ background: `white`, color: "black" }}
                              fun={() => navigates("/login")}
                            ></TButton>
                            <TButton
                              title="Signup"
                              label="Sign up"
                              variant="contained"
                              sx={{
                                background:
                                  themeColors.red.palette.primary.main,
                                color:
                                  themeColors.red.palette.primary.contrastText,
                              }}
                              fun={() => navigates("/signup")}
                            ></TButton>
                          </Box>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <NotificationProvider>
                            <NotificationBar />
                          </NotificationProvider>
                          {role === "USER" ? (
                            <React.Fragment>
                              <TIconButton
                                title="Wish List"
                                icon={WishListIcon}
                                sx={{
                                  color: themeColors.red.palette.primary.main,
                                }}
                                variant="outlined"
                                fun={() =>
                                  navigates(`/wishlist/${user.userId}`)
                                }
                              ></TIconButton>
                              <ShoppingCart />
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      )}
                      {!user ? (
                        ""
                      ) : (
                        <MatxMenu
                          menuButton={
                            <UserMenu>
                              <Avatar
                                src={user ? user.avatar : ""}
                                sx={{ cursor: "pointer" }}
                              />
                            </UserMenu>
                          }
                        >
                          <StyledItem>
                            <Link to="/">
                              <Home />
                              <Span>Home</Span>
                            </Link>
                          </StyledItem>

                          <StyledItem>
                            <Link to={`/profile/${user.userId}`}>
                              <Person />
                              <Span>My Account</Span>
                            </Link>
                          </StyledItem>

                          <StyledItem>
                            <Settings />
                            <Span>Settings</Span>
                          </StyledItem>

                          <StyledItem onClick={logout}>
                            <PowerSettingsNew />
                            <Span>Logout</Span>
                          </StyledItem>
                        </MatxMenu>
                      )}
                    </React.Fragment>
                  }
                </Box>
                <Box
                  width={"100%"}
                  mt={2.5}
                  mb={1}
                  sx={{ display: { xs: "block", md: "flex" } }}
                >
                  {/* Large screens - md and up */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                    }}
                    gap={"2em"}
                  >
                    <Typography
                      sx={{
                        color:
                          activeNav === "home"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "home" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("home")}
                    >
                      Home
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          activeNav === "product"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "product" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("product")}
                    >
                      Shop
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          activeNav === "track"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "track" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("track")}
                    >
                      Track Order
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          activeNav === "about"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "about" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("about")}
                    >
                      About Us
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          activeNav === "contact"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "contact" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("contact")}
                    >
                      Contact Us
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          activeNav === "inquiries"
                            ? themeColors.red.palette.primary.main
                            : "white",
                        fontWeight: 500,
                        fontSize: activeNav === "inquiries" ? "18px" : "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("inquiries")}
                    >
                      Inquiries
                    </Typography>
                  </Box>

                  {/* Small screens - xs to sm */}
                  <Box display={"flex"} gap={2}>
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                      <StyledIconButton
                        onClick={() => setSideMenuOn(!sideMenuOn)}
                      >
                        <Menu sx={{ padding: 0 }} />
                      </StyledIconButton>
                    </Box>
                    {/* for search bar */}
                    <SearchBar
                      initialSearchVal={initialSearchVal}
                      setInitialSearchVal={setInitialSearchVal}
                      // search={search}
                      ref={searchBarRef2}
                      // searchVal={searchVal}
                      sx={{ display: { xs: "flex", md: "none" } }}
                    />
                    {/* <Box ref={searchBarRef2} flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'flex', md: 'none' }, background: 'white', borderRadius: 1, position: 'relative', left: '-10px'}}>
                      <TextField 
                        placeholder="Find your perfect match today!"
                        sx={{background: 'white', borderRadius: 1, flex: 1, height: '39.5px'}}
                        type="search"
                        focused
                        size="small"
                      />
                      <Box display={'flex'} sx={{position: 'relative', background: 'white'}} alignItems={'center'} mr={1} gap={1}>
                        <Tooltip title="Search"><SearchIcon sx={{cursor: 'pointer'}}/></Tooltip>
                        <Tooltip title="Search by image"><PhotoCamera sx={{cursor: 'pointer'}}/></Tooltip>
                      </Box>
                    </Box> */}
                  </Box>
                </Box>
              </Stack>
            </React.Fragment>
          )}

          {user && (role !== "USER" || role !== "GUEST") && (
            <Box>
              <Box display="flex">
                <React.Fragment>
                  <StyledIconButton onClick={handleSidebarToggle}>
                    <Menu />
                  </StyledIconButton>
                </React.Fragment>
              </Box>

              <Box display="flex" alignItems="center">
                {/* <MatxSearchBox /> */}
                <React.Fragment>
                  <NotificationProvider>
                    <NotificationBar />
                  </NotificationProvider>
                </React.Fragment>
                <MatxMenu
                  menuButton={
                    <UserMenu>
                      <Avatar
                        src={user ? user.avatar : ""}
                        sx={{ cursor: "pointer" }}
                      />
                    </UserMenu>
                  }
                >
                  <StyledItem>
                    <Link to="/">
                      <Home />
                      <Span>Home</Span>
                    </Link>
                  </StyledItem>

                  <StyledItem>
                    <Link to={`/profile/${user.userId}`}>
                      <Person />
                      <Span>My Account</Span>
                    </Link>
                  </StyledItem>

                  <StyledItem>
                    <Settings />
                    <Span>Settings</Span>
                  </StyledItem>

                  <StyledItem onClick={logout}>
                    <PowerSettingsNew />
                    <Span>Logout</Span>
                  </StyledItem>
                </MatxMenu>
              </Box>
            </Box>
          )}
        </TopbarContainer>
      </TopbarRoot>
      {(!user || user === "USER" || user === "GUEST") && (
        <SideMenu
          getAllCategories={getAllCategories}
          sideMenuOn={sideMenuOn}
          tab={tab}
          setTabs={setTabs}
          navigates={navigates}
          activeNav={activeNav}
          navigate={navigate}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          loading={categoryLoading}
          setLoading={setCategoryLoading}
        />
      )}
      {(!user || user === "USER" || user === "GUEST") && (
        <AllCategoryDropDown
          getAllCategories={getAllCategories}
          ref={categoryDropDownContainerRef}
          dropDownOn={dropDownOn}
          navigates={navigates}
          activeNav={activeNav}
          navigate={navigate}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          loading={categoryLoading}
          setLoading={setCategoryLoading}
          menuPosition={allCategoryDropDownMenuPosition}
        />
      )}
      <SearchBarDropDown
        ref={searchBarContainerRef}
        searchBarOn={searchBarOn}
        navigates={navigates}
        searchRes={searchRes}
        loading={searchLoading}
        setLoading={setSearchLoading}
        searchBarMenuPosition={searchBarDropDownMenuPosition}
      />
    </React.Fragment>
  );
};

export default memo(Layout1Topbar);
