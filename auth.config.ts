import bcrypt from "bcryptjs";
import type {NextAuthConfig, User} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Credentials({
            id: "credentials",
            type: "credentials",
            name:'credentials',
            credentials: {},
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if (passwordsMatch) return user as unknown as  User;
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig