import { Alert, Modal, Platform, StyleSheet } from "react-native";
import { Button, Card, ModalBack } from "./ui";
import { CardTitle, P } from "./typography";
import { FC } from "react";
import api from "../../api";
import { useAppSelector } from "../../store/hooks";

type Props = { logOut: () => void; close: () => void };

const Profile: FC<Props> = ({ logOut, close }) => {
  const { _id, token } = useAppSelector((state) => state.auth);

  const deleteUser = async () => {
    if (Platform.OS !== "web") {
      Alert.alert(
        "Delete Group",
        "Are you sure you want to delete this profile?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await api.deleteUser(_id!, token!);
              logOut();
            },
          },
        ]
      );
    } else {
      if (window.confirm("Are you sure you want to delete this profile?")) {
        await api.deleteUser(_id!, token!);
        logOut();
      } else {
        console.log("oops");
      }
    }
  };

  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <ModalBack>
        {/* ↓↓ white modal back ↓↓ */}
        <Card>
          <CardTitle>Profile</CardTitle>
          <Button title="Log Out" onPress={() => logOut()} />
          <Button title="Delete Profile" onPress={() => deleteUser()} />

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
export default Profile;
const styles = StyleSheet.create({});
