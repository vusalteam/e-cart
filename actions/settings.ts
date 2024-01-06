"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import {update} from "@/auth";
import {db} from "@/lib/db";
import {SettingsSchema} from "@/schemas";
import {getUserByEmail, getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(+user.id);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== +user.id) {
      return { error: "Email already in use!" }
    }
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    values.password = await bcrypt.hash(
        values.newPassword,
        10,
    );
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  });

  await update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    }
  });

  return { success: "Settings Updated!" }
}