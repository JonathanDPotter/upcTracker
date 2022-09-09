import { TextStyle, Text } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "twrnc";

interface Iprops {
  children?: ReactNode;
  style?: (TextStyle | undefined) | (TextStyle | undefined)[];
  onPress?: () => void;
}

const MyText: FC<Iprops> = ({ children, style, onPress }) => {
  return (
    <Text
      onPress={onPress}
      style={[tw`text-base text-black font-medium`, style]}
    >
      {children}
    </Text>
  );
};

export default MyText;
