import { View, ViewStyle } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "twrnc";

interface Iprops {
  children?: ReactNode;
  style?: ViewStyle;
}

const LabelInput: FC<Iprops> = ({ children, style }) => {
  return (
    <View
      style={[
        tw`w-[90%] flex-row justify-between items-center mx-auto my-[1rem]`,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default LabelInput;
