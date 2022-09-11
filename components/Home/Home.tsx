import React, { useEffect, useState } from "react";
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

  // state for showing modal
  const [groupOpen, setGroupOpen] = useState<Igroup | null>(null);

  // update modal when data updates
  useEffect(() => {
    groupOpen &&
      setGroupOpen((prev) =>
        data.find((group: Igroup) => group._id === prev?._id)
      );
  }, [data]);

  const presentationProps = {
    groupOpen,
    setGroupOpen,
    data,
    isLoading,
  };

  return <HomePresentation {...presentationProps} />;
};

export default Home;
