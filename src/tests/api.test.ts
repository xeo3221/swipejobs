import { getJobMatches, getProfile, acceptJob, rejectJob } from "../api/api";

const realWorkerId = "7f90df6e-b832-44e2-b624-3143d428001f";
const jobId = "test-job";

describe("API integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("getProfile returns profile data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "Jan",
        lastName: "Kowalski",
        email: "jan.kowalski@example.com",
        phoneNumber: "123456789",
        maxJobDistance: 30,
        workerId: realWorkerId,
        address: {
          formattedAddress: "123 Main St, Warsaw, PL",
          zoneId: "CET",
        },
      }),
    });
    const data = await getProfile();
    expect(data).toEqual({
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jan.kowalski@example.com",
      phoneNumber: "123456789",
      maxJobDistance: 30,
      workerId: realWorkerId,
      address: {
        formattedAddress: "123 Main St, Warsaw, PL",
        zoneId: "CET",
      },
    });
    expect((fetch as jest.Mock).mock.calls[0][0]).toContain(
      `/api/worker/${realWorkerId}/profile`
    );
  });

  it("getJobMatches returns jobs array", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          jobId: "1",
          jobTitle: {
            name: "Helper",
            imageUrl: "https://example.com/img1.png",
          },
          company: {
            name: "Company A",
            address: { formattedAddress: "Addr 1", zoneId: "CET" },
            reportTo: { name: "Boss A", phone: "111222333" },
          },
          wagePerHourInCents: 1500,
          milesToTravel: 10,
          shifts: [
            {
              startDate: "2024-04-07T08:00:00Z",
              endDate: "2024-04-07T16:00:00Z",
            },
          ],
          branch: "Branch A",
          branchPhoneNumber: "111222333",
          requirements: ["Safety Vest"],
        },
        {
          jobId: "2",
          jobTitle: {
            name: "Driver",
            imageUrl: "https://example.com/img2.png",
          },
          company: {
            name: "Company B",
            address: { formattedAddress: "Addr 2", zoneId: "CET" },
            reportTo: { name: "Boss B" },
          },
          wagePerHourInCents: 2000,
          milesToTravel: 5,
          shifts: [
            {
              startDate: "2024-04-08T08:00:00Z",
              endDate: "2024-04-08T16:00:00Z",
            },
          ],
          branch: "Branch B",
          branchPhoneNumber: "444555666",
        },
      ],
    });
    const data = await getJobMatches();
    expect(data.length).toBe(2);
    expect(data[0].jobId).toBe("1");
    expect(data[1].jobId).toBe("2");
    expect((fetch as jest.Mock).mock.calls[0][0]).toContain(
      `/api/worker/${realWorkerId}/matches`
    );
  });

  it("acceptJob returns success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: "Accepted",
        errorCode: undefined,
      }),
    });
    const data = await acceptJob(jobId);
    expect(data).toEqual({
      success: true,
      message: "Accepted",
      errorCode: undefined,
    });
    expect((fetch as jest.Mock).mock.calls[0][0]).toContain(
      `/api/worker/${realWorkerId}/job/${jobId}/accept`
    );
  });

  it("rejectJob returns success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: "Rejected",
        errorCode: undefined,
      }),
    });
    const data = await rejectJob(jobId);
    expect(data).toEqual({
      success: true,
      message: "Rejected",
      errorCode: undefined,
    });
    expect((fetch as jest.Mock).mock.calls[0][0]).toContain(
      `/api/worker/${realWorkerId}/job/${jobId}/reject`
    );
  });

  it("handles API error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });
    await expect(getProfile()).rejects.toThrow();
  });
});
