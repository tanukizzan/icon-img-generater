import type { FC } from "hono/jsx";
import { SelectField } from "../atoms/SelectField";

export const SizeSelector: FC = () => (
  <div>
    <label class="block text-sm text-zinc-400 mb-1">サイズ</label>
    <SelectField
      id="sizeSelect"
      options={[
        { value: "128", label: "128 x 128" },
        { value: "256", label: "256 x 256" },
        { value: "512", label: "512 x 512", selected: true },
        { value: "1024", label: "1024 x 1024" },
      ]}
    />
  </div>
);
