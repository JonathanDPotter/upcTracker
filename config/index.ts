import { Platform } from "react-native";

const config = {
  baseURL:
    Platform.OS === "android"
      ? "http://10.0.2.2:1337"
      : "http://localhost:1337",
};

export default config;

// https://upc-tracker.herokuapp.com"
