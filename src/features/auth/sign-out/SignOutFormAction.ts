import { ActionError, defineAction } from "astro:actions";

import { lucia } from "@/auth";

export const SignInFormAction = defineAction({
  handler: async (_, context) => {
    // Check if the session exists
    if (!context.locals.session) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "You are not signed in.",
      });
    }

    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  },
});
