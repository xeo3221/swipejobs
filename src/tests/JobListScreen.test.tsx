import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react-native";
import JobListScreen from "../screens/JobListScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("../api/api", () => ({
  getJobMatches: jest.fn().mockResolvedValue([
    {
      jobId: "1",
      jobTitle: { name: "Test Job", imageUrl: "" },
      company: {
        name: "Test Company",
        address: { formattedAddress: "Test Location", zoneId: "" },
        reportTo: { name: "Boss" },
      },
      wagePerHourInCents: 1500,
      milesToTravel: 2.5,
      shifts: [],
      branch: "Test Branch",
      branchPhoneNumber: "123-456-7890",
    },
  ]),
}));

describe("JobListScreen", () => {
  it("renders job cards from API", async () => {
    const queryClient = new QueryClient();
    const { getByText } = render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <JobListScreen />
        </QueryClientProvider>
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText(/Test Job/)).toBeTruthy();
      expect(getByText(/Test Company/)).toBeTruthy();
      expect(getByText(/Test Location/)).toBeTruthy();
      expect(getByText(/\$15\.00/)).toBeTruthy();
    });
  });
});

afterEach(() => {
  cleanup();
});
