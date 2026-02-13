import type { FC } from "hono/jsx";

type SelectOption = {
  value: string;
  label: string;
  selected?: boolean;
};

type SelectFieldProps = {
  id: string;
  options: SelectOption[];
};

export const SelectField: FC<SelectFieldProps> = (props) => (
  <select
    id={props.id}
    title="select field"
    class="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
  >
    {props.options.map((opt) => (
      <option value={opt.value} selected={opt.selected}>
        {opt.label}
      </option>
    ))}
  </select>
);
