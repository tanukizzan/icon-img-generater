import type { FC } from "hono/jsx";
import { SectionHeading } from "../atoms/SectionHeading";
import { PlaceholderText } from "../atoms/PlaceholderText";
import { PreviewModeToggle } from "../molecules/PreviewModeToggle";

export const PreviewCard: FC = () => (
  <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <SectionHeading>プレビュー</SectionHeading>
    <div
      id="previewArea"
      class="w-full aspect-square bg-zinc-900 flex items-center justify-center border border-zinc-800 overflow-auto mt-3"
    >
      <PlaceholderText>アイコン名を入力してプレビュー</PlaceholderText>
    </div>
    <PreviewModeToggle />
  </div>
);
