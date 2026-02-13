import type { FC } from "hono/jsx";
import { SectionHeading } from "../atoms/SectionHeading";
import { DownloadButtonGroup } from "../molecules/DownloadButtonGroup";

export const DownloadCard: FC = () => (
  <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-3">
    <SectionHeading>ダウンロード</SectionHeading>
    <DownloadButtonGroup />
  </div>
);
