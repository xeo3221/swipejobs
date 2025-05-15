import React from "react";
import { render } from "@testing-library/react-native";
import Error from "../components/Error";

describe("Error", () => {
  it("renders error message", () => {
    const { getByText } = render(<Error message="Something went wrong" />);
    expect(getByText("Something went wrong")).toBeTruthy();
  });
});
