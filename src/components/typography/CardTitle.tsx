import { FC } from "react";
import { StyleSheet, Text } from "react-native";

type Props = { children: string };

const CardTitle: FC<Props> = ({ children }) => {
  return <Text style={styles.cardTitle}>{children}</Text>;
};
export default CardTitle;
const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 32,
    marginHorizontal: "auto",
    marginVertical: 8,
    fontFamily: "Inter",
  },
});
