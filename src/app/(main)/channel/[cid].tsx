import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Channel as ChannelType } from "stream-chat";
import {
  MessageList,
  MessageInput,
  Channel,
  useChatContext,
} from "stream-chat-expo";

const ChannelScreen = () => {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannelByCid = async () => {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
    };
    fetchChannelByCid();
  }, [cid]);

  return channel ? (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "" || channel.id }} />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
});
