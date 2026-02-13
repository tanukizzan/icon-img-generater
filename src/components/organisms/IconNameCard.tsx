import type { FC } from "hono/jsx";
import { IconNameField } from "../molecules/IconNameField";

export const IconNameCard: FC = () => (
  <div>
    <div class="flex items-center px-3 py-2 text-zinc-200 bg-zinc-800/50 rounded-md mb-3">
      <svg
        class="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2S2 6.486 2 12s4.486 10 10 10m3.493-13a1.494 1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 9m-4.301 6.919a4.1 4.1 0 0 0 1.616 0q.381-.079.75-.233c.234-.1.464-.224.679-.368q.313-.214.591-.489q.275-.274.489-.592l1.658 1.117a6 6 0 0 1-1.619 1.621a6 6 0 0 1-2.149.904a6.1 6.1 0 0 1-2.414-.001a5.9 5.9 0 0 1-2.148-.903a6.1 6.1 0 0 1-1.621-1.622l1.658-1.117q.216.318.488.59a4 4 0 0 0 2.022 1.093M8.5 9a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 9\" />
      </svg>
      <span class="ml-2 font-medium text-sm">アイコン</span>
    </div>
    <IconNameField />
    <div class="flex justify-between items-center">
      <button
        id="randomIconBtn"
        class="flex w-full items-center justify-center my-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-100 rounded-md transition-colors"
        title="ランダムにアイコンを選択"
      >
        🎲 ランダム
      </button>
    </div>
    <p class="ml-1 text-sm text-zinc-400">その他のアイコンを適用するには、Iconifyでアイコンを探して、Icon nameを入力してください。</p>
    <div class="mt-2 flex justify-end">
      <a
        href="https://icon-sets.iconify.design/"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-100 rounded-md transition-colors"
      >
        Iconifyでアイコンを探す
        <svg
          class="w-3 h-3 ml-1.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>

  </div>
);
