import React, { Dispatch, FC } from "react";
import { View } from "react-native";
import tw from "twrnc";
import About from "../About/About";
import MyButton from "../shared/MyButton";
import MyText from "../shared/MyText";

interface Iprops {
  aboutOpen: boolean;
  setAboutOpen: Dispatch<React.SetStateAction<boolean>>;
  screenHeight: number;
}

const FooterPresentation: FC<Iprops> = ({
  aboutOpen,
  setAboutOpen,
  screenHeight,
}) => {
  return (
    <View
      style={tw`min-h-[${
        screenHeight * 0.1
      }px] bg-slate-300 px-4 absolute bottom-0 left-0 right-0 text-lg flex-row justify-between items-center`}
    >
      <MyButton title="About" onPress={() => setAboutOpen(true)} />
      <MyText>Jonathan Potter 2022</MyText>
      {aboutOpen && <About close={() => setAboutOpen(false)} />}
    </View>
  );
};

export default FooterPresentation;
