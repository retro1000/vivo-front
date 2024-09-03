
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotistack } from "app/hooks/useNotistack";

import { Box } from "@mui/material";
import useAuth from "app/hooks/useAuth";
import LoginForm from "../component/LoginForm";
import ImageSection from "../component/ImageSection";
import { Footer } from "app/components";

const LoginPage = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { triggerNotifications } = useNotistack()

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { username, password, remember } = values
      const { status, data} = await login(username, password, remember);
      if(status===200){
        navigate(!data || data==='USER' || data==='GUEST'?'/':data==='CASHIER'?'/pos-home':'/dashboard/default');
      }
      if(status===500 || status===403 || status===400){
        setLoading(false)
        triggerNotifications([{text: data, variant: 'error'}])
      }
      
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column",paddingLeft: 25 , paddingRight: 25 }}>
        <Box sx={{ display: "flex", width: "100%", marginTop: "-27px" }}>
        <LoginForm 
          loginTitle={"Login"} 
          loginSubtitle={"Sign In to Discover Your Favorites!"} 
          onClick={handleFormSubmit}
          loading={loading}
        />
        <ImageSection />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
