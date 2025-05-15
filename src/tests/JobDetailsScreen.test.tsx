import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("../api/api", () => ({
  getJobMatches: jest.fn().mockResolvedValue([]),
  acceptJob: jest.fn(),
  rejectJob: jest.fn(),
}));

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        job: {
          jobId: "1",
          jobTitle: { name: "Test Job", imageUrl: "" },
          company: {
            name: "Test Company",
            address: { formattedAddress: "Test Location", zoneId: "1" },
            reportTo: { name: "Boss" },
          },
          wagePerHourInCents: 1500,
          milesToTravel: 2.5,
          shifts: [],
          branch: "Test Branch",
          branchPhoneNumber: "123-456-7890",
        },
      },
    }),
  };
});

describe("JobDetailsScreen", () => {
  it("renders job details", async () => {
    const queryClient = new QueryClient();
    const { getByText } = render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <JobDetailsScreen />
        </QueryClientProvider>
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText(/Test Job/)).toBeTruthy();
      expect(getByText(/Test Company/)).toBeTruthy();
      expect(getByText(/Test Location/)).toBeTruthy();
    });
  });
});
