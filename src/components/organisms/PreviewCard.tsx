import type { FC } from "hono/jsx";
import { PlaceholderText } from "../atoms/PlaceholderText";

export const PreviewCard: FC = () => (
  <div>
    <div
      id="previewArea"
      class="w-full h-auto aspect-square bg-zinc-900 flex items-center justify-center"
    >
      <PlaceholderText>プレビュー</PlaceholderText>
    </div>
  </div>
);
