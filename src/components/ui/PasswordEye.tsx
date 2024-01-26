import { FontAwesome } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = { onPress: () => void; show: boolean };

const PasswordEye: FC<Props> = ({ onPress, show }) => {
  return (
    <Pressable onPress={onPress} style={styles.showButton}>
      <FontAwesome name={show ? "eye" : "eye-slash"} size={16} />
    </Pressable>
  );
};
export default PasswordEye;
const styles = StyleSheet.create({
  showButton: {
    position: "absolute",
    right: 0,
    // setting top to 50% and translating it back 8 (half the size of the icon) ensures vertical centering of the icon
    top: "50%",
    transform: [{ translateY: -8 }],
  },
});
