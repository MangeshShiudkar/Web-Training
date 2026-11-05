import { z } from "zod";

const qualificationSchema = z.object({
  degree: z
    .string()
    .trim()
    .min(2, { error: "Enter a degree or qualification." }),
  institution: z
    .string()
    .trim()
    .min(2, { error: "Enter the institution name." }),
  year: z
    .number()
    .int()
    .min(1950, { error: "Enter a year from 1950 onward." })
    .max(new Date().getFullYear(), { error: "Year cannot be in the future." }),
  percentage: z
    .number()
    .min(0, { error: "Percentage cannot be below 0." })
    .max(100, { error: "Percentage cannot exceed 100." }),
});

const previousCompanySchema = z
  .object({
    company: z.string().trim().min(2, { error: "Enter the company name." }),
    role: z.string().trim().min(2, { error: "Enter your role." }),
    fromDate: z.iso.date({ error: "Choose a valid start date." }),
    toDate: z.iso.date({ error: "Choose a valid end date." }),
  })
  .refine((company) => company.toDate > company.fromDate, {
    error: "End date must be after the start date.",
    path: ["toDate"],
  });

export const positionOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Product Designer",
  "QA Engineer",
] as const;
export const noticePeriodOptions = [
  "Immediate",
  "15 days",
  "30 days",
  "60 days",
  "90 days",
] as const;

const experienceSchema = z.discriminatedUnion("experienceType", [
  z.object({
    experienceType: z.literal("fresher"),
    availableFrom: z.iso.date({ error: "Choose a valid availability date." }),
  }),
  z.object({
    experienceType: z.literal("experienced"),
    totalYears: z
      .number()
      .min(0.1, { error: "Enter at least 0.1 years of experience." })
      .max(60, { error: "Enter a realistic amount of experience." }),
    noticePeriod: z.enum(noticePeriodOptions, {
      error: "Choose a notice period.",
    }),
    previousCompanies: z
      .array(previousCompanySchema)
      .min(1, { error: "Add at least one previous company." }),
  }),
]);

const personalSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, { error: "Enter your full name." })
      .max(100, { error: "Name must be 100 characters or fewer." }),
    email: z.email({ error: "Enter a valid email address." }),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ()-]{8,20}$/, { error: "Enter a valid phone number." }),
    dateOfBirth: z.iso.date({ error: "Choose a valid date of birth." }),
    city: z.string().trim().min(2, { error: "Enter your current city." }),
  })
  .refine(
    (personal) => {
      const birthDate = new Date(`${personal.dateOfBirth}T00:00:00`);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const birthdayHasPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());
      if (!birthdayHasPassed) age -= 1;
      return age >= 18;
    },
    {
      error: "You must be at least 18 years old to apply.",
      path: ["dateOfBirth"],
    },
  );

const applicationDetailsSchema = z.object({
  position: z
    .string()
    .refine(
      (position) =>
        positionOptions.some(
          (availablePosition) => availablePosition === position,
        ),
      { error: "Choose a position." },
    ),
  expectedJoiningDate: z.iso.date({
    error: "Choose a valid expected joining date.",
  }),
  portfolioUrl: z.union([
    z.literal(""),
    z.url({ error: "Enter a valid URL, including https://." }),
  ]),
  coverNote: z
    .string()
    .max(1000, { error: "Cover note must be 1000 characters or fewer." }),
  acceptTerms: z
    .boolean()
    .refine((accepted) => accepted, {
      error: "You must accept the terms before submitting.",
    }),
});

export const applicationSchema = z
  .object({
    personal: personalSchema,
    qualifications: z
      .array(qualificationSchema)
      .min(1, { error: "Add at least one qualification." }),
    experience: experienceSchema,
    application: applicationDetailsSchema,
  })
  .superRefine((values, context) => {
    const today = new Date();
    const joiningDate = new Date(
      `${values.application.expectedJoiningDate}T00:00:00`,
    );
    today.setHours(0, 0, 0, 0);

    if (joiningDate <= today) {
      context.addIssue({
        code: "custom",
        message: "Expected joining date must be in the future.",
        path: ["application", "expectedJoiningDate"],
      });
    }

    if (values.experience.experienceType === "fresher") {
      const availableDate = new Date(
        `${values.experience.availableFrom}T00:00:00`,
      );
      if (availableDate > joiningDate) {
        context.addIssue({
          code: "custom",
          message:
            "Expected joining date cannot be before your availability date.",
          path: ["application", "expectedJoiningDate"],
        });
      }
    }
  });

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
export type ApplicationFormInput = z.input<typeof applicationSchema>;
