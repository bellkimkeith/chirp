import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthContextProvider";
import { router } from "expo-router";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { user: me, profile } = useAuth();
  const onPress = async () => {
    if (!profile.full_name) {
      Alert.alert("No Full Name", "Please add full name first.", [
        {
          text: "Go to profile",
          onPress: () => {
            console.log("go to profile");
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ]);
      return;
    } else {
      const channel = client.channel("messaging", {
        members: [me.id, user.id],
      });
      await channel.watch();
      router.replace(`/channel/${channel.cid}`);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.nameText}>{user.full_name}</Text>
      </Pressable>
    </View>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  nameText: {
    fontWeight: "500",
  },
});
