import type { FC } from "hono/jsx";
import { TextInput } from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { ErrorMessage } from "../atoms/ErrorMessage";

export const IconNameField: FC = () => (
  <div>
    <div class="flex flex-col gap-2">
      <TextInput id="iconNameInput" placeholder="例: mdi:home" class="flex-1" />
      <div class="flex items-center gap-2">
        <Button id="randomIconBtn" variant="secondary" class="w-full">
          🎲 ランダム
        </Button>
        <Button id="previewBtn" variant="primary" class="w-full">
          適用
        </Button>
      </div>
    </div>
    <ErrorMessage id="errorMsg" />
  </div>
);
