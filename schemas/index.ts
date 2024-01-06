import * as z from "zod";
import { Role } from "@prisma/client";

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    role: z.enum([Role.ADMIN, Role.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        return !(data.password && !data.newPassword);
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        return !(data.newPassword && !data.password);
    }, {
        message: "Password is required!",
        path: ["password"]
    })
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});