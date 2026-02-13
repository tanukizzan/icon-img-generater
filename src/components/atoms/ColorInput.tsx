import type { FC } from "hono/jsx";

type ColorInputProps = {
  pickerId: string;
  textId: string;
  defaultValue: string;
};

const PRESET_COLORS = [
  { label: "Red", value: "#EF4444" },
  { label: "Blue", value: "#3B82F6" },
  { label: "Green", value: "#22C55E" },
  { label: "Yellow", value: "#EAB308" },
  { label: "Purple", value: "#A855F7" },
  { label: "White", value: "#FFFFFF" },
  { label: "Black", value: "#000000" },
  { label: "Transparent", value: "transparent" },
];

export const ColorInput: FC<ColorInputProps> = (props) => (
  <div class="space-y-2">
    <div class="flex gap-1">
      {PRESET_COLORS.map((color) => (
        <button
          type="button"
          class="w-6 h-6 rounded border border-zinc-600 hover:scale-110 transition-transform"
          style={color.value === "transparent" ? { backgroundColor: "rgba(255, 255, 255, 0.2)" } : { backgroundColor: color.value }}
          title={color.label}
          data-color={color.value}
          data-picker-id={props.pickerId}
          data-text-id={props.textId}
          data-preset-btn
        />
      ))}
    </div>
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
  </div>
);
