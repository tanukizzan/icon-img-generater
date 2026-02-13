import { els } from "../dom";

export function setDownloadEnabled(enabled: boolean): void {
  els.downloadSvgBtn.disabled = !enabled;
  els.downloadJpgBtn.disabled = !enabled;
}
