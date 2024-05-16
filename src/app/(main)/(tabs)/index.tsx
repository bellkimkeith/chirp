import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthContextProvider";

const MainTab = () => {
  const user = useAuth().user;

  return (
    <ChannelList
      filters={{ members: { $in: [user.id] } }}
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
};

export default MainTab;
