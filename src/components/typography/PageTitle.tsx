import { FC } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type Props = { children: string; style?: TextStyle };

const PageTitle: FC<Props> = ({ children }) => {
  return <Text style={styles.pageTitle}>{children}</Text>;
};
export default PageTitle;
const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
    marginHorizontal: "auto",
    marginVertical: 4,
  },
});
