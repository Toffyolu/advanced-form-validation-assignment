import { z } from 'zod';

export const employeeSchema = z.object({
  fullName: z.string().trim()
    .min(1, 'Enter your full name')
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name must be 80 characters or fewer'),
  email: z.string().trim()
    .min(1, 'Enter your work email')
    .max(254, 'Email must be 254 characters or fewer')
    .pipe(z.email('Enter a valid email address')),
  phone: z.string().trim()
    .min(1, 'Enter your phone number')
    .regex(/^(?:\+1[ .-]?)?(?:\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}$/, 'Enter a 10-digit phone number, such as 403-555-0123'),
  employeeId: z.string().trim()
    .min(1, 'Enter your employee ID')
    .min(3, 'Employee ID must be at least 3 characters')
    .max(20, 'Employee ID must be 20 characters or fewer')
    .regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, 'Use letters and numbers, with hyphens between groups'),
  department: z.string().trim()
    .min(1, 'Enter your department')
    .min(2, 'Department must be at least 2 characters')
    .max(60, 'Department must be 60 characters or fewer'),
  jobTitle: z.string().trim()
    .min(1, 'Enter your job title')
    .min(2, 'Job title must be at least 2 characters')
    .max(60, 'Job title must be 60 characters or fewer'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
