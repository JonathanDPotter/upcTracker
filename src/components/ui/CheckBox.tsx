import { Pressable, ViewStyle } from "react-native";
import React, { FC } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../utils/colors";

type Props = {
  value: boolean;
  onValueChange: () => void;
  style?: ViewStyle;
};

const CheckBox: FC<Props> = ({ value, onValueChange, style }) => {
  return (
    <Pressable onPress={onValueChange}>
      <FontAwesome
        name={value ? "check-square-o" : "square-o"}
        style={style}
        size={16}
      />
    </Pressable>
  );
};

export default CheckBox;
