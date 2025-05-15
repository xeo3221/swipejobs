import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#1976d2" testID="loader-spinner" />
    </View>
  );
}
