import { ActionError, defineAction } from "astro:actions";
import { db, eq, User } from "astro:db";
import { z } from "astro:schema";

import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

export const SingInFormAction = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email({
      message: "The email address is badly formatted.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .max(16, {
        message: "Password must be at most 16 characters long.",
      }),
  }),
  handler: async ({ email, password }, context) => {
    const foundUser = (
      await db.select().from(User).where(eq(User.username, email))
    ).at(0);

    // Check if the user exists
    if (!foundUser) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "User not found.",
      });
    }

    // Check if the user has a password
    if (!foundUser.password) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Invalid password.",
      });
    }

    const isValidPassword = await new Argon2id().verify(
      foundUser.password,
      password
    );

    // If the password is invalid
    if (!isValidPassword) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "The username or password is incorrect.",
      });
    }

    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  },
});
