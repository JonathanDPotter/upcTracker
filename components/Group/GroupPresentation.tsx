import React, { FC } from "react";
import { FlatList, Modal, TextInput, View } from "react-native";
import tw from "twrnc";
// components
import LabelInput from "../shared/LabelInput";
import MyButton from "../shared/MyButton";
import MyText from "../shared/MyText";
// utils
import IchangeEvent from "../../interfaces/changeEvent";
import submitterType from "../../enums/submitterType";
// styles
import {
  cardStyle,
  cardTitleStyle,
  formStyle,
  inputStyle,
  modalStyle,
} from "../../sharedStyles";

interface Iprops {
  title: string;
  savedUpcs: number[];
  handleSubmit: (submitter: submitterType) => Promise<void>;
  handleChange: (event: IchangeEvent) => void;
  upcs: string;
  copyToClipboard: () => Promise<void>;
  close: () => void;
  deleteGroup: () => void;
}

const GroupPresentation: FC<Iprops> = ({
  title,
  savedUpcs,
  handleSubmit,
  handleChange,
  upcs,
  copyToClipboard,
  close,
  deleteGroup,
}) => {
  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <View style={tw`${modalStyle}`}>
        {/* ↓↓ white modal back ↓↓ */}
        <View style={tw`${cardStyle}`}>
          <MyText style={tw`${cardTitleStyle}`}>{title}</MyText>
          <View style={tw`flex flex-row h-[80%]`}>
            {/* ↓↓ right side View ↓↓ */}
            <View style={tw`h-full w-1/3 text-center`}>
              <MyText style={tw`text-lg`}>Saved UPCs</MyText>
              <FlatList
                data={savedUpcs}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <MyText>{item}</MyText>}
              />
            </View>
            {/* ↓↓ left side View ↓↓ */}
            <View style={tw`h-full w-2/3`}>
              <View style={tw`${formStyle}`}>
                <LabelInput>
                  <MyText>Title</MyText>
                  <TextInput
                    style={tw`${inputStyle}`}
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
                  <MyText>UPCs</MyText>
                  <TextInput
                    style={tw`${inputStyle}`}
                    onChangeText={(text) =>
                      handleChange({
                        currentTarget: { id: "upcs", value: text },
                      })
                    }
                    value={upcs}
                    placeholder="Enter UPCs"
                    keyboardType="numeric"
                    multiline
                    numberOfLines={10}
                    textAlignVertical="top"
                  />
                </LabelInput>
                <MyButton
                  title="add"
                  style={tw`w-3/4`}
                  onPress={() => {
                    handleSubmit(submitterType.add);
                  }}
                />
                <MyButton
                  title="remove"
                  style={tw`w-3/4`}
                  onPress={() => {
                    handleSubmit(submitterType.remove);
                  }}
                />
              </View>
            </View>
          </View>
          {/* ↓↓ bottom buttons ↓↓ */}
          <View
            style={tw`h-[10%] w-[100%] flex-row content-around items-center`}
          >
            <MyButton
              title="Copy"
              style={tw`w-[30%]`}
              onPress={copyToClipboard}
            />
            <MyButton title="Cancel" style={tw`w-[30%]`} onPress={close} />
            <MyButton
              title="Delete"
              style={tw`w-[30%]`}
              onPress={deleteGroup}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GroupPresentation;
