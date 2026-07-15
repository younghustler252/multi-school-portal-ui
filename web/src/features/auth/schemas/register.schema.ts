import { z } from "zod";

const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Must contain an uppercase letter")
	.regex(/[a-z]/, "Must contain a lowercase letter")
	.regex(/[0-9]/, "Must contain a number")
	.regex(/[^A-Za-z0-9]/, "Must contain a special character");

export const registerSchema = z.object({
	// School info
	schoolName: z.string().min(2).max(100),
	subdomain: z
		.string()
		.min(3)
		.max(50)
		.regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and hyphens"),
	schoolEmail: z.string().email("Enter a valid school email"),
	schoolPhone: z.string().optional(),
	schoolCategory: z.enum(["primary", "secondary", "primary_secondary"]),
	schoolOwnership: z.enum(["private", "public", "mission", "international"]),
	state: z.string().optional(),
	city: z.string().optional(),

	// Admin info
	firstName: z.string().min(1).max(50),
	lastName: z.string().min(1).max(50),
	email: z.string().email("Enter a valid email address"),
	password: passwordSchema,
	phone: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;