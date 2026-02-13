import type { FC, Child } from "hono/jsx";

type GeneratorLayoutProps = {
  sidebar: Child;
  main: Child;
};

export const GeneratorLayout: FC<GeneratorLayoutProps> = (props) => (
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold tracking-tight">アイコン画像ジェネレーター</h1>
      <p class="text-sm text-zinc-400 mt-1">Iconifyアイコンからカスタム画像を生成</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
      <div class="lg:order-none order-2 space-y-4">{props.sidebar}</div>
      <div class="lg:order-none order-1">
        <div class="lg:sticky lg:top-8">{props.main}</div>
      </div>
    </div>
  </div>
);
