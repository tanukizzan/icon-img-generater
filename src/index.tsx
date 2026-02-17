import { Hono } from "hono";
import { HomePage } from "./components/pages/HomePage";
import { BasePathContext } from './context'

type Bindings = {
  BASE_PATH: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/api/icon-svg", async (c) => {
  const name = c.req.query("name");
  const color = c.req.query("color");

  if (!name) {
    return c.json({ error: "アイコン名を入力してください" }, 400);
  }

  const parts = name.split(":");
  if (parts.length !== 2) {
    return c.json({ error: "アイコン名は prefix:name 形式で入力してください（例: mdi:home）" }, 400);
  }

  const [prefix, iconName] = parts;
  let url = `https://api.iconify.design/${prefix}/${iconName}.svg`;
  if (color) {
    url += `?color=${encodeURIComponent(color)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    return c.json({ error: "アイコンが見つかりませんでした" }, 404);
  }

  const svg = await res.text();
  return c.body(svg, 200, { "Content-Type": "image/svg+xml" });
});

app.get("/", (c) => {
  const basePath = c.env.BASE_PATH || "";
  return c.html(
    <BasePathContext.Provider value={basePath}>
      <HomePage />
    </BasePathContext.Provider>
  );
});

export default app;
