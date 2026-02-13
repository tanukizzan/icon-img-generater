import type { FC, Child } from "hono/jsx";

type GeneratorLayoutProps = {
  sidebar: Child;
  main: Child;
};

export const GeneratorLayout: FC<GeneratorLayoutProps> = (props) => (
  <div class="h-full w-full w-full lg:max-w-6xl mx-auto">
    <header class="text-lg font-bold tracking-tight text-zinc-100 p-6">
      <h1>アイコン画像ジェネレーター</h1>
      <p class="text-xs text-zinc-500 mt-1">
        Iconifyアイコンからカスタム画像を生成
      </p>
    </header>
    <main class="p-6 lg:overflow-auto">
      {props.main}
    </main>
    <aside class="lg:grid lg:grid-cols-4 gap-2 lg:gap-4 space-y-8 px-5 py-4 bg-zinc-950">
      {props.sidebar}
    </aside>
    <footer class="text-xs text-zinc-500 p-6">
      <p>© 2026 tanukizzan. All rights reserved.</p>
    </footer>
  </div>
);
