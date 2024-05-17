import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContextProvider from "../providers/AuthContextProvider";
import QueryProvider from "../providers/QueryProvider";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <AuthContextProvider>
          <Slot />
        </AuthContextProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
