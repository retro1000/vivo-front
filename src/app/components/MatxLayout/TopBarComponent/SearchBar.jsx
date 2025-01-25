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
import useLayout from "app/hooks/useLayout";

const SearchField = () => {

  const { search, handleSearch } = useLayout();

  return (
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
      value={search.searchText.trim()}
      focused
      size="small"
      onChange={handleSearch}
    />
  );
}

const SearchBar = memo(
  forwardRef(({ sx }, ref) => {

    const { search, handleFileChange, handleSearch } = useLayout();

    const {loading, searchText, searchImg} = search

    // const [loading, setLoading] = useState(false);

    // const [searchLoading, setSearchLoading] = useState(false);

    // const [searchVal, setSearchVal] = useState(initialSearchVal || '');

    // const [searchImg, setSearchImg] = useState(null);

    const hiddenFIleInputRef = useRef(null);

    const searchFormRef = useRef(null);

    const { apiNonAuth } = useAxios();

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

    useEffect(() => {
      if (searchFormRef && searchFormRef.current) {
        // Find the input element inside the form
        const inputElement = searchFormRef.current.querySelector("input");
        if (inputElement) {
          inputElement.focus(); // Programmatically focus the input
        }
      }
    }, [search.loading]);

    const onSearchImgClick = (event) => {
      if (
        event.target.name === "img" ||
        event.target.parentNode.name === "img" ||
        event.target.parentNode.parentNode.name === "img"
      ) {
        hiddenFIleInputRef && hiddenFIleInputRef.current && hiddenFIleInputRef.current.click();
      }
    }

    const onSearchIconClick = (event) => {
      if (
        event.target.name === "search" ||
        event.target.parentNode.name === "search" ||
        event.target.parentNode.parentNode.name === "search"
      ) {
        searchFormRef && searchFormRef.current && searchFormRef.current.submit();
      }
    }

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
          <form onSubmit={handleSearch} style={{ width: "100%" }} ref={searchFormRef}>
            <SearchField />
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
              fun={(event) => onSearchIconClick(event)}
              color={themeColors.red.palette.secondary.main}
              name={"search"}
              disabled={searchText === undefined || searchText.trim() === ""}
              loading={loading}
            ></TIconButton>
            <TIconButton
              icon={PhotoCamera}
              title={"Search by image"}
              fun={(event) => onSearchImgClick(event)}
              color={themeColors.red.palette.secondary.main}
              name={"img"}
              disabled={loading}
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
