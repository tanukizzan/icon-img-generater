import type { FC, Child } from "hono/jsx";

type GeneratorLayoutProps = {
  sidebar: Child;
  main: Child;
};

export const GeneratorLayout: FC<GeneratorLayoutProps> = (props) => (
  <div class="h-full w-full lg:max-w-7xl mx-auto">
    <div class="p-8 mt-4">
      <h1 class="text-xl font-bold tracking-tight text-zinc-100">かんたんアイコンジェネレーター</h1>
      <p class="text-xs text-zinc-500 mt-1">
        20万個以上のIconifyアイコンからカスタム画像を生成
      </p>
    </div>
    <div class="flex">
      <main class="w-1/4 shrink-0 pl-3 pr-1.5 py-4 sticky top-0 self-start bg-zinc-950">
        {props.main}
      </main>
      <aside class="w-3/4 min-w-0 md:grid md:grid-cols-2 gap-2 lg:gap-4 space-y-8 md:space-y-0 pl-1.5 pr-3 py-4 bg-zinc-950">
        {props.sidebar}
      </aside>
    </div>
    <footer class="text-zinc-500 p-6">
      <p>© 2026 tanukizzan. All rights reserved.</p>
    </footer>
  </div>
);
