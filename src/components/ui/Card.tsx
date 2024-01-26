import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../utils/colors";

type Props = { children: ReactNode };

const Card: FC<Props> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};
export default Card;
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 8,
    width: "95%",
    height: "95%",
  },
});
