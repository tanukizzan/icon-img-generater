import type { ParsedSvg } from "../types";

export function parseSvg(svgText: string): ParsedSvg | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svgEl = doc.querySelector("svg");
  if (!svgEl) return null;

  return {
    viewBox: svgEl.getAttribute("viewBox") || "0 0 24 24",
    inner: svgEl.innerHTML,
  };
}
