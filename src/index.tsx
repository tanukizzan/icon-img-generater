import { Hono } from "hono";
import { HomePage } from "./components/pages/HomePage";

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
  return c.html(<HomePage />);
});

export default app;
