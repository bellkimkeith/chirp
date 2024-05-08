import { StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";

const MainTab = () => {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
};

export default MainTab;

const styles = StyleSheet.create({});
