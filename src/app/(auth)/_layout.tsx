import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../providers/AuthContextProvider";

const AuthLayout = () => {
  const user = useAuth().user;

  if (user) return <Redirect href={"/(tabs)"} />;

  return <Stack />;
};

export default AuthLayout;
