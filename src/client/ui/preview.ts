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
    svgEl.style.width = "512px";
    svgEl.style.height = "512px";
    svgEl.style.maxWidth = "100%";
    svgEl.style.maxHeight = "100%";

    // Ensure container centering
    els.previewArea.classList.add("items-center", "justify-center");
    els.previewArea.classList.remove("items-start", "justify-start");
  }
}
