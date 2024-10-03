import type { JSX } from "solid-js";

import "@/shared/components/ui/InputGroup.css";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function InputGroup(props: Props) {
  const reference = `form-floating-input-${props.label.toLocaleLowerCase()}`;

  return (
    // Input Group
    <fieldset class="relative col-span-full">
      {/* Floating Input */}
      <div class="relative">
        <input
          type={props.type}
          id={reference}
          class="peer input"
          placeholder={props.placeholder}
        />
        <label for={reference} class="label">
          {props.label}
        </label>
      </div>
      {/* End Floating Input */}
    </fieldset>
    // End Input Group
  );
}
