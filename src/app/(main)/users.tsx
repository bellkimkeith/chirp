import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useGetProfiles } from "../../api/profile";
import UserListItem from "../../components/UserListItem";

const UsersScreen = () => {
  const { data: users, isFetching, error } = useGetProfiles();
  const filteredUsers = users.filter((user) => user.full_name !== "");

  if (isFetching) return <ActivityIndicator />;

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No users</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
  },
});
