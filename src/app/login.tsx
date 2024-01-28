import { useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useAppDispatch } from "../../store/hooks";
import { setId, setToken, setUser } from "../../store/slices/authSlice";
import api from "../../api";
import { P, PageTitle } from "../components/typography";
import {
  Button,
  CheckBox,
  Form,
  LabelInput,
  PasswordEye,
} from "../components/ui";
import colors from "../utils/colors";
import { router } from "expo-router";

const screenHeight = Dimensions.get("window").height;

const Login = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [show, setShow] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setNewUser(false);
    setShow(false);
  };

  const handleSubmit = async () => {
    try {
      if (newUser) await api.register({ username, password });
      const response = await api.login({ username, password });

      if (response?.data.token) {
        dispatch(setToken(response?.data.token));
        dispatch(setUser(username));
        dispatch(setId(response?.data.user._id));
        router.push("/");
      } else {
        Alert.alert(response?.data.message);
        Platform.OS === "web" && window.alert(response?.data.message);
        resetForm();
      }
    } catch (error: any) {
      Alert.alert(error.message);
      Platform.OS === "web" && window.alert(error.message);
    }
  };
  return (
    <View style={styles.mainView}>
      <PageTitle>{newUser ? "Register" : "Login"}</PageTitle>
      <Form>
        <LabelInput style={{ justifyContent: "flex-start" }}>
          <P>New User?</P>
          <CheckBox
            value={newUser}
            onValueChange={() => setNewUser((prev) => !prev)}
            style={styles.checkBox}
          />
        </LabelInput>
        <LabelInput>
          <P>Username</P>
          <TextInput
            style={styles.textInput}
            onChangeText={setUsername}
            autoComplete={newUser ? "username-new" : "username"}
            value={username}
            placeholder="Enter Username"
          />
        </LabelInput>
        <LabelInput>
          <P>Password</P>
          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            autoComplete={newUser ? "password-new" : "password"}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={!show}
          />
          <PasswordEye show={show} onPress={() => setShow((prev) => !prev)} />
        </LabelInput>
        {newUser && (
          <LabelInput>
            <P>Repeat Password</P>
            <TextInput
              style={styles.textInput}
              onChangeText={setRepeatPassword}
              autoComplete="password-new"
              value={repeatPassword}
              placeholder="Repeat Password"
              secureTextEntry={!show}
            />
            <PasswordEye show={show} onPress={() => setShow((prev) => !prev)} />
          </LabelInput>
        )}
        <Button
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </Form>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  mainView: { minHeight: screenHeight * 0.85, padding: 4 },
  checkBox: {
    marginLeft: 8,
    marginRight: "auto",
    marginVertical: "auto",
  },
  submitButton: { marginTop: 8, marginLeft: "auto" },
  textInput: {
    marginRight: 16,
    width: "40%",
    borderBottomWidth: 1,
    borderBottomColor: colors.oxfordBlue,
  },
});
