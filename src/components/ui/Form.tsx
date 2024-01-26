import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../utils/colors";

type Props = { children: ReactNode };

const Form: FC<Props> = ({ children }) => {
  return <View style={styles.form}>{children}</View>;
};

export default Form;

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: "auto",
    borderRadius: 4,
    backgroundColor: colors.platinum,
    padding: 8,
  },
});
