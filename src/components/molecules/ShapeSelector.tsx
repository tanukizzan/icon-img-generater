import type { FC } from "hono/jsx";
import { RadioOption } from "../atoms/RadioOption";

export const ShapeSelector: FC = () => (
  <div>
    <label class="block text-sm text-zinc-400 mb-2">形状</label>
    <div class="flex gap-4">
      <RadioOption name="shape" value="square" label="正方形" checked />
      <RadioOption name="shape" value="circle" label="円" />
      <RadioOption name="shape" value="rounded" label="角丸正方形" />
    </div>
  </div>
);
