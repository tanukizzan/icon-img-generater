import type { FC } from "hono/jsx";
import { ShapeSelector } from "../molecules/ShapeSelector";
import { SizeSelector } from "../molecules/SizeSelector";

export const DisplaySettingsCard: FC = () => (
  <div>
    {/* Display settings */}
    <div>
      <div class="flex items-center pl-3 pr-1 py-2 text-zinc-200 bg-zinc-800/50 rounded-md mb-3">
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16C1,17.11 1.89,18 3,18H10V20H8V22H16V20H14V18H21C22.11,18 23,17.11 23,16V4C23,2.89 22.11,2 21,2Z" />
        </svg>
        <span class="ml-2 font-medium text-sm">表示</span>
      </div>
      <div class="space-y-4 px-1">
        <ShapeSelector />
        <SizeSelector />
      </div>
    </div>
  </div>
);
