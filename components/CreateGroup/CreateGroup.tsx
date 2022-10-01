import React, { FC, useState } from "react";
import { Alert, Platform } from "react-native";
// utils
import api from "../../api";
import IchangeEvent from "../../interfaces/changeEvent";
import { useAppSelector } from "../../store/hooks";
import { useGetAllGroupsQuery } from "../../store/slices/groupSlice";
// components
import CreateGroupPresentation from "./CreateGroupPresentation";

interface Iprops {
  close: () => void;
}

interface IformState {
  title: string;
  upcs: string;
}

const CreateGroup: FC<Iprops> = ({ close }) => {
  // get auth from redux
  const { token } = useAppSelector((state) => state.auth);

  // local state for form
  const initialState: IformState = { title: "", upcs: "" };

  const [scannerOpen, setScannerOpen] = useState(false);

  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  const { refetch } = useGetAllGroupsQuery("");

  // handle change and submit for form
  const handleChange = (event: IchangeEvent) => {
    const { id, value } = event.currentTarget;
    // prevents non-digits from being entered into the upc input
    if (id === "upcs") {
      const numbers = /[\d\s]*/;
      const total = value.split("");
      const newChar = total[total.length - 1];
      if (!numbers.test(newChar)) {
        return;
      }
    }
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async () => {
    // converts the string from the upcs textarea to an array of numbers to send to the api
    const upcsToNumberArray: number[] = [];

    upcs
      .trim()
      .split("\n")
      .forEach((upc) => upcsToNumberArray.push(parseInt(upc, 10)));

    // eliminates duplicate UPCs
    const noDupes = [...new Set(upcsToNumberArray)];

    // send to api
    try {
      if (token) {
        const response = await api.createGroup(token, {
          title,
          upcs: noDupes,
        });
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
      Platform.OS === "web" && window.alert(error.message);
    }
    refetch();
    close();
  };

  const presentationProps = {
    handleSubmit,
    handleChange,
    title,
    upcs,
    close,
    scannerOpen,
    setScannerOpen
  };

  return <CreateGroupPresentation {...presentationProps} />;
};

export default CreateGroup;
