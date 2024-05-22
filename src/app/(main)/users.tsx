import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetProfiles } from "../../api/profile";
import UserListItem from "../../components/UserListItem";

const UsersScreen = () => {
  const { data: users, isFetching, error } = useGetProfiles();
  const filteredUsers =
    users &&
    users.filter((user) => {
      if (
        user.full_name !== "" &&
        user.full_name !== undefined &&
        user.full_name !== null
      ) {
        return user;
      }
    });

  if (isFetching) return <ActivityIndicator />;

  if (error || filteredUsers.length === 0)
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.emptyText}>No users</Text>
      </View>
    );

  if (filteredUsers.length === 0)
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.emptyText}>No users</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        contentContainerStyle={{
          gap: 10,
        }}
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
