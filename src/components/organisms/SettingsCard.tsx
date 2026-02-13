import type { FC } from "hono/jsx";
import { SectionHeading } from "../atoms/SectionHeading";
import { ColorPickerField } from "../molecules/ColorPickerField";
import { ShapeSelector } from "../molecules/ShapeSelector";
import { SizeSelector } from "../molecules/SizeSelector";

export const SettingsCard: FC = () => (
  <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-4">
    <SectionHeading>設定</SectionHeading>
    <ColorPickerField
      label="背景色"
      pickerId="bgColorPicker"
      textId="bgColorText"
      defaultValue="#3B82F6"
    />
    <ColorPickerField
      label="アイコン色"
      pickerId="iconColorPicker"
      textId="iconColorText"
      defaultValue="#FFFFFF"
    />
    <ShapeSelector />
    <SizeSelector />
  </div>
);
