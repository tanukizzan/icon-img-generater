import { els } from "../dom";
import { setState } from "../state";
import { fetchIcon } from "../api/icon";
import { updatePreview, updatePreviewModeUI } from "../ui/preview";
import { downloadSvg } from "../download/svg";
import { downloadJpg } from "../download/jpg";

export function setupEventListeners(): void {
  // Preview button
  els.previewBtn.addEventListener("click", fetchIcon);

  // Enter key on icon name input
  els.iconNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchIcon();
  });

  // Background color sync
  els.bgColorPicker.addEventListener("input", () => {
    els.bgColorText.value = els.bgColorPicker.value.toUpperCase();
    updatePreview();
  });
  els.bgColorText.addEventListener("change", () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(els.bgColorText.value)) {
      els.bgColorPicker.value = els.bgColorText.value;
      updatePreview();
    }
  });

  // Icon color sync
  els.iconColorPicker.addEventListener("input", () => {
    els.iconColorText.value = els.iconColorPicker.value.toUpperCase();
    updatePreview();
  });
  els.iconColorText.addEventListener("change", () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(els.iconColorText.value)) {
      els.iconColorPicker.value = els.iconColorText.value;
      updatePreview();
    }
  });

  // Shape change
  document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener("change", updatePreview);
  });

  // Size change
  els.sizeSelect.addEventListener("change", updatePreview);

  // Preview mode toggle
  els.previewModeFit.addEventListener("click", () => {
    setState({ previewMode: "fit" });
    updatePreviewModeUI();
    updatePreview();
  });

  els.previewModeActual.addEventListener("click", () => {
    setState({ previewMode: "actual" });
    updatePreviewModeUI();
    updatePreview();
  });

  // Download buttons
  els.downloadSvgBtn.addEventListener("click", downloadSvg);
  els.downloadJpgBtn.addEventListener("click", downloadJpg);
}
