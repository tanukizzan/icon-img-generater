import type { FC } from "hono/jsx";
import { Button } from "../atoms/Button";

export const DownloadButtonGroup: FC = () => (
  <div class="space-y-3">
    <Button id="downloadSvgBtn" variant="success" disabled class="w-full py-2.5">
      SVG ダウンロード
    </Button>
    <Button id="downloadJpgBtn" variant="warning" disabled class="w-full py-2.5">
      JPG ダウンロード
    </Button>
  </div>
);
