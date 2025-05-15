import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { getJobMatches } from "../api/api";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import type { Job } from "../types";

export default function JobListScreen() {
  const navigation = useNavigation<any>();
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: getJobMatches,
  });

  if (isLoading) return <Loader />;
  if (error || !jobs)
    return <Error message={error ? "Failed to load jobs" : "No jobs found"} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("JobDetails", { job: item })}
          >
            <JobCard job={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
