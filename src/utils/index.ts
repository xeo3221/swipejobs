// Formatting shift date/time
export function formatShiftDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

// Formatting hourly rate
export function formatWage(cents?: number): string {
  return cents ? `$${(cents / 100).toFixed(2)}` : "-";
}

// Safe field retrieval with fallback
export function safeGet<T>(
  value: T | undefined | null,
  fallback: string = "-"
): string {
  return value ? String(value) : fallback;
}

// Hook to check if device is tablet
import { useWindowDimensions } from "react-native";
export function useIsTablet() {
  const { width } = useWindowDimensions();
  return width >= 768;
}

// requirements formatting
export function formatRequirements(reqs?: string[]): string {
  return reqs && reqs.length ? reqs.join(", ") : "-";
}
