import type { FC } from "hono/jsx";
import { SelectField } from "../atoms/SelectField";

export const SizeSelector: FC = () => (
  <div>
    <label class="block text-sm text-zinc-400 mb-1">サイズ</label>
    <SelectField
      id="sizeSelect"
      options={[
        { value: "16", label: "16 x 16" },
        { value: "24", label: "24 x 24" },
        { value: "32", label: "32 x 32" },
        { value: "48", label: "48 x 48" },
        { value: "64", label: "64 x 64" },
        { value: "128", label: "128 x 128" },
        { value: "256", label: "256 x 256" },
        { value: "512", label: "512 x 512", selected: true },
        { value: "1024", label: "1024 x 1024" },
      ]}
    />
  </div>
);
