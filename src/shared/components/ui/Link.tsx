interface Props {
  label: string;
  href: string;
}

export function Link(props: Props) {
  return (
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
  );
}
