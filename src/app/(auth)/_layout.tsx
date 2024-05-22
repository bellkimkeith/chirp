import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthContextProvider";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const user = useAuth().user;
  const loading = useAuth().loading;

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />;
      </View>
    );

  if (user) return <Redirect href={"/(tabs)"} />;

  return <Stack />;
};

export default AuthLayout;
