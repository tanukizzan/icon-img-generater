import type { FC } from "hono/jsx";
import { RadioOption } from "../atoms/RadioOption";

export const ShapeSelector: FC = () => (
  <div>
    <label class="block text-sm text-zinc-400 mb-2">かたち</label>
    <div class="flex items-center gap-3">
      <span class="text-xs text-zinc-500">四角</span>
      <input
        type="range"
        id="shapeSlider"
        min="0"
        max="50"
        step="1"
        value="0"
        class="flex-1 accent-white h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
      />
      <span class="text-xs text-zinc-500">円</span>
    </div>
  </div>
);
