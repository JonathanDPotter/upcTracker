import React, { FC } from "react";
import { Modal, TextInput, View } from "react-native";
import tw from "twrnc";
// components
import MyText from "../shared/MyText";
import MyButton from "../shared/MyButton";
import LabelInput from "../shared/LabelInput";
// utils
import IchangeEvent from "../../interfaces/changeEvent";
// styles
import {
  cardStyle,
  cardTitleStyle,
  formStyle,
  inputStyle,
  modalStyle,
} from "../../sharedStyles";

interface Iprops {
  handleSubmit: () => Promise<void>;
  handleChange: (event: IchangeEvent) => void;
  title: string;
  upcs: string;
  close: () => void;
}

const CreateGroupPresentation: FC<Iprops> = ({
  handleSubmit,
  handleChange,
  title,
  upcs,
  close,
}) => {
  return (
    <Modal animationType="slide" transparent visible onRequestClose={close}>
      {/* ↓↓ translucent modal back ↓↓ */}
      <View style={tw`${modalStyle}`}>
        {/* ↓↓ white modal back ↓↓ */}
        <View style={tw`${cardStyle} h-[95%] `}>
          <MyText style={tw`${cardTitleStyle}`}>Create New Group</MyText>
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
            <MyButton title="save" style={tw`w-[30%]`} onPress={handleSubmit} />
          </View>
          <MyButton
            title="Cancel"
            style={tw`w-[30%] mx-auto m-top-[2rem]`}
            onPress={close}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateGroupPresentation;
