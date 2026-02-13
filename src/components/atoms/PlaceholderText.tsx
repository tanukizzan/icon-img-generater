import type { FC, PropsWithChildren } from "hono/jsx";

export const PlaceholderText: FC<PropsWithChildren> = (props) => (
  <span class="text-zinc-500 text-sm">{props.children}</span>
);
