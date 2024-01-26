import { SplashScreen, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";
import colors from "../utils/colors";
import HeaderTitle from "../components/HeaderTitle";
import { Footer } from "../components";
const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black,
    PoppinsReg: Poppins_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.oxfordBlue,
          },
          headerTitle: () => <HeaderTitle />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "UPC Tracker" }} />
      </Stack>
      <Footer />
    </Provider>
  );
};
export default RootLayout;
