import { Redirect, Stack } from "expo-router";
import ChatProvider from "../../providers/ChatProvider";
import { useAuth } from "../../providers/AuthContextProvider";

const MainLayout = () => {
  const user = useAuth().user;

  if (!user) return <Redirect href={"/(auth)/login"} />;

  return (
    <ChatProvider>
      <Stack screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="channel" options={{ headerShown: false }} />
        <Stack.Screen name="users" options={{ title: "Users" }} />
      </Stack>
    </ChatProvider>
  );
};

export default MainLayout;
