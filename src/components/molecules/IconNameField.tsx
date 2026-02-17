import type { FC } from "hono/jsx";
import { TextInput } from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { ErrorMessage } from "../atoms/ErrorMessage";

export const IconNameField: FC = () => (
  <div>
    <div class="flex flex-col gap-2">
      <TextInput id="iconNameInput" placeholder="例: mdi:home" class="flex-1" />
      <div class="flex items-center gap-2">
        <Button id="previewBtn" variant="primary" class="w-full">
          適用
        </Button>
        <button
          id="randomIconBtn"
          class="flex w-full items-center justify-center my-2 px-3 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-100 rounded-md transition-colors"
          title="ランダムにアイコンを選択"
        >
          🎲 ランダム
        </button>
      </div>
    </div>
    <ErrorMessage id="errorMsg" />
  </div>
);
