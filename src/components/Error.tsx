import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Error({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffe5e5",
    borderRadius: 8,
    margin: 16,
  },
  text: {
    color: "#d32f2f",
    fontWeight: "bold",
    textAlign: "center",
  },
});
