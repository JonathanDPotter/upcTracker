import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../utils/colors";
const HeaderTitle = () => {
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={require("../../assets/icon.png")} />
      <Text style={styles.text}>UPC Tracker</Text>
    </View>
  );
};
export default HeaderTitle;
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    gap: 16,
    marginLeft: 16,
  },
  image: {
    height: 48,
    width: 48,
    backgroundColor: colors.platinum,
    borderRadius: 4,
  },
  text: {
    fontSize: 32,
    lineHeight: 48,
    color: colors.platinum,
    fontWeight: "bold",
  },
});
