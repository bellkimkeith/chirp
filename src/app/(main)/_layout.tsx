import { Stack } from "expo-router";
import ChatProvider from "../providers/ChatProvider";

const MainLayout = () => {
  return (
    <ChatProvider>
      <Stack screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="channel" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
};

export default MainLayout;
