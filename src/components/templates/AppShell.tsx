import type { FC, PropsWithChildren } from "hono/jsx";
import { useBasePath } from '../../context'

type AppShellProps = PropsWithChildren<{
  title: string;
}>;

export const AppShell: FC<AppShellProps> = (props) => {
  const basePath = useBasePath();
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>
        <link href={`${basePath}/styles.css`} rel="stylesheet" />
      </head>
      <body class="bg-zinc-950 text-zinc-100 m-0 h-[100dvh]">
        {props.children}
        <script src={`${basePath}/app.js`}></script>
      </body>
    </html>
  )
};
