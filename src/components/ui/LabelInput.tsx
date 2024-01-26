import { FC, ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type Props = { children?: ReactNode; style?: ViewStyle };

const LabelInput: FC<Props> = ({ children, style }) => {
  return <View style={[styles.labelInput, style]}>{children}</View>;
};

export default LabelInput;

const styles = StyleSheet.create({
  labelInput: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: "auto",
    marginVertical: 16,
  },
});
