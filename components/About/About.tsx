import React, { FC } from "react";
import tw from "twrnc";
// components
import { Linking, Modal, View } from "react-native";
import MyButton from "../shared/MyButton";
import MyText from "../shared/MyText";
// styles
import { cardStyle, cardTitleStyle, modalStyle } from "../../sharedStyles";

interface Iprops {
  close: () => void;
}

const About: FC<Iprops> = ({ close }) => {
  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <View style={tw`${modalStyle}`}>
        {/* ↓↓ white modal back ↓↓ */}
        <View style={tw`${cardStyle} h-[95%] `}>
          <MyText style={tw`${cardTitleStyle}`}>About</MyText>
          <MyText>
            {`\t`}This is an app that I made in order to keep lists of UPCs. The
            UPCs can be entered one at a time or pasted in from excel and can be
            copied and pasted back into excel.{`\n`}
          </MyText>
          <MyText>
            {`\t`}The back-end is written in typescript with express and this
            front-end is written in typescript with React Native. The styling is
            done using tailwindcss. The repo for this app can be found on GitHub{" "}
            <MyText
              style={tw`text-blue-600`}
              onPress={() =>
                Linking.openURL("https://github.com/JonathanDPotter/upcTracker")
              }
            >
              here
            </MyText>{" "}
            .
          </MyText>
          <MyButton style={tw`m-top-[3rem]`} title="close" onPress={close} />
        </View>
      </View>
    </Modal>
  );
};

export default About;
