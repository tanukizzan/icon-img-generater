import type { FC } from "hono/jsx";
import { TextInput } from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { ExternalLink } from "../atoms/ExternalLink";
import { ErrorMessage } from "../atoms/ErrorMessage";

export const IconNameField: FC = () => (
  <div>
    <label class="block text-sm font-medium text-zinc-300 mb-2">
      アイコン名（
      <ExternalLink href="https://icon-sets.iconify.design/">Iconify</ExternalLink>
      からコピー）
    </label>
    <div class="flex gap-2">
      <TextInput id="iconNameInput" placeholder="例: mdi:home" class="flex-1" />
      <Button id="previewBtn" variant="primary">
        プレビュー
      </Button>
    </div>
    <ErrorMessage id="errorMsg" />
  </div>
);
