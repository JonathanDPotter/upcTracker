import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { debounce } from "debounce";
// utils
import { saveState } from "./store/localStorage";
// redux store
import { store } from "./store";
// components
import Main from "./components/Main/Main";
import { Platform } from "react-native";

const App = () => {
  useEffect(() => {
    // saves redux state to localStorage
    Platform.OS === "web" &&
      store.subscribe(
        debounce(() => {
          saveState(store.getState());
        }, 800)
      );
  }, [store]);

  return (
    <Provider {...{ store }}>
      <Main />
    </Provider>
  );
};

export default App;
