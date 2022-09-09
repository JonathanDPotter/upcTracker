import React, { useState, FC } from "react";
import { Dimensions } from "react-native";
// utils
import { useAppSelector } from "../../store/hooks";
// components
import CreateGroup from "../CreateGroup/CreateGroup";
import HeaderPres from "./HeaderPres";

interface Iprops {
  logOut: () => void;
}

const Header: FC<Iprops> = ({ logOut }) => {
  // get user from redux store
  const { user } = useAppSelector((state) => state.auth);

  // get screenHeight
  const screenHeight = Dimensions.get("window").height;

  // state for showing modal
  const [createOpen, setCreateOpen] = useState(false);

  const presProps = { logOut, user, createOpen, setCreateOpen, screenHeight };

  return (
    <>
      <HeaderPres {...presProps} />
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </>
  );
};

export default Header;
