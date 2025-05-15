import React from "react";
import { render } from "@testing-library/react-native";
import Loader from "../components/Loader";

describe("Loader", () => {
  it("renders loading indicator", () => {
    const { getByTestId, getByText } = render(<Loader />);
    // Sprawdź czy jest spinner lub tekst
    expect(getByTestId("loader-spinner")).toBeTruthy();
    // Lub jeśli masz tekst:
    // expect(getByText(/loading/i)).toBeTruthy();
  });
});
