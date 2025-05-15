import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Job } from "../types";
import { formatWage, safeGet, useIsTablet, formatShiftDate } from "../utils";

export default function JobCard({ job }: { job: Job }) {
  const isTablet = useIsTablet();

  const jobTitle = safeGet(job.jobTitle?.name, "Job Title");
  const companyName = safeGet(job.company?.name, "Company");
  const address = safeGet(job.company?.address?.formattedAddress, "-");
  const wage = formatWage(job.wagePerHourInCents);
  const distance = job.milesToTravel ? `${job.milesToTravel} miles` : null;
  const shifts = job.shifts || [];
  const firstShift = shifts[0];
  const moreShifts = shifts.length > 1 ? `+${shifts.length - 1} more` : null;

  return (
    <View style={[styles.card, isTablet && styles.cardTablet]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            {jobTitle}
          </Text>
          <Text style={styles.company}>{companyName}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.wage, isTablet && styles.wageTablet]}>
            {wage}/hr +
          </Text>
          {distance && <Text style={styles.distance}>{distance}</Text>}
        </View>
      </View>
      {firstShift && (
        <View style={styles.shiftRow}>
          <Text style={styles.shiftText}>
            {formatShiftDate(firstShift.startDate, firstShift.endDate)}
          </Text>
          {moreShifts && <Text style={styles.moreShifts}>{moreShifts}</Text>}
        </View>
      )}
      <Text style={styles.label}>Location:</Text>
      <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTablet: {
    padding: 32,
    marginHorizontal: 32,
    minWidth: 600,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  titleTablet: {
    fontSize: 24,
  },
  company: {
    fontSize: 15,
    color: "#444",
    marginBottom: 2,
  },
  wage: {
    fontWeight: "bold",
    fontSize: 18,
    color: "green",
  },
  wageTablet: {
    fontSize: 22,
  },
  distance: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 4,
    textAlign: "right",
  },

  shiftRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  shiftText: {
    fontSize: 15,
    color: "#333",
  },
  moreShifts: {
    marginLeft: 8,
    color: "#888",
    fontSize: 14,
    fontStyle: "italic",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
