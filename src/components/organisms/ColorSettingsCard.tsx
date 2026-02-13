import type { FC } from "hono/jsx";
import { ColorPickerField } from "../molecules/ColorPickerField";

export const ColorSettingsCard: FC = () => (
  <div>
    {/* Color settings */}
    <div>
      <div class="flex items-center pl-3 pr-1 py-2 text-zinc-200 bg-zinc-800/50 rounded-md mb-3">
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22C14.25 22 15.91 20.35 15.91 18.5C15.91 18.11 15.82 17.75 15.65 17.43C15.96 17.47 16.27 17.5 16.59 17.5C19.35 17.5 22 15.03 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12C20 14.07 18.19 15.5 16.59 15.5C16.32 15.5 16.03 15.5 15.77 15.43L15.34 15.31C14.76 15.17 14.37 15.53 14.12 16.04C13.96 16.36 13.91 16.79 13.91 18.5C13.91 19.36 13.12 20 12 20A8 8 0 0 1 4 12A8 8 0 0 1 12 4M6.5 10A1.5 1.5 0 0 0 5 11.5A1.5 1.5 0 0 0 6.5 13A1.5 1.5 0 0 0 8 11.5A1.5 1.5 0 0 0 6.5 10M9.5 6A1.5 1.5 0 0 0 8 7.5A1.5 1.5 0 0 0 9.5 9A1.5 1.5 0 0 0 11 7.5A1.5 1.5 0 0 0 9.5 6M14.5 6A1.5 1.5 0 0 0 13 7.5A1.5 1.5 0 0 0 14.5 9A1.5 1.5 0 0 0 16 7.5A1.5 1.5 0 0 0 14.5 6M17.5 10A1.5 1.5 0 0 0 16 11.5A1.5 1.5 0 0 0 17.5 13A1.5 1.5 0 0 0 19 11.5A1.5 1.5 0 0 0 17.5 10Z" />
        </svg>
        <span class="ml-2 font-medium text-sm">カラー</span>
      </div>
      <div class="space-y-4 px-1">
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
      </div>
    </div>
  </div>
);
