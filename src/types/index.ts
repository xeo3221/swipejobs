import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  maxJobDistance: z.number(),
  workerId: z.string(),
  address: z.object({
    formattedAddress: z.string(),
    zoneId: z.string(),
  }),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const JobSchema = z.object({
  jobId: z.string(),
  jobTitle: z.object({
    name: z.string(),
    imageUrl: z.string(),
  }),
  company: z.object({
    name: z.string(),
    address: z.object({
      formattedAddress: z.string(),
      zoneId: z.string(),
    }),
    reportTo: z.object({
      name: z.string(),
      phone: z.string().optional(),
    }),
  }),
  wagePerHourInCents: z.number(),
  milesToTravel: z.number(),
  shifts: z.array(
    z.object({
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
  branch: z.string(),
  branchPhoneNumber: z.string(),
  requirements: z.array(z.string()).optional(),
});

export type Job = z.infer<typeof JobSchema>;

export const ActionResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  errorCode: z.union([z.string(), z.number()]).optional(),
});

export type ActionResponse = z.infer<typeof ActionResponseSchema>;
