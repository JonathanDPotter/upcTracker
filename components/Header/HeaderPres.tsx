import { View, Image, Platform } from "react-native";
import React, { FC } from "react";
import tw from "twrnc";
// components
import CreateGroup from "../CreateGroup/CreateGroup";
import MyButton from "../shared/MyButton";

interface Iprops {
  logOut: () => void;
  user: string | null;
  createOpen: boolean;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  screenHeight: number;
}

// TODO: add apk download to web version

const HeaderPres: FC<Iprops> = ({
  logOut,
  user,
  createOpen,
  setCreateOpen,
  screenHeight,
}) => {
  return (
    <View
      style={[
        tw`
        min-h-[${screenHeight * 0.15}px]
        top-0
        bg-slate-300
        text-lg
        flex-row
        justify-around
        items-center`,
        Platform.OS === "android" && { paddingTop: 30 },
      ]}
    >
      <Image
        style={tw`h-[2rem] w-[2rem]`}
        source={require("../../assets/icon.png")}
      />
      {user && (
        <MyButton
          onPress={() => setCreateOpen(true)}
          title="Create New Group"
        />
      )}
      {user && <MyButton onPress={logOut} title="Log Out" />}
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
    </View>
  );
};

export default HeaderPres;
