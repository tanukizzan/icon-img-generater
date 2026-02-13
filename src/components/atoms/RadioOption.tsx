import type { FC } from "hono/jsx";

type RadioOptionProps = {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
};

export const RadioOption: FC<RadioOptionProps> = (props) => (
  <label class="flex items-center gap-1.5 text-sm text-zinc-300 cursor-pointer">
    <input type="radio" name={props.name} value={props.value} checked={props.checked} />
    {props.label}
  </label>
);
