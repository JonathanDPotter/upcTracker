import React, { useState } from "react";
import { Dimensions } from "react-native";
// components
import HomePresentation from "./HomePresentation";
// utils
import { useGetAllGroupsQuery } from "../../store/slices/groupSlice";
// interfaces
import { Igroup } from "../../interfaces/group";

const Home = () => {
  // get group data from redux store
  const { data, error, isLoading } = useGetAllGroupsQuery("");
  error && console.log(error);

  // get screenHeight
  const screenHeight = Dimensions.get("window").height;

  // state for showing modal
  const [groupOpen, setGroupOpen] = useState<Igroup | null>(null);

  const presentationProps = {
    groupOpen,
    setGroupOpen,
    data,
    isLoading,
    screenHeight,
  };

  return <HomePresentation {...presentationProps} />;
};

export default Home;
