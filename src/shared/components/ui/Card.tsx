import type { JSX } from "solid-js";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
}

export function Card(props: Props) {
  return (
    // Card
    <div class="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
      <aside class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
          {props.label}
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
          {props.description}
        </p>
      </aside>

      <aside class="mt-5">{props.children}</aside>
    </div>
    // End Card
  );
}
