import { els } from "../dom";
import { getState } from "../state";
import { buildCompositeSvg } from "../svg/composite";

export function updatePreview(): void {
  const { iconInner } = getState();
  if (!iconInner) return;

  const svg = buildCompositeSvg();
  if (!svg) return;

  els.previewArea.innerHTML = svg;
  const svgEl = els.previewArea.querySelector("svg");
  if (svgEl) {
    // Always use fit/centered mode
    svgEl.style.width = "100%";
    svgEl.style.height = "100%";
    svgEl.style.maxWidth = "512px";
    svgEl.style.maxHeight = "512px";

    // Ensure container centering
    els.previewArea.classList.add("items-center", "justify-center");
    els.previewArea.classList.remove("items-start", "justify-start");
  }
}
