import { Pressable, ViewStyle } from "react-native";
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import tw from "twrnc";

interface Iprops {
  value: boolean;
  onValueChange: () => void;
  style?: ViewStyle;
}

const CheckBox: FC<Iprops> = ({ value, onValueChange, style }) => {
  return (
    <Pressable onPress={onValueChange} style={style}>
      <FontAwesomeIcon icon={faSquare} />
      {value && <FontAwesomeIcon style={tw`absolute`} icon={faCheck} />}
    </Pressable>
  );
};

export default CheckBox;
