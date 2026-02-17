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
        <meta name="description" content="20万種類以上のIconifyアイコンからカスタムアイコンを作ろう！" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content="20万種類以上のIconifyアイコンからカスタムアイコンを作ろう！" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://icon-img-generater.pages.dev/" />
        <meta property="og:image" content={`${basePath}/images/screenshot.png`} />
        <meta property="og:site_name" content="Icon Image Generator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content="20万種類以上のIconifyアイコンからカスタムアイコンを作ろう！" />
        <meta name="twitter:image" content={`${basePath}/images/screenshot.png`} />
        <link href={`${basePath}/styles.css`} rel="stylesheet" />
        <link rel="icon" href={`${basePath}/images/favicon.svg`} type="image/svg+xml" />
      </head>
      <body class="bg-zinc-950 text-zinc-100 m-0 h-[100dvh]">
        {props.children}
        <script dangerouslySetInnerHTML={{ __html: `window.__BASE_PATH__ = "${basePath}";` }} />
        <script src={`${basePath}/app.js`}></script>
      </body>
    </html>
  )
};
