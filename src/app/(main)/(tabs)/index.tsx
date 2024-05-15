import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";

const MainTab = () => {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
};

export default MainTab;
