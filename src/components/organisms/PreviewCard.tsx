import type { FC } from "hono/jsx";
import { SectionHeading } from "../atoms/SectionHeading";
import { PlaceholderText } from "../atoms/PlaceholderText";

export const PreviewCard: FC = () => (
  <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <SectionHeading>プレビュー</SectionHeading>
    <div
      id="previewArea"
      class="w-full h-auto aspect-square sm:aspect-video bg-zinc-900 flex items-center justify-center border border-zinc-800 mt-3"
    >
      <PlaceholderText>アイコン名を入力してプレビュー</PlaceholderText>
    </div>
  </div>
);
