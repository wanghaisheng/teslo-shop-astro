import { actions, isInputError } from "astro:actions";
import { navigate } from "astro:transitions/client";

import { onMount } from "solid-js";

import { createForm, type FormBase } from "@/shared/primitives/create-form";

import { Card } from "@/shared/components/ui/Card";
import { InputGroup } from "@/shared/components/ui/InputGroup";
import { SubmitButton } from "@/shared/components/ui/SubmitButton";

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
    <form>
      <section class="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
        <Card
          label="Sign In"
          description="Enter your email below to sign in to your account"
        >
          <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">
            🔷
          </div>
          {/* Grid */}
          <div class="grid grid-cols-2 gap-4">
            <InputGroup
              label="Email"
              placeholder="m@example.com"
              type="email"
            />

            <InputGroup
              label="Password"
              placeholder="********"
              type="password"
            />
          </div>
          {/* End Grid */}
          {/* Link */}
          <div class="mt-5 flex items-center">
            <div class="ms-3">
              <label for="remember-me" class="text-sm dark:text-white">
                Forgot your{" "}
                <a
                  class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                  href="#"
                >
                  password?
                </a>
              </label>
            </div>
          </div>
          {/* End Link */}
          <div class="mt-5">
            <SubmitButton isSubmitting={form.isSubmitting} />
          </div>
        </Card>
      </section>
    </form>
  );
}
