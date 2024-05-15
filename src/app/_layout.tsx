import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContextProvider from "../providers/AuthContextProvider";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <Slot />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
