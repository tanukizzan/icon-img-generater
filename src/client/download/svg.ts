import { buildCompositeSvg } from "../svg/composite";
import { downloadBlob } from "./blob";
import { els } from "../dom";

export function downloadSvg(): void {
  const svg = buildCompositeSvg();
  if (!svg) return;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const name = els.iconNameInput.value.trim().replace(":", "-") || "icon";
  downloadBlob(blob, `${name}.svg`);
}
