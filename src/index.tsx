import { Hono } from "hono";

const app = new Hono();

app.get("/api/icon-svg", async (c) => {
  const name = c.req.query("name");
  const color = c.req.query("color");

  if (!name) {
    return c.json({ error: "name parameter is required" }, 400);
  }

  const parts = name.split(":");
  if (parts.length !== 2) {
    return c.json({ error: "Invalid icon name format. Use prefix:name (e.g. mdi:home)" }, 400);
  }

  const [prefix, iconName] = parts;
  let url = `https://api.iconify.design/${prefix}/${iconName}.svg`;
  if (color) {
    url += `?color=${encodeURIComponent(color)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    return c.json({ error: "Icon not found" }, 404);
  }

  const svg = await res.text();
  return c.body(svg, 200, { "Content-Type": "image/svg+xml" });
});

app.get("/", (c) => {
  const html = (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>アイコン画像ジェネレーター</title>
        <link href="/styles.css" rel="stylesheet" />
      </head>
      <body class="bg-zinc-950 text-zinc-100 min-h-screen">
        <div class="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div class="mb-8">
            <h1 class="text-2xl font-bold tracking-tight">アイコン画像ジェネレーター</h1>
            <p class="text-sm text-zinc-400 mt-1">Iconifyアイコンからカスタム画像を生成</p>
          </div>

          {/* 2-column grid */}
          <div class="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
            {/* Left column: inputs & settings */}
            <div class="lg:order-none order-2 space-y-4">
              {/* Icon name input card */}
              <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <label class="block text-sm font-medium text-zinc-300 mb-2">
                  アイコン名（
                  <a
                    href="https://icon-sets.iconify.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-zinc-400 underline hover:text-zinc-200 transition-colors"
                  >
                    Iconify
                  </a>
                  からコピー）
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    id="iconNameInput"
                    placeholder="例: mdi:home"
                    class="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600"
                  />
                  <button
                    id="previewBtn"
                    class="bg-zinc-100 text-zinc-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors"
                  >
                    プレビュー
                  </button>
                </div>
                <p id="errorMsg" class="text-red-500 text-sm mt-2 hidden"></p>
              </div>

              {/* Settings card */}
              <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-4">
                <h2 class="text-sm font-medium text-zinc-300">設定</h2>

                {/* Background color */}
                <div>
                  <label class="block text-sm text-zinc-400 mb-1">背景色</label>
                  <div class="flex items-center gap-2">
                    <input type="color" id="bgColorPicker" value="#3B82F6" class="w-10 h-10 rounded cursor-pointer" />
                    <input
                      type="text"
                      id="bgColorText"
                      value="#3B82F6"
                      class="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm w-28 font-mono text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                  </div>
                </div>

                {/* Icon color */}
                <div>
                  <label class="block text-sm text-zinc-400 mb-1">アイコン色</label>
                  <div class="flex items-center gap-2">
                    <input type="color" id="iconColorPicker" value="#FFFFFF" class="w-10 h-10 rounded cursor-pointer" />
                    <input
                      type="text"
                      id="iconColorText"
                      value="#FFFFFF"
                      class="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm w-28 font-mono text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    />
                  </div>
                </div>

                {/* Shape */}
                <div>
                  <label class="block text-sm text-zinc-400 mb-2">形状</label>
                  <div class="flex gap-4">
                    <label class="flex items-center gap-1.5 text-sm text-zinc-300 cursor-pointer">
                      <input type="radio" name="shape" value="square" checked />
                      正方形
                    </label>
                    <label class="flex items-center gap-1.5 text-sm text-zinc-300 cursor-pointer">
                      <input type="radio" name="shape" value="circle" />
                      円
                    </label>
                    <label class="flex items-center gap-1.5 text-sm text-zinc-300 cursor-pointer">
                      <input type="radio" name="shape" value="rounded" />
                      角丸正方形
                    </label>
                  </div>
                </div>

                {/* Size */}
                <div>
                  <label class="block text-sm text-zinc-400 mb-1">サイズ</label>
                  <select
                    id="sizeSelect"
                    class="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  >
                    <option value="256">256 x 256</option>
                    <option value="512" selected>512 x 512</option>
                    <option value="1024">1024 x 1024</option>
                  </select>
                </div>
              </div>

              {/* Download card */}
              <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-3">
                <h2 class="text-sm font-medium text-zinc-300">ダウンロード</h2>
                <button
                  id="downloadSvgBtn"
                  disabled
                  class="w-full bg-emerald-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  SVG ダウンロード
                </button>
                <button
                  id="downloadJpgBtn"
                  disabled
                  class="w-full bg-amber-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  JPG ダウンロード
                </button>
              </div>
            </div>

            {/* Right column: preview */}
            <div class="lg:order-none order-1">
              <div class="lg:sticky lg:top-8">
                <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <h2 class="text-sm font-medium text-zinc-300 mb-3">プレビュー</h2>
                  <div
                    id="previewArea"
                    class="w-full aspect-square bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800 overflow-auto"
                  >
                    <span class="text-zinc-500 text-sm">アイコン名を入力してプレビュー</span>
                  </div>
                  {/* Preview mode toggle */}
                  <div class="flex justify-end mt-3">
                    <div class="inline-flex rounded-md border border-zinc-800 text-xs">
                      <button
                        id="previewModeFit"
                        class="px-3 py-1.5 rounded-l-md bg-zinc-800 text-zinc-100 transition-colors"
                      >
                        フィット
                      </button>
                      <button
                        id="previewModeActual"
                        class="px-3 py-1.5 rounded-r-md text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        実寸大
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="/app.js"></script>
      </body>
    </html>
  );

  return c.html(html);
});

export default app;
