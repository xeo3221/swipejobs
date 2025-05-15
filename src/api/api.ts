import { ProfileSchema, JobSchema, ActionResponseSchema } from "../types";

const BASE_URL = "https://test.swipejobs.com/api/worker";
const WORKER_ID = "7f90df6e-b832-44e2-b624-3143d428001f";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export const getProfile = async () => {
  const data = await fetchJson<unknown>(`${BASE_URL}/${WORKER_ID}/profile`);
  return ProfileSchema.parse(data);
};

export const getJobMatches = async () => {
  const data = await fetchJson<unknown>(`${BASE_URL}/${WORKER_ID}/matches`);
  return JobSchema.array().parse(data);
};

export const acceptJob = async (jobId: string) => {
  const data = await fetchJson<unknown>(
    `${BASE_URL}/${WORKER_ID}/job/${jobId}/accept`
  );
  return ActionResponseSchema.parse(data);
};

export const rejectJob = async (jobId: string) => {
  const data = await fetchJson<unknown>(
    `${BASE_URL}/${WORKER_ID}/job/${jobId}/reject`
  );
  return ActionResponseSchema.parse(data);
};
