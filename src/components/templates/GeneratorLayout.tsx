import type { FC, Child } from "hono/jsx";

type GeneratorLayoutProps = {
  sidebar: Child;
  main: Child;
};

export const GeneratorLayout: FC<GeneratorLayoutProps> = (props) => (
  <div class="h-full w-full lg:max-w-6xl mx-auto">
    <div class="p-8 mt-4">
      <h1 class="text-xl font-bold tracking-tight text-zinc-100">かんたんアイコンジェネレーター</h1>
      <p class="text-xs text-zinc-500 mt-1">
        20万個以上のIconifyアイコンからカスタム画像を生成
      </p>
    </div>
    <main class="p-6 sticky top-0 bg-zinc-950">
      {props.main}
    </main>
    <aside class="lg:grid lg:grid-cols-4 gap-2 lg:gap-4 space-y-8 px-5 py-4 bg-zinc-950">
      {props.sidebar}
    </aside>
    <footer class="text-zinc-500 p-6">
      <p>© 2026 tanukizzan. All rights reserved.</p>
    </footer>
  </div>
);
