import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthContextProvider";
import { supabase } from "../lib/supabase";
import { fetchStreamToken } from "../utils/fetchStreamToken";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const profile = useAuth().profile;

  useEffect(() => {
    if (!profile?.id) return;
    const connect = async () => {
      const token = await fetchStreamToken();
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl,
        },
        token
      );
      setIsReady(true);
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
