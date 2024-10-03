import { type JSX } from "solid-js";

import "@/shared/components/ui/Button.css";

export function Button(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={props.type} class="button">
      {props.children}
    </button>
  );
}
