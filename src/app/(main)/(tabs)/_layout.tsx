import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Messages",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsNavigator;
