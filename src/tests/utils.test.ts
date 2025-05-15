import {
  formatShiftDate,
  formatWage,
  safeGet,
  formatRequirements,
} from "../utils";

describe("utils", () => {
  describe("formatShiftDate", () => {
    it("formats start and end date correctly", () => {
      const start = "2024-06-01T08:00:00Z";
      const end = "2024-06-01T16:00:00Z";
      const result = formatShiftDate(start, end);
      expect(result).toContain("6/1/2024");
      expect(result).toMatch(/10:00/);
      expect(result).toMatch(/06:00|16:00|04:00/);
    });
  });

  describe("formatWage", () => {
    it("formats cents to dollars", () => {
      expect(formatWage(950)).toBe("$9.50");
      expect(formatWage(1082)).toBe("$10.82");
    });
    it("returns dash for undefined", () => {
      expect(formatWage(undefined)).toBe("-");
    });
  });

  describe("safeGet", () => {
    it("returns value if defined", () => {
      expect(safeGet("test")).toBe("test");
      expect(safeGet(123)).toBe("123");
    });
    it("returns fallback for undefined/null", () => {
      expect(safeGet(undefined)).toBe("-");
      expect(safeGet(null)).toBe("-");
      expect(safeGet(undefined, "fallback")).toBe("fallback");
    });
  });

  describe("formatRequirements", () => {
    it("joins requirements with comma", () => {
      expect(formatRequirements(["A", "B", "C"])).toBe("A, B, C");
    });
    it("returns dash for empty or undefined", () => {
      expect(formatRequirements([])).toBe("-");
      expect(formatRequirements(undefined)).toBe("-");
    });
  });
});
