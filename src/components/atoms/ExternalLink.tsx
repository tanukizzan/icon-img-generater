import type { FC, PropsWithChildren } from "hono/jsx";

type ExternalLinkProps = PropsWithChildren<{
  href: string;
}>;

export const ExternalLink: FC<ExternalLinkProps> = (props) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    class="text-zinc-400 underline hover:text-zinc-200 transition-colors"
  >
    {props.children}
  </a>
);
