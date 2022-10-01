import React, { useEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";
// utils
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setToken, setUser } from "../../store/slices/authSlice";
import api from "../../api";
// components
import Header from "../Header/Header";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

const Main = () => {
  // get auth data from redux store
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(setToken(""));
    dispatch(setUser(""));
  };

  useEffect(() => {
    api.validate(token).then((result) => {
      if (result?.status !== 200) {
        logOut();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={tw`flex-1`}>
      <Header logOut={logOut} />
      {user ? <Home /> : <Login />}
      <Footer />
    </View>
  );
};

export default Main;
