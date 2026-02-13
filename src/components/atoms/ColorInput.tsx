import type { FC } from "hono/jsx";

type ColorInputProps = {
  pickerId: string;
  textId: string;
  defaultValue: string;
};

export const ColorInput: FC<ColorInputProps> = (props) => (
  <div class="flex items-center gap-2">
    <input
      type="color"
      id={props.pickerId}
      title="Select color"
      value={props.defaultValue}
      class="w-10 h-10 rounded cursor-pointer"
    />
    <input
      type="text"
      id={props.textId}
      title="Color value in hex format"
      placeholder="#FFFFFF"
      value={props.defaultValue}
      class="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm w-28 font-mono text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
    />
  </div>
);
