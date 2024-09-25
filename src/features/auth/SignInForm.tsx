import { actions, isInputError } from "astro:actions";
import { navigate } from "astro:transitions/client";

import { Show, onMount } from "solid-js";

import { createForm, type FormBase } from "@/shared/primitives/create-form";
import { TextField } from "@/shared/components/ui/TextField";

type SignInForm = {
  emailErrors: string[];
  passwordErrors: string[];
} & FormBase;

let singInFormElement!: HTMLFormElement;
const { form, setForm } = createForm<SignInForm>({
  emailErrors: [],
  inputError: "",
  isSubmitting: false,
  isValid: true,
  passwordErrors: [],
});

export function SignInForm() {
  onMount(() => {
    singInFormElement.setAttribute("novalidate", "");
  });

  const handleSubmit = async (event: Event) => {
    const form = event.target as HTMLFormElement;
    const isFormValid = form.checkValidity();

    if (!isFormValid) {
      form.querySelector<HTMLInputElement>("input:invalid")?.focus();
    } else {
      setForm({
        isSubmitting: true,
      });

      const formData = new FormData(form);
      const { error } = await actions.signIn(formData);

      if (error && isInputError(error))
        setForm({
          emailErrors: error.fields.email,
          inputError: "",
          isSubmitting: false,
          isValid: !error,
          passwordErrors: error.fields.password,
        });
      else {
        navigate("/");
      }
    }
  };

  return (
    <form
      action={actions.signIn}
      class="mx-auto grid w-[350px] gap-6"
      method="post"
      ref={singInFormElement}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        handleSubmit(event);
      }}
    >
      <fieldset class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </fieldset>
      <div class="grid gap-4">
        <fieldset class="grid gap-2">
          <TextField
            autocomplete="off"
            error={form.inputError || form.emailErrors.join(" ")}
            id="email"
            isValid={form.isValid}
            label="Email"
            name="email"
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="m@example.com"
            required
            type="email"
            validations={[
              {
                error: "The email address is badly formatted.",
                validationType: "patternMismatch",
              },
            ]}
          />
        </fieldset>
        <fieldset class="grid gap-2">
          <TextField
            error={form.inputError || form.passwordErrors.join(" ")}
            id="password"
            isValid={form.isValid}
            label="Password"
            maxlength={16}
            minlength={8}
            name="password"
            placeholder="**********"
            required
            type="password"
          />
        </fieldset>
        <Show when={form.isSubmitting} fallback={<SubmitButton />}>
          <SubmittingButton />
        </Show>
        <div class="mt-4 text-center text-sm">
          <a
            href="/forgot-password"
            class="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  return (
    <button type="submit" class="btn btn-primary w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 h-4 w-4"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m3 7l9 6l9-6" />
        </g>
      </svg>{" "}
      Login with Email
    </button>
  );
}

const SubmittingButton = () => {
  return (
    <button class="btn btn-primary w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="mr-2 h-4 w-4 animate-spin"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
        />
      </svg>
      Please wait...
    </button>
  );
};
