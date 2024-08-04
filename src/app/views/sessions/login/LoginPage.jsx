
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import useAuth from "app/hooks/useAuth";
import LoginForm from "../component/LoginForm";
import ImageSection from "../component/ImageSection";
import { Footer } from "app/components";

const LoginPage = () => {

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const navigate = useNavigate()

  const { login } = useAuth();

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const role = await login(username, password, remember);
      navigate(!role || role==='USER' || role==='GUEST'?'/':role==='CASHIER'?'/pos-home':'/dashboard/default');
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
          loginSubtitle={"Log In for free to access to in any of our products"} 
          onClick={handleFormSubmit} 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          remember={remember}
          setRemember={setRemember}
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
