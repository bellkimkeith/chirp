import { Stack } from "expo-router";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("ex3u9cx4uhh5");

const MainLayout = () => {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "bellkimkeith",
          name: "Bellkim Keith",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("bellkimkeith")
      );

      // const channel = client.channel("messaging", "bajijay", {
      //   name: "bajijay",
      // });
      // await channel.watch();
    };
    connect();
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="channel" options={{ headerShown: false }} />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
};

export default MainLayout;
