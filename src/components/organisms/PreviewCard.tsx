import type { FC } from "hono/jsx";
import { PlaceholderText } from "../atoms/PlaceholderText";

export const PreviewCard: FC = () => (
  <div>
    <div
      id="previewArea"
      class="w-full h-auto aspect-square bg-zinc-900 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
      title="クリックして拡大"
    >
      <PlaceholderText>プレビュー</PlaceholderText>
    </div>
    <div>
      <p class="text-xs sm:text-sm text-zinc-500 mt-2">プレビュー</p>
    </div>

    {/* Full screen modal */}
    <div
      id="previewModal"
      class="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300"
    >
      <div
        id="previewModalContent"
        class="relative w-full max-w-4xl h-auto max-h-[90vh] p-4 flex items-center justify-center"
      >
        {/* Content will be injected here */}
      </div>

      <button
        id="closePreviewModalBtn"
        class="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
);
