import type { FC } from "hono/jsx";
import { Button } from "../atoms/Button";

export const DownloadButtonGroup: FC = () => (
  <div class="flex gap-2">
    <Button id="downloadSvgBtn" variant="success" disabled class="w-full py-2.5">
      SVG
    </Button>
    <Button id="downloadJpgBtn" variant="warning" disabled class="w-full py-2.5">
      JPG
    </Button>
  </div>
);
