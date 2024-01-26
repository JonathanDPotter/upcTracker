import { FC } from "react";
import { Linking, Modal, View } from "react-native";
import { Button, Card, ModalBack } from "./ui";
import { CardTitle, P } from "./typography";
import A from "./typography/A";

type Props = { close: () => void };

const About: FC<Props> = ({ close }) => {
  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <ModalBack>
        {/* ↓↓ white modal back ↓↓ */}
        <Card>
          <CardTitle>About</CardTitle>
          <View style={{ padding: 2 }}>
            <P>
              This is an app that I made in order to keep lists of UPCs. The
              UPCs can be entered one at a time or pasted in from excel and can
              be copied and pasted back into excel.
            </P>
            <P>
              The back-end is written in typescript with express and this
              front-end is written in typescript with React Native. The repo for
              this app can be found on GitHub{" "}
              <A href="https://github.com/JonathanDPotter/upcTracker">here</A>.
            </P>
          </View>
          <Button
            title="view privacy policy"
            onPress={() =>
              Linking.openURL(
                "https://www.freeprivacypolicy.com/live/a92f926d-be2a-4b5a-b5ac-68db653294d2"
              )
            }
          />
          <Button
            style={{ marginTop: 24, marginBottom: 24 }}
            title="close"
            onPress={close}
          />
        </Card>
      </ModalBack>
    </Modal>
  );
};
export default About;
