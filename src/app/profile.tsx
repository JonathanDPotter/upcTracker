import { Alert, Platform, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Button } from "../components/ui";
import { PageTitle } from "../components/typography";
import { FC } from "react";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setId, setToken, setUser } from "../../store/slices/authSlice";

const Profile: FC = () => {
  const { _id, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(setUser(null));
    dispatch(setId(null));
    dispatch(setToken(null));
  };

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
    <View>
      <PageTitle>Profile</PageTitle>
      <Button title="Log Out" onPress={() => logOut()} />
      <Button title="Delete Profile" onPress={() => deleteUser()} />

      <Button
        style={{ marginTop: 24, marginBottom: 24 }}
        title="Home"
        onPress={() => router.push("/")}
      />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({ mainView: { gap: 16 } });
