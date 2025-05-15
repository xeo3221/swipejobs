import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { acceptJob, rejectJob, getJobMatches } from "../api/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useQuery } from "@tanstack/react-query";
import type { Job } from "../types";
import {
  formatWage,
  safeGet,
  formatShiftDate,
  formatRequirements,
} from "../utils";

export default function JobDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { job: jobParam, jobId: jobIdParam } = route.params || {};

  const {
    data: jobs,
    isLoading: isJobsLoading,
    error: jobsError,
  } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: getJobMatches,
    enabled: !jobParam && !!jobIdParam,
  });

  const job: Job | undefined =
    jobParam || jobs?.find((j: Job) => j.jobId === jobIdParam);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showAllShifts, setShowAllShifts] = React.useState(false);

  if ((isJobsLoading && !jobParam) || loading) return <Loader />;
  const errorMsg = error
    ? typeof error === "string"
      ? error
      : (error as Error).message
    : jobsError
      ? typeof jobsError === "string"
        ? jobsError
        : (jobsError as Error).message
      : "No job data provided.";
  if ((!job && (jobsError || !jobParam)) || error)
    return <Error message={errorMsg} />;
  if (!job) return <Error message="No job data provided." />;

  const handleAction = async (type: "accept" | "reject") => {
    setLoading(true);
    setError(null);
    try {
      if (type === "accept") {
        await acceptJob(job.jobId);
        Alert.alert("Success", "You have accepted the job.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        await rejectJob(job.jobId);
        Alert.alert("Job Rejected", "You have rejected the job.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (e) {
      setError("Action failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // preparing safe data to display
  const jobTitle = safeGet(job.jobTitle?.name, "-");
  const jobImage = job.jobTitle?.imageUrl;
  const companyName = safeGet(job.company?.name, "-");
  const address = safeGet(job.company?.address?.formattedAddress, "-");
  const wage = formatWage(job.wagePerHourInCents);
  const requirements = formatRequirements(job.requirements);
  const reportTo = job.company?.reportTo
    ? `${job.company.reportTo.name}${job.company.reportTo.phone ? ` (${job.company.reportTo.phone})` : ""}`
    : "-";
  const shifts = job.shifts || [];
  const branch = job.branch || "-";
  const branchPhone = job.branchPhoneNumber || "-";
  const distance = job.milesToTravel ? `${job.milesToTravel} miles` : "-";

  const formatShift = (shift: { startDate: string; endDate: string }) => {
    return formatShiftDate(shift.startDate, shift.endDate);
  };

  const visibleShifts = showAllShifts ? shifts : shifts.slice(0, 5);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* job image */}
      {jobImage && <Image source={{ uri: jobImage }} style={styles.jobImage} />}

      {/* job title and company */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>{jobTitle}</Text>
        <Text style={styles.company}>{companyName}</Text>
      </View>

      {/* distance and wage */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Distance</Text>
          <Text style={styles.infoValue}>{distance}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Hourly Rate</Text>
          <Text style={styles.infoValue}>{wage}</Text>
        </View>
      </View>

      {/* Shift Dates */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitle}>Shift Dates</Text>
        </View>
        {visibleShifts.map((shift, idx) => (
          <Text key={idx} style={styles.sectionText}>
            {formatShift(shift)}
          </Text>
        ))}
        {shifts.length > 5 && !showAllShifts && (
          <TouchableOpacity onPress={() => setShowAllShifts(true)}>
            <Text style={styles.showMore}>Show More</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Location */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionIcon}>📍</Text>
          <Text style={styles.sectionTitle}>Location</Text>
        </View>
        <Text style={styles.sectionText}>{address}</Text>
        {job.milesToTravel && (
          <Text style={styles.sectionSubText}>
            {job.milesToTravel} miles from your job search location
          </Text>
        )}
      </View>

      {/* Requirements */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionIcon}>🛠️</Text>
          <Text style={styles.sectionTitle}>Requirements</Text>
        </View>
        {requirements !== "-" ? (
          requirements.split(",").map((req, idx) => (
            <Text key={idx} style={styles.sectionText}>
              - {req.trim()}
            </Text>
          ))
        ) : (
          <Text style={styles.sectionText}>None</Text>
        )}
      </View>

      {/* Report To */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionIcon}>👤</Text>
          <Text style={styles.sectionTitle}>Report To</Text>
        </View>
        <Text style={styles.sectionText}>{reportTo}</Text>
      </View>

      {/* buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => handleAction("reject")}
          disabled={loading}
        >
          <Text style={styles.buttonOutlineText}>No Thanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSolid}
          onPress={() => handleAction("accept")}
          disabled={loading}
        >
          <Text style={styles.buttonSolidText}>I'll Take it</Text>
        </TouchableOpacity>
      </View>
      {error && <Error message={error} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  jobImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    marginBottom: 12,
  },
  headerBox: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 2,
  },
  company: {
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1abc9c",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
  },
  infoBox: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  section: {
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionText: {
    fontSize: 15,
    color: "#222",
    marginLeft: 26,
  },
  sectionSubText: {
    fontSize: 13,
    color: "#888",
    marginLeft: 26,
  },
  showMore: {
    color: "#1976d2",
    fontWeight: "bold",
    marginLeft: 26,
    marginTop: 4,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#bbb",
    fontWeight: "500",
    fontSize: 16,
  },
  buttonSolid: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonSolidText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});
