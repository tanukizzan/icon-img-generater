import type { FC, PropsWithChildren } from "hono/jsx";

type ButtonVariant = "primary" | "success" | "warning";

type ButtonProps = PropsWithChildren<{
  id: string;
  variant: ButtonVariant;
  disabled?: boolean;
  class?: string;
}>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700",
  warning:
    "bg-amber-600 text-white hover:bg-amber-700",
};

export const Button: FC<ButtonProps> = (props) => (
  <button
    id={props.id}
    disabled={props.disabled}
    class={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[props.variant]} ${props.class ?? ""}`}
  >
    {props.children}
  </button>
);
