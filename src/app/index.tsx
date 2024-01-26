import { FC, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Platform, Linking } from "react-native";
import { router } from "expo-router";
import { Document } from "mongoose";
import { CreateGroup, Group } from "../components";
import { P, PageTitle } from "../components/typography";
import { Button } from "../components/ui";
import { useGetGroupsQuery } from "../../store/slices/groupSlice";
import { setUser, setId, setToken } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import api from "../../api";
import colors from "../utils/colors";

export interface Group extends Document {
  title: string;
  upcs: number[];
  userId?: string;
}

const index: FC = () => {
  const { user, token, _id } = useAppSelector((state) => state.auth);
  const { data, error, isLoading } = useGetGroupsQuery(_id!);

  const [groupOpen, setGroupOpen] = useState<Group | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(setUser(null));
    dispatch(setId(null));
    dispatch(setToken(null));
  };

  useEffect(() => {
    !user && setTimeout(() => router.push("/login"), 10);
  }, [user]);

  useEffect(() => {
    api.validate(token).then((result) => {
      if (result?.status !== 200) {
        logOut();
      }
    });
  }, []);

  useEffect(() => {
    groupOpen &&
      setGroupOpen((prev) =>
        data.find((group: Group) => group._id === prev?._id)
      );
  }, [data]);

  return (
    <View style={styles.mainView}>
      <P>{`Logged in as: ${user}`}</P>
      <View style={styles.buttonView}>
        <Button onPress={() => setCreateOpen(true)} title="Create New Group" />
        <Button onPress={() => router.push("/profile")} title="Profile" />
        {Platform.OS === "web" && user && (
          <Button
            onPress={() => {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.jonathandpotter.upctracker"
              );
            }}
            title="Get App"
          />
        )}
      </View>
      {createOpen && <CreateGroup close={() => setCreateOpen(false)} />}
      <PageTitle>Groups</PageTitle>
      {isLoading && <P>Loading...</P>}
      {error && <P>{error.toString()}</P>}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            item.userId === _id ? (
              <Button
                style={styles.button}
                title={item.title}
                onPress={() => setGroupOpen(item)}
              />
            ) : null
          }
        />
      )}
      {groupOpen && (
        <Group
          id={groupOpen._id}
          savedTitle={groupOpen.title}
          savedUpcs={groupOpen.upcs}
          close={() => setGroupOpen(null)}
        />
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainView: { backgroundColor: colors.platinum, flex: 1, alignItems: "center" },
  buttonView: { flexDirection: "row", justifyContent: "space-evenly" },
  button: { minWidth: 200 },
});
