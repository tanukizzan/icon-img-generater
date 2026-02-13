import type { FC } from "hono/jsx";
import { IconNameField } from "../molecules/IconNameField";

export const IconNameCard: FC = () => (
  <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
    <IconNameField />
  </div>
);
