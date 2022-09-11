import React, { FC, useState } from "react";
import { Alert, Platform } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
// components
import GroupPresentation from "./GroupPresentation";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
import submitterType from "../../enums/submitterType";
import IchangeEvent from "../../interfaces/changeEvent";
import { useGetAllGroupsQuery } from "../../store/slices/groupSlice";

// local interfaces
interface Iprops {
  id: string;
  savedTitle: string;
  savedUpcs: number[];
  close: () => void;
}

interface IformState {
  title: string;
  upcs: string;
}

const Group: FC<Iprops> = ({ id, savedTitle, savedUpcs, close }) => {
  // get auth token from redux store
  const { token } = useAppSelector((state) => state.auth);

  // local state for form data
  const initialState: IformState = {
    title: savedTitle,
    upcs: "",
  };

  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  const { refetch } = useGetAllGroupsQuery("");

  const handleChange = (event: IchangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { id, value } = event.currentTarget;
    if (id === "upcs") {
      const numbers = /[\d\s]*/;
      const total = value.split("");
      const newChar = total[total.length - 1];
      if (!numbers.test(newChar)) {
        return;
      }
    }
    setFormState((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (submitter: submitterType) => {
    // converts the string from the upcs textarea to an array of numbers to send to the api
    const upcsToNumberArray: number[] = [];

    console.log(`upcs: ${upcs}`);

    upcs
      .trim()
      .split("\n")
      .forEach((upc) => upcsToNumberArray.push(parseInt(upc, 10)));

    let newArray: number[] = [...savedUpcs];

    if (submitter === submitterType.add) {
      upcsToNumberArray.forEach((upc) => newArray.push(upc));
    } else if (submitter === submitterType.remove) {
      upcsToNumberArray.forEach((upc) => {
        newArray = newArray.filter((savedUpc) => savedUpc !== upc);
      });
    }
    // removes duplicate upcs
    const noDupes = [...new Set(newArray)];

    // send to api
    try {
      if (token) {
        const response = await api.updateGroup(id, token, {
          title,
          upcs: noDupes,
        });
        console.log(response.status);
      }
    } catch (error: any) {
      console.log(error);
    }
    refetch();
    setFormState((prev) => {
      return { ...prev, upcs: "" };
    });
  };

  const deleteGroup = async () => {
    if (Platform.OS === "android") {
      Alert.alert("Delete Group", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await api.deleteGroup(id, token ? token : "");
            refetch();
            close();
          },
        },
      ]);
    } else {
      if (window.confirm("Are you sure you want to delete this group?")) {
        await api.deleteGroup(id, token ? token : "");
        refetch();
        close();
      } else {
        console.log("oops");
      }
    }
  };

  const copyToClipboard = async () => {
    let savedToString: string[] = [];
    savedUpcs.forEach((upc) => {
      savedToString.push(upc.toString());
    });

    await Clipboard.setString(savedToString.join(" \n"));
  };

  const props = {
    title,
    savedUpcs,
    handleSubmit,
    handleChange,
    upcs,
    copyToClipboard,
    close,
    deleteGroup,
  };

  return <GroupPresentation {...props} />;
};

export default Group;
