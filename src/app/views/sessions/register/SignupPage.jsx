
import React from "react";
import { Box } from "@mui/material";
import ImageSection from "../component/ImageSection";
import SignupForm from "../component/SignupForm";
import { Footer } from "app/components";
import useAuth from "app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotistack } from "app/hooks/useNotistack";


const SignupPage = () => {

  const [loading, setLoading] = useState(false);

  const [errorData, setErrorData] = useState({})

  const [submitDisable, setSubmitDisable] = useState(false)

  const navigate = useNavigate()

  const { register } = useAuth();

  const { triggerNotifications } = useNotistack()

  const handleFormSubmit = async (values) => {
    setErrorData({})
    setLoading(true);
    try {
      const { status, data } = await register(values);

      if(status===201 && data){
        setSubmitDisable(true)
        triggerNotifications([{text: data, variant: 'success'}], 500)
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }else if(status===500 && data){
        triggerNotifications([{text: data, variant: 'error'}])
      }else if(status===400 && data){
        setErrorData({...data})
      }else{
        triggerNotifications([{text: 'An unexpected error occurred.', variant: 'error'}])
      }
      setLoading(false)
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 25 , paddingRight: 25 }}>
        <Box sx={{ display: "flex", width: "100%", marginTop: "-27px" }}>
          <ImageSection />
          <SignupForm loading={loading} loginTitle={"Signup"} loginSubtitle={"Unlock Your Shopping Adventure – Sign Up to Discover More!"} onClick={handleFormSubmit} errorData={errorData} setErrorData={setErrorData} submitDisable={submitDisable}/>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SignupPage;
