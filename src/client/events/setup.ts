import { els } from "../dom";
import { fetchIcon } from "../api/icon";
import { updatePreview } from "../ui/preview";
import { downloadSvg } from "../download/svg";
import { downloadJpg } from "../download/jpg";
import { updateInputStates } from "../ui/inputs";
import { subscribe } from "../state";

// Flag to track if it's the first generation
let isFirstGeneration = true;

const PRESET_COLORS = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#FFFFFF", "#000000"];

function getRandomColors(): { icon: string; bg: string } {
  const shuffled = [...PRESET_COLORS].sort(() => 0.5 - Math.random());
  return {
    icon: shuffled[0],
    bg: shuffled[1],
  };
}

export function setupEventListeners(): void {
  // Preset buttons
  document.querySelectorAll("[data-preset-btn]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const color = target.dataset.color!;
      const pickerId = target.dataset.pickerId!;
      const textId = target.dataset.textId!;

      const picker = document.getElementById(pickerId) as HTMLInputElement;
      const text = document.getElementById(textId) as HTMLInputElement;

      if (picker && text) {
        picker.value = color;
        text.value = color;
        updatePreview();
      }
    });
  });

  const handlePreview = async () => {
    if (isFirstGeneration) {
      const { icon, bg } = getRandomColors();

      // Update icon color
      els.iconColorPicker.value = icon;
      els.iconColorText.value = icon;

      // Update bg color
      els.bgColorPicker.value = bg;
      els.bgColorText.value = bg;

      isFirstGeneration = false;
    }
    await fetchIcon();
  };

  // Preview button
  els.previewBtn.addEventListener("click", handlePreview);

  // Enter key on icon name input
  els.iconNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handlePreview();
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
  els.shapeSlider.addEventListener("input", updatePreview);

  // Size change
  // els.sizeSelect.addEventListener("change", updatePreview);

  // Download buttons
  els.downloadSvgBtn.addEventListener("click", downloadSvg);
  els.downloadJpgBtn.addEventListener("click", downloadJpg);

  subscribe(updateInputStates);
}
