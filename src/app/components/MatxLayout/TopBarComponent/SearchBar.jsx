import { Box, TextField } from "@mui/material";
import { TIconButton } from "app/components";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { memo } from "react";
import { forwardRef } from "react";

import PhotoCamera from "@mui/icons-material/CameraAlt";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";

const SearchBar = memo(
  forwardRef(({ initialSearchVal, setInitialSearchVal, sx }, ref) => {
    const [loading, setLoading] = useState(false);

    const [searchLoading, setSearchLoading] = useState(false);

    const [searchVal, setSearchVal] = useState(initialSearchVal || '');

    const [searchImg, setSearchImg] = useState(null);

    const hiddenFIleInputRef = useRef(null);

    const {apiNonAuth} = useAxios()

    // useEffect(() => {
    //     const search = async () => {
    //       const formData = new FormData();
    //       if (searchImg) formData.append("img", searchImg);
    
    //       if (searchVal || searchImg) {
    //         await apiNonAuth
    //           .post(
    //             `/search${searchImg ? "" : "?value=" + searchVal}`,
    //             searchImg && formData,
    //             {
    //               headers: searchImg
    //                 ? { "Content-Type": "multipart/form-data" }
    //                 : {},
    //             }
    //           )
    //           .then((response) => {
    //             if (response.status === 200) {
    //               if (searchVal) setSearchRes(response.data);
    //               else if (searchImg)
    //                 navigate(`/search${searchImg ? "" : "?value=" + searchVal}`, {
    //                   state: {
    //                     searchVal: searchVal,
    //                     searchImg: searchImg,
    //                     ...response.data,
    //                   },
    //                 });
    //             }
    //             if (response.status === 204) {
    //               setSearchRes([]);
    //             }
    //           })
    //           .catch((error) => {})
    //           .finally(() => {
    //             setSearchImg(null);
    //             setLoading(false);
    //             setSearchLoading(false);
    
    //             // for testing
    //             setSearchRes(searchResult);
    //             setSearchBarOn(true);
    //           });
    //       }
    //     };
    
    //     search();
    //   }, [searchVal, searchImg]);

    const search = (event) => {
      switch (event.type) {
        case "submit":
          setLoading(true);
          setSearchVal(searchVal + " ");
          setInitialSearchVal(searchVal + " ");
          break;
        case "change":
          setSearchVal(event.target.value);
          setInitialSearchVal(event.target.value);
        //   if (searchBarRef1.current) {
        //     searchBarRef1.current.children[0].children[0].focus();
        //   }
          setSearchLoading(true);
          break;
        case "click":
          setLoading(true);
          if (
            event.target.name === "search" ||
            event.target.parentNode.name === "search" ||
            event.target.parentNode.parentNode.name === "search"
          ) {
            setSearchVal(searchVal + " ");
            setInitialSearchVal(searchVal + " ");
          }
          if (
            event.target.name === "img" ||
            event.target.parentNode.name === "img" ||
            event.target.parentNode.parentNode.name === "img"
          ) {
            hiddenFIleInputRef.current.click();
          }
          break;
        default:
      }
    };

    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSearchImg(file);
    }
  };

    return (
      <>
        <Box
          ref={ref}
          flex={1}
          display={"flex"}
          alignItems={"center"}
          sx={{
            display: { xs: "none", md: "flex" },
            background: "white",
            borderRadius: 1,
            minWidth: "190px",
            ...sx,
          }}
        >
          <form onSubmit={search} style={{ width: "100%" }}>
            <TextField
              placeholder="Find your perfect match today!"
              sx={{
                background: "white",
                borderRadius: 1,
                flex: 1,
                height: "39.5px",
                width: "100%",
              }}
              type="search"
              value={searchVal.trim()}
              focused
              size="small"
              onChange={search}
            />
          </form>
          <Box
            display={"flex"}
            sx={{ position: "relative", background: "white" }}
            alignItems={"center"}
            mr={1}
          >
            <TIconButton
              icon={SearchIcon}
              title={"Search"}
              fun={search}
              color={themeColors.red.palette.secondary.main}
              name={"search"}
              disabled={searchVal === undefined || searchVal.trim() === ""}
            ></TIconButton>
            <TIconButton
              icon={PhotoCamera}
              title={"Search by image"}
              fun={search}
              color={themeColors.red.palette.secondary.main}
              name={"img"}
            ></TIconButton>
          </Box>
        </Box>
        <input
          type="file"
          ref={hiddenFIleInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
      </>
    );
  })
);

export default SearchBar;
