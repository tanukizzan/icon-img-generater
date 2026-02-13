import type { ParsedSvg } from "../types";

export function parseSvg(svgText: string): ParsedSvg | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svgEl = doc.querySelector("svg");
  if (!svgEl) return null;

  const shapes = svgEl.querySelectorAll(
    "path, circle, rect, polygon, polyline, ellipse, line, g"
  );

  let isColored = false;
  for (const el of shapes) {
    const fill = el.getAttribute("fill");
    const stroke = el.getAttribute("stroke");

    if (
      (fill && fill !== "none" && fill !== "currentColor") ||
      (stroke && stroke !== "none" && stroke !== "currentColor")
    ) {
      isColored = true;
      break;
    }
  }

  return {
    viewBox: svgEl.getAttribute("viewBox") || "0 0 24 24",
    inner: svgEl.innerHTML,
    isColored,
  };
}
