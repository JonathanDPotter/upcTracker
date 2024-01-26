import { FC, ReactNode } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type Props = { children: ReactNode; style?: TextStyle };

const P: FC<Props> = ({ children, style }) => {
  return (
    <Text style={[styles.p, style]}>
      {"  "}
      {children}
    </Text>
  );
};

export default P;

const styles = StyleSheet.create({
  p: { fontFamily: "Inter", marginVertical: 4 },
});
