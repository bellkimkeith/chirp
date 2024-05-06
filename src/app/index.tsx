import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return <Redirect href={"/(main)/(tabs)"} />;
}
