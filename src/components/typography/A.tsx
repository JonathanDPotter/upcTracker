import { FC, useState } from "react";
import { Linking, Text, TextStyle } from "react-native";

type Props = { children: string; href: string; style?: TextStyle };

const A: FC<Props> = ({ children, href, style }) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    Linking.openURL(href);
  };

  return (
    <Text
      onPress={() => handlePress()}
      style={[style, { color: pressed ? "purple" : "blue" }]}
    >
      {children}
    </Text>
  );
};
export default A;
