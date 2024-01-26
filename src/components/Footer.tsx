import { StyleSheet, Dimensions, View } from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { Button } from "./ui";
import { P } from "./typography";
import { About } from ".";

const screenHeight = Dimensions.get("window").height;

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  const presentationProps = { aboutOpen, setAboutOpen, screenHeight };

  return (
    <View style={styles.mainView}>
      <Button title="About" onPress={() => setAboutOpen(true)} />
      <P>Jonathan Potter 2022</P>
      {aboutOpen && <About close={() => setAboutOpen(false)} />}
    </View>
  );
};
export default Footer;
const styles = StyleSheet.create({
  mainView: {
    minHeight: screenHeight * 0.1,
    backgroundColor: colors.orange,
    paddingHorizontal: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 18,
    lineHeight: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
