import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthContextProvider";
import { supabase } from "../lib/supabase";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const profile = useAuth().profile;

  useEffect(() => {
    if (!profile?.id) return;
    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl,
        },
        client.devToken(profile.id)
      );
      setIsReady(true);

      // const channel = client.channel("messaging", "bajijay", {
      //   name: "bajijay",
      // });
      // await channel.watch();
    };

    connect();

    return () => {
      client.disconnectUser();
      setIsReady(false);
    };
  }, [profile?.id, profile?.full_name, profile?.avatar_url]);

  if (!isReady) return <ActivityIndicator />;

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
