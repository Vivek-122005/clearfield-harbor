
import * as z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const employeeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's/Husband's name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  dateOfJoining: z.date({
    required_error: "Date of joining is required",
  }),
  aadharNumber: z.string().length(12, "Aadhar number must be 12 digits"),
  panNumber: z.string().length(10, "PAN number must be 10 characters"),
  esiNumber: z.string().optional(),
  uan: z.string().min(1, "UAN is required"),
  pfNumber: z.string().min(1, "PF number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  ifscCode: z.string().min(11, "IFSC code must be 11 characters"),
  panCardImage: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png formats are supported"
    ),
  aadharFrontImage: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png formats are supported"
    ),
  aadharBackImage: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png formats are supported"
    ),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
