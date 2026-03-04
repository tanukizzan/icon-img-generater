import { buildCompositeSvg } from "../svg/composite";
import { downloadBlob } from "./blob";
import { els, getSize } from "../dom";

export function downloadSvg(): void {
  const svg = buildCompositeSvg();
  if (!svg) return;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const name = els.iconNameInput.value.trim().replace(":", "-") || "icon";
  const size = getSize();
  downloadBlob(blob, `${name}-${size}.svg`);
}
