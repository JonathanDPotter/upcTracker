import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = { children: ReactNode };

const StyledModal: FC<Props> = ({ children }) => {
  return <View style={styles.modal}>{children}</View>;
};

export default StyledModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
