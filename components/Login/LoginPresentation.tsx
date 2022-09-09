import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import tw from "twrnc";
import React, { FC, FormEvent } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import LabelInput from "../shared/LabelInput";
import CheckBox from "../shared/CheckBox";
import MyText from "../shared/MyText";
import MyButton from "../shared/MyButton";

interface Iprops {
  handleSubmit: (event: FormEvent) => Promise<void>;
  newUser: boolean;
  toggleNewUser: () => void;
  username: string;
  setUsername: (newState: string) => void;
  password: string;
  setPassword: (newState: string) => void;
  repeatPassword: string;
  setRepeatPassword: (newState: string) => void;
  show: boolean;
  toggleShow: () => void;
  screenHeight: number;
}

const LoginPresentation: FC<Iprops> = ({
  handleSubmit,
  newUser,
  toggleNewUser,
  username,
  setUsername,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  show,
  toggleShow,
  screenHeight,
}) => {
  const labelInputStyle = tw`border-b-[1px] w-[90%] border-slate-400 relative`;

  return (
    <View style={tw`min-h-[${screenHeight * 0.85}px] p-2`}>
      <MyText style={[tw`mx-auto`]}>{newUser ? "Register" : "Login"}</MyText>
      <View style={tw`min-h-120 w-[95%] mx-auto rounded bg-amber-100 relative`}>
        <LabelInput style={labelInputStyle}>
          <MyText>New User?</MyText>
          <CheckBox
            value={newUser}
            onValueChange={toggleNewUser}
            style={tw`ml-4 mr-auto w-100 mt-1`}
          />
        </LabelInput>
        <LabelInput style={labelInputStyle}>
          <MyText>Username</MyText>
          <TextInput
            onChangeText={setUsername}
            autoComplete={newUser ? "username-new" : "username"}
            value={username}
            placeholder="Enter Username"
          />
        </LabelInput>
        <LabelInput style={labelInputStyle}>
          <MyText>Password</MyText>
          <TextInput
            onChangeText={setPassword}
            autoComplete={newUser ? "password-new" : "password"}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={!show}
          />
          <Pressable
            onPress={toggleShow}
            style={tw`absolute right-0 mt-[.25rem]`}
          >
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </Pressable>
        </LabelInput>
        {newUser && (
          <LabelInput style={labelInputStyle}>
            <MyText>Repeat Password</MyText>
            <TextInput
              onChangeText={setRepeatPassword}
              autoComplete="password-new"
              value={repeatPassword}
              placeholder="Repeat Password"
              secureTextEntry={!show}
            />
            <Pressable
              onPress={toggleShow}
              style={tw`absolute right-0 mt-[.25rem]`}
            >
              <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </Pressable>
          </LabelInput>
        )}
        <MyButton
          title="submit"
          onPress={handleSubmit}
          style={tw`absolute bottom-[5rem] right-3rem left-3rem`}
        />
      </View>
    </View>
  );
};

export default LoginPresentation;
