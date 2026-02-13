import type { FC, PropsWithChildren } from "hono/jsx";

export const SectionHeading: FC<PropsWithChildren> = (props) => (
  <h2 class="text-sm font-medium text-zinc-300">{props.children}</h2>
);
