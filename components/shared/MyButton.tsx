import { Pressable, TextStyle, ViewStyle } from "react-native";
import React, { FC } from "react";
import tw from "twrnc";
import MyText from "./MyText";

interface Iprops {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: any;
}

const MyButton: FC<Iprops> = ({ title, style, textStyle, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`px-4 py-2 m-2 rounded items-center`,
        pressed ? tw`bg-blue-200` : tw`bg-blue-300`,
        style,
      ]}
      onPress={onPress}
    >
      <MyText style={[tw`text-lg`, textStyle]}>{title}</MyText>
    </Pressable>
  );
};

export default MyButton;
