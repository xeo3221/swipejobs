import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ProfileScreen from "../screens/ProfileScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: () => null,
  FontAwesome: () => null,
  Entypo: () => null,
}));

jest.mock("../api/api", () => ({
  getProfile: jest.fn().mockResolvedValue({
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan@kowalski.com",
    phoneNumber: "123456789",
    maxJobDistance: 10,
    workerId: "1",
    address: { formattedAddress: "Test Address", zoneId: "1" },
  }),
}));

describe("ProfileScreen", () => {
  it("renders user profile data", async () => {
    const queryClient = new QueryClient();
    const { getByText } = render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <ProfileScreen />
        </QueryClientProvider>
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(getByText(/Jan Kowalski/)).toBeTruthy();
      expect(getByText(/jan@kowalski.com/)).toBeTruthy();
      expect(getByText(/123456789/)).toBeTruthy();
      expect(getByText(/Test Address/)).toBeTruthy();
    });
  });
});
