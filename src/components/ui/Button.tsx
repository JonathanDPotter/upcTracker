import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import colors from "../../utils/colors";
import P from "../typography/P";
import { FC } from "react";

type Props = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: any;
};

const Button: FC<Props> = ({ title, style, textStyle, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        pressed ? styles.pressed : styles.default,
        style,
      ]}
      onPress={onPress}
    >
      <P
        style={
          textStyle ? Object.assign(textStyle, { fontSize: 18 }) : undefined
        }
      >
        {title}
      </P>
    </Pressable>
  );
};
export default Button;
const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  default: { backgroundColor: colors.orange },
  pressed: { backgroundColor: colors.white },
});
