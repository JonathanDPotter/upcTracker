import { Alert, Modal, Platform, StyleSheet, TextInput } from "react-native";
import { P, CardTitle } from "./typography";
import { Button, Card, Form, LabelInput, ModalBack } from "./ui";
import { Scanner } from ".";
import colors from "../utils/colors";
import { useAppSelector } from "../../store/hooks";
import { FC, useState } from "react";
import { useGetGroupsQuery } from "../../store/slices/groupSlice";
import api from "../../api";

type Props = {
  close: () => void;
};

type FormState = {
  title: string;
  upcs: string;
};

export type ChangeEvent = {
  currentTarget: {
    id: string;
    value: string;
  };
};

const CreateGroup: FC<Props> = ({ close }) => {
  const { token, _id } = useAppSelector((state) => state.auth);

  const initialState: FormState = { title: "", upcs: "" };

  const [scannerOpen, setScannerOpen] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const { title, upcs } = formState;

  const { refetch } = useGetGroupsQuery(_id!);

  const handleChange = (event: ChangeEvent) => {
    const { id, value } = event.currentTarget;
    // prevents non-digits from being entered into the upc input
    if (id === "upcs") {
      const numbers = /[\d\s]*/;
      const total = value.split("");
      const newChar = total[total.length - 1];
      if (!numbers.test(newChar)) {
        return;
      }
    }
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async () => {
    // converts the string from the upcs textarea to an array of numbers to send to the api
    const upcsToNumberArray: number[] = [];

    upcs
      .trim()
      .split("\n")
      .forEach((upc: string) => upcsToNumberArray.push(parseInt(upc, 10)));

    // eliminates duplicate UPCs
    const noDupes = [...new Set(upcsToNumberArray)].filter(
      (entry) => entry !== null
    );

    // send to api
    try {
      if (token && _id) {
        await api.createGroup(token, {
          title,
          upcs: noDupes,
          userId: _id,
        });
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
      Platform.OS === "web" && window.alert(error.message);
    }
    refetch();
    close();
  };

  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <ModalBack>
        {/* ↓↓ white modal back ↓↓ */}
        <Card>
          <CardTitle>Create New Group</CardTitle>
          <Form>
            <LabelInput>
              <P>Title</P>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  handleChange({
                    currentTarget: { id: "title", value: text },
                  })
                }
                value={title}
                placeholder="Enter Title"
              />
            </LabelInput>
            <LabelInput>
              <P>UPCs</P>
              <TextInput
                style={[styles.input, { paddingTop: 4 }]}
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
              title="save"
              style={{ width: "30%" }}
              onPress={handleSubmit}
            />
          </Form>
          {Platform.OS === "android" && (
            <Button
              title="Scan"
              style={{ width: "30%", marginHorizontal: "auto", marginTop: 32 }}
              onPress={() => setScannerOpen(true)}
            />
          )}
          <Button
            title="Cancel"
            style={{ width: "30%", marginHorizontal: "auto", marginTop: 32 }}
            onPress={close}
          />
        </Card>
      </ModalBack>
      {scannerOpen && (
        <Scanner
          setScannerOpen={setScannerOpen}
          setUpcs={handleChange}
          upcs={upcs}
        />
      )}
    </Modal>
  );
};
export default CreateGroup;
const styles = StyleSheet.create({
  input: {
    width: "75%",
    maxWidth: "90%",
    borderWidth: 4,
    borderColor: colors.oxfordBlue,
    borderRadius: 4,
    paddingLeft: 8,
    marginLeft: 8,
  },
});
