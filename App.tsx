import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { debounce } from "debounce";
// utils
// redux store
import { store } from "./store";
// components
import Main from "./components/Main/Main";
import { Platform } from "react-native";

const App = () => {
  return (
    <Provider {...{ store }}>
      <Main />
    </Provider>
  );
};

export default App;
