import { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../providers/AuthContextProvider";
import Avatar from "../../../components/Avatar";
import { ScrollView } from "react-native-gesture-handler";

export default function Account() {
  const session = useAuth().session;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) throw new Error("No user on the session!");

        const { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url, full_name`)
          .eq("id", session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
          setFullName(data.full_name);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (session) getProfile();
  }, [session]);

  async function updateProfile({
    username,
    avatar_url,
    full_name,
  }: {
    username: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
        full_name,
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.avatarContainer}>
        <View>
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={async (url: string) => {
              setLoading(true);
              setAvatarUrl(url);
              await updateProfile({
                username,
                avatar_url: url,
                full_name: fullName,
              });
              setLoading(false);
            }}
            isEditing={isEditing}
          />
        </View>
      </View>
      <View>
        <Input label="Email" value={session.user.email} disabled />
      </View>
      <View>
        <Input
          label="Full Name"
          value={fullName || ""}
          onChangeText={(text) => setFullName(text)}
          autoCapitalize="none"
          disabled={!isEditing}
        />
      </View>
      <View>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          disabled={!isEditing}
        />
      </View>
      <View>
        <Button
          title={loading ? "Loading ..." : !isEditing ? "Update" : "Save"}
          onPress={async () => {
            if (isEditing) {
              await updateProfile({
                username,
                avatar_url: avatarUrl,
                full_name: fullName,
              });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          disabled={loading}
        />
      </View>
      <View>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  scrollContainer: {
    gap: 10,
  },
  avatarContainer: {
    alignItems: "center",
  },
});
