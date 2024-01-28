import { FC, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  TextInput,
  View,
} from "react-native";
import Clipboard from "expo-clipboard";
import { Button, Card, Form, LabelInput, ModalBack } from "./ui";
import { CardTitle, P } from "./typography";
import { Scanner } from ".";
import { useAppSelector } from "../../store/hooks";
import { useGetGroupsQuery } from "../../store/slices/groupSlice";
import api from "../../api";
import { ChangeEvent } from "./CreateGroup";

type Props = {
  id: string;
  savedTitle: string;
  savedUpcs: number[];
  close: () => void;
};

type FormState = {
  title: string;
  upcs: string;
};

enum SubmitterType {
  add = "add",
  remove = "remove",
}

const Group: FC<Props> = ({ id, savedTitle, savedUpcs, close }) => {
  const { token, _id } = useAppSelector((state) => state.auth);

  const initialState: FormState = {
    title: savedTitle,
    upcs: "",
  };
  const [scannerOpen, setScannerOpen] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  const { refetch } = useGetGroupsQuery(_id!);

  const handleChange = (event: ChangeEvent) => {
    const { id, value } = event.currentTarget;
    if (id === "upcs") {
      const numbers = /[\d\s]*/;
      const total = value.split("");
      const newChar = total[total.length - 1];
      if (!numbers.test(newChar)) {
        return;
      }
    }
    setFormState((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async (submitter: SubmitterType) => {
    // converts the string from the upcs textarea to an array of numbers to send to the api
    const upcsToNumberArray: number[] = [];

    upcs
      .trim()
      .split("\n")
      .forEach((upc) => upcsToNumberArray.push(parseInt(upc, 10)));

    let newArray: number[] = [...savedUpcs];

    if (submitter === SubmitterType.add) {
      upcsToNumberArray.forEach((upc) => newArray.push(upc));
    } else if (submitter === SubmitterType.remove) {
      upcsToNumberArray.forEach((upc) => {
        newArray = newArray.filter((savedUpc) => savedUpc !== upc);
      });
    }
    // removes duplicate upcs
    const noDupes = [...new Set(newArray)].filter((entry) => entry !== null);

    try {
      if (token) {
        const response = await api.updateGroup(id, token, {
          title,
          upcs: noDupes,
        });
        console.log(response.status);
      }
    } catch (error: any) {
      console.log(error);
    }
    refetch();
    setFormState((prev) => {
      return { ...prev, upcs: "" };
    });
  };

  const deleteGroup = async () => {
    if (Platform.OS !== "web") {
      Alert.alert(
        "Delete Group",
        "Are you sure you want to delete this group?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              await api.deleteGroup(id, token ? token : "");
              refetch();
              close();
            },
          },
        ]
      );
    } else {
      if (window.confirm("Are you sure you want to delete this group?")) {
        await api.deleteGroup(id, token ? token : "");
        refetch();
        close();
      } else {
        console.log("oops");
      }
    }
  };

  const copyToClipboard = () => {
    try {
      let savedToString: string[] = [];
      savedUpcs.forEach((upc) => {
        savedToString.push(upc.toString());
      });
      Clipboard.setStringAsync(savedToString.join(" \n"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <ModalBack>
        {/* ↓↓ white modal back ↓↓ */}
        <Card>
          <CardTitle>{title}</CardTitle>
          <View
            style={{ display: "flex", flexDirection: "row", height: "80%" }}
          >
            {/* ↓↓ right side View ↓↓ */}
            <View style={{ height: "auto", width: "33%" }}>
              <P
                style={{
                  fontSize: 18,
                  lineHeight: 28,
                  marginHorizontal: "auto",
                }}
              >
                Saved UPCs
              </P>
              <FlatList
                data={savedUpcs}
                keyExtractor={(item) => item?.toString()}
                renderItem={({ item }) =>
                  item ? <P>{item.toString()}</P> : null
                }
              />
            </View>
            {/* ↓↓ left side View ↓↓ */}
            <View style={{ height: "auto", flex: 1 }}>
              <Form>
                <LabelInput>
                  <P>Title</P>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange({
                        currentTarget: { id: "title", value: text },
                      })
                    }
                    value={title}
                    placeholder="Enter Title"
                  />
                </LabelInput>
                <LabelInput style={{ alignItems: "flex-start" }}>
                  <P>UPCs</P>
                  <TextInput
                    onChangeText={(text) =>
                      handleChange({
                        currentTarget: { id: "upcs", value: text },
                      })
                    }
                    value={upcs}
                    placeholder="Enter UPCs"
                    inputMode="numeric"
                    multiline
                    numberOfLines={10}
                    textAlignVertical="top"
                  />
                </LabelInput>
                <Button
                  title="Add"
                  style={{ width: "75%" }}
                  onPress={() => {
                    handleSubmit(SubmitterType.add);
                  }}
                />
                <Button
                  title="Remove"
                  style={{ width: "75%" }}
                  onPress={() => {
                    handleSubmit(SubmitterType.remove);
                  }}
                />
              </Form>
            </View>
          </View>
          {/* ↓↓ bottom buttons ↓↓ */}
          <View
            style={{
              height: "10%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {Platform.OS === "web" ? (
              <Button
                title="Copy"
                style={{ width: "30%" }}
                onPress={copyToClipboard}
              />
            ) : (
              <Button
                title="Scan"
                style={{ width: "30%" }}
                onPress={() => setScannerOpen((prev) => !prev)}
              />
            )}

            <Button title="Close" style={{ width: "30%" }} onPress={close} />
            <Button
              title="Delete"
              style={{ width: "30%" }}
              onPress={deleteGroup}
            />
          </View>
        </Card>
      </ModalBack>
      {scannerOpen ? (
        <Scanner
          setScannerOpen={setScannerOpen}
          setUpcs={handleChange}
          upcs={upcs}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default Group;
