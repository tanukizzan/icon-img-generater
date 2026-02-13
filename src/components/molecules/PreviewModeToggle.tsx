import type { FC } from "hono/jsx";

export const PreviewModeToggle: FC = () => (
  <div class="flex justify-end mt-3">
    <div class="inline-flex rounded-md border border-zinc-800 text-xs">
      <button
        id="previewModeFit"
        class="px-3 py-1.5 rounded-l-md bg-zinc-800 text-zinc-100 transition-colors"
      >
        フィット
      </button>
      <button
        id="previewModeActual"
        class="px-3 py-1.5 rounded-r-md text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        実寸大
      </button>
    </div>
  </div>
);
