import React, { FC } from "react";
import { Provider } from "react-redux";
// redux store
import { store } from "./store";
// components
import Main from "./components/Main/Main";

const App: FC = () => {
  return (
    <Provider {...{ store }}>
      <Main />
    </Provider>
  );
};

export default App;
