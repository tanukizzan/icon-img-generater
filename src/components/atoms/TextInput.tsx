import type { FC } from "hono/jsx";

type TextInputProps = {
  id: string;
  placeholder?: string;
  value?: string;
  class?: string;
};

export const TextInput: FC<TextInputProps> = (props) => (
  <input
    type="text"
    name="icon-name"
    id={props.id}
    placeholder={props.placeholder}
    value={props.value}
    class={`bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-[16px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 ${props.class ?? ""}`}
  />
);
