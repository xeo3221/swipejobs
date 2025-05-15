import React from "react";
import { render } from "@testing-library/react-native";
import JobCard from "../components/JobCard";

describe("JobCard", () => {
  it("renders job data", () => {
    const job = {
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
    };
    const { getByText } = render(<JobCard job={job} />);
    expect(getByText("Test Job")).toBeTruthy();
    expect(getByText("Test Company")).toBeTruthy();
    expect(getByText("Test Location")).toBeTruthy();
    expect(getByText(/\$15\.00/)).toBeTruthy();
  });
});
