import type { FC } from "hono/jsx";
import { DownloadButtonGroup } from "../molecules/DownloadButtonGroup";

export const DownloadCard: FC = () => (
  <div>
    <div class="flex items-center pl-3 pr-1 py-2 text-zinc-200 bg-zinc-800/50 rounded-md mb-3">
      <svg
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
      </svg>
      <span class="ml-2 font-medium text-sm">ダウンロード</span>
    </div>
    <DownloadButtonGroup />
  </div>
);
