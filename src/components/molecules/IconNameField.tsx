import type { FC } from "hono/jsx";
import { TextInput } from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { ExternalLink } from "../atoms/ExternalLink";
import { ErrorMessage } from "../atoms/ErrorMessage";

export const IconNameField: FC = () => (
  <div>
    <div class="flex gap-2">
      <TextInput id="iconNameInput" placeholder="例: mdi:home" class="flex-1" />
      <Button id="previewBtn" variant="primary">
        適用
      </Button>
    </div>
    <ErrorMessage id="errorMsg" />
  </div>
);
