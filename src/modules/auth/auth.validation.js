const { z } = require("zod");

const registerSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name cannot exceed 100 characters"),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address")
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password cannot exceed 100 characters"),
    }),

    params: z.object({}),

    query: z.object({}),
});
const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Please enter a valid email")
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(1, "Password is required"),
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};