import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getProfile } from "../api/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import type { Profile } from "../types";
import { useIsTablet, safeGet } from "../utils";

export default function ProfileScreen() {
  const isTablet = useIsTablet();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <Loader />;
  if (error || !profile)
    return (
      <Error message={error ? "Failed to load profile" : "No profile data"} />
    );

  return (
    <View style={[styles.outer, isTablet && styles.outerTablet]}>
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        <View style={styles.headerRow}>
          <FontAwesome
            name="user-circle"
            size={isTablet ? 64 : 48}
            color="#007AFF"
            style={styles.icon}
          />
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            {safeGet(profile.firstName)} {safeGet(profile.lastName)}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="email"
            size={isTablet ? 28 : 22}
            color="#555"
            style={styles.icon}
          />
          <Text style={isTablet && styles.textTablet}>
            {safeGet(profile.email)}
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome
            name="phone"
            size={isTablet ? 28 : 22}
            color="#555"
            style={styles.icon}
          />
          <Text style={isTablet && styles.textTablet}>
            {safeGet(profile.phoneNumber)}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo
            name="location-pin"
            size={isTablet ? 28 : 22}
            color="#555"
            style={styles.icon}
          />
          <Text style={isTablet && styles.textTablet}>
            {safeGet(profile.address?.formattedAddress)}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="directions-car"
            size={isTablet ? 28 : 22}
            color="#555"
            style={styles.icon}
          />
          <Text style={isTablet && styles.textTablet}>
            {profile.maxJobDistance ? `${profile.maxJobDistance} miles` : "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  outerTablet: {
    alignItems: "center",
    paddingTop: 40,
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  containerTablet: {
    maxWidth: 500,
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  titleTablet: {
    fontSize: 28,
  },
  icon: {
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  textTablet: {
    fontSize: 18,
  },
});
