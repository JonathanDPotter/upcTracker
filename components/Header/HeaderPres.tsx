import { View, Image, Platform, Linking } from "react-native";
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
      {user ? (
        <MyButton
          onPress={() => setCreateOpen(true)}
          title="Create New Group"
        />
      ) : null}
      {user ? <MyButton onPress={logOut} title="Log Out" /> : null}
      {Platform.OS === "web" && user ? (
        <MyButton
          onPress={() => {
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.jonathandpotter.upctracker"
            );
          }}
          title="Get App"
        />
      ) : null}
      {createOpen ? <CreateGroup close={() => setCreateOpen(false)} /> : null}
    </View>
  );
};

export default HeaderPres;
