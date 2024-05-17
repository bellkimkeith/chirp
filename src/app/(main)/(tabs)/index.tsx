import { Link, Stack, router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthContextProvider";
import { Entypo } from "@expo/vector-icons";
const MainTab = () => {
  const user = useAuth().user;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <Link href={"/(main)/users"} asChild>
              <Entypo
                name="new-message"
                size={24}
                color={tintColor}
                style={{ marginRight: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
};

export default MainTab;
