import { createStore } from "solid-js/store";

export type FormBase = {
  inputError: string;
  isSubmitting: boolean;
  isValid: boolean;
};

export function createForm<T extends FormBase>(initialValues = {} as T) {
  const [form, setForm] = createStore<T>(initialValues);

  return {
    form,
    setForm,
  };
}
