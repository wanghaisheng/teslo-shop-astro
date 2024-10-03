import { Show, type JSX } from "solid-js";

import { Button } from "@/shared/components/ui/Button";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  label?: string;
}

export function SubmitButton(props: Props) {
  return (
    <Show
      when={props.isSubmitting}
      fallback={<Submit label="Login with Email" />}
    >
      <Submitting label="Please wait..." />
    </Show>
  );
}

function Submit(props: Props) {
  return (
    <Button type="submit">
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
      {props.label}
    </Button>
  );
}

const Submitting = (props: Props) => {
  return (
    <Button>
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
      {props.label}
    </Button>
  );
};
