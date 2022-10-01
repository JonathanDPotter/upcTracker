import { TextStyle, Text } from "react-native";
import React, { FC, ReactNode } from "react";
import { useFonts } from "expo-font";
import tw from "twrnc";

interface Iprops {
  children?: ReactNode;
  style?: (TextStyle | undefined) | (TextStyle | undefined)[];
  onPress?: () => void;
}

const MyText: FC<Iprops> = ({ children, style, onPress }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/Poppins-Regular.ttf"),
  });
  return (
    <Text
      onPress={onPress}
      style={[
        tw`text-base text-black`,
        style,
        fontsLoaded ? { fontFamily: "Poppins-Regular" } : null,
      ]}
    >
      {children}
    </Text>
  );
};

export default MyText;
