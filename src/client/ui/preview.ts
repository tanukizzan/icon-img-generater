import { els, getSize } from "../dom";
import { getState } from "../state";
import { buildCompositeSvg } from "../svg/composite";

export function updatePreviewModeUI(): void {
  const { previewMode } = getState();

  if (previewMode === "fit") {
    els.previewModeFit.className =
      "px-3 py-1.5 rounded-l-md bg-zinc-800 text-zinc-100 transition-colors";
    els.previewModeActual.className =
      "px-3 py-1.5 rounded-r-md text-zinc-400 hover:text-zinc-200 transition-colors";
  } else {
    els.previewModeFit.className =
      "px-3 py-1.5 rounded-l-md text-zinc-400 hover:text-zinc-200 transition-colors";
    els.previewModeActual.className =
      "px-3 py-1.5 rounded-r-md bg-zinc-800 text-zinc-100 transition-colors";
  }
}

export function updatePreview(): void {
  const { iconInner, previewMode } = getState();
  if (!iconInner) return;

  const svg = buildCompositeSvg();
  if (!svg) return;

  els.previewArea.innerHTML = svg;
  const svgEl = els.previewArea.querySelector("svg");
  if (svgEl) {
    if (previewMode === "fit") {
      svgEl.style.width = "100%";
      svgEl.style.height = "100%";
      els.previewArea.classList.add("items-center", "justify-center");
      els.previewArea.classList.remove("items-start", "justify-start");
    } else {
      const size = getSize();
      svgEl.style.width = `${size}px`;
      svgEl.style.height = `${size}px`;
      svgEl.style.minWidth = `${size}px`;
      svgEl.style.minHeight = `${size}px`;
      els.previewArea.classList.remove("items-center", "justify-center");
      els.previewArea.classList.add("items-start", "justify-start");
    }
  }
}
