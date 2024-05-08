import React from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ChannelStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[cid]"
        options={{
          title: "",
          headerLeft: ({ tintColor }) => (
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color={tintColor}
              onPress={() => router.back()}
              style={{ padding: 0, marginLeft: -16, left: 0 }}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default ChannelStack;
