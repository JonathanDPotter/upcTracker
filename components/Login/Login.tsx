import React, { useState } from "react";
// utils
import { useAppDispatch } from "../../store/hooks";
import { setToken, setUser } from "../../store/slices/authSlice";
import api from "../../api";
import LoginPresentation from "./LoginPresentation";
import { Alert, Dimensions } from "react-native";

const Login = () => {
  const dispatch = useAppDispatch();

  // get screenHeight
  const screenHeight = Dimensions.get("window").height;

  // form state for login
  const initialState = {
    username: "",
    password: "",
    repeatPassword: "",
    newUser: false,
    show: false,
  };
  const [formState, setFormState] = useState(initialState);
  //destructure for easier use
  const { username, password, repeatPassword, newUser, show } = formState;

  const setUsername = (newState: typeof initialState.username) => {
    setFormState({ ...formState, username: newState });
  };

  const setPassword = (newState: typeof initialState.password) => {
    setFormState({ ...formState, password: newState });
  };

  const setRepeatPassword = (newState: typeof initialState.repeatPassword) => {
    setFormState({ ...formState, repeatPassword: newState });
  };

  const toggleNewUser = () => {
    setFormState({ ...formState, newUser: !newUser });
  };

  const toggleShow = () => {
    setFormState({ ...formState, show: !show });
  };

  const handleSubmit = async () => {
    try {
      if (newUser) await api.register({ username, password });
      const response = await api.login({ username, password });

      if (response.data.token) {
        dispatch(setToken(response.data.token));
        dispatch(setUser(username));
      } else {
        Alert.alert(response.data.message);
        setFormState(initialState);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const props = {
    handleSubmit,
    newUser,
    toggleNewUser,
    username,
    setUsername,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    show,
    toggleShow,
    screenHeight,
  };

  return <LoginPresentation {...props} />;
};

export default Login;
