import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../providers/AuthContextProvider";
import { router } from "expo-router";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { user: me, profile } = useAuth();

  const onPress = async () => {
    if (
      !profile.full_name ||
      profile.full_name === "" ||
      profile.full_name === undefined
    ) {
      Alert.alert(
        "Full name empty",
        "Please add full name to make other users recognize you",
        [
          {
            text: "Go to profile",
            onPress: () => {
              router.push("/(main)/profile");
            },
          },
          {
            text: "Ask me later",
            onPress: () => {
              console.log("Ask me later pressed");
            },
            style: "cancel",
          },
        ]
      );
    }

    const channel = client.channel("messaging", {
      members: [me.id, user.id],
    });
    await channel.watch();
    router.replace(`/channel/${channel.cid}`);
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
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.2,
  },
  nameText: {
    fontWeight: "500",
  },
});
