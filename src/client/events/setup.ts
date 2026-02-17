import { els } from "../dom";
import { fetchIcon } from "../api/icon";
import { updatePreview } from "../ui/preview";
import { downloadSvg } from "../download/svg";
import { downloadJpg } from "../download/jpg";
import { updateInputStates } from "../ui/inputs";
import { subscribe } from "../state";
import notoIcons from "../data/noto-v1.json";

type Bindings = {
  BASE_PATH: string
}
// Flag to track if it's the first generation
let isFirstGeneration = true;

const PRESET_COLORS = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7", "#000000"];

function getRandomColors(): { icon: string; bg: string } {
  return {
    icon: "#FFFFFF",
    bg: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)],
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

  // Download buttons
  els.downloadSvgBtn.addEventListener("click", downloadSvg);
  els.downloadJpgBtn.addEventListener("click", downloadJpg);

  // Random icon
  els.randomIconBtn?.addEventListener("click", () => {
    const randomIcon = notoIcons[Math.floor(Math.random() * notoIcons.length)];

    let randomBg;
    const currentBg = els.bgColorPicker.value.toUpperCase();
    do {
      randomBg = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
    } while (randomBg === currentBg && PRESET_COLORS.length > 1);

    // Set icon
    els.iconNameInput.value = `noto-v1:${randomIcon}`;

    // Set background color
    els.bgColorPicker.value = randomBg;
    els.bgColorText.value = randomBg;

    handlePreview();
  });

  // Modal events
  const openModal = () => {
    const svgContent = els.previewArea.innerHTML;
    if (!svgContent || svgContent.trim() === "") return;

    els.previewModalContent.innerHTML = svgContent;
    const modalSvg = els.previewModalContent.querySelector("svg");

    if (modalSvg) {
      // Clean up inline styles that might restrict size in modal
      modalSvg.style.width = "100%";
      modalSvg.style.height = "100%";
      modalSvg.style.maxWidth = "min(80vw, 80vh)"; // Responsive max size
      modalSvg.style.maxHeight = "min(80vw, 80vh)";

      // Remove any fixed dimensions if present
      modalSvg.removeAttribute("width");
      modalSvg.removeAttribute("height");
    }

    els.previewModal.classList.remove("hidden");
    // Small delay to allow display:block to apply before opacity transition
    requestAnimationFrame(() => {
      els.previewModal.classList.remove("opacity-0");
    });
  };

  const closeModal = () => {
    els.previewModal.classList.add("opacity-0");
    setTimeout(() => {
      els.previewModal.classList.add("hidden");
      els.previewModalContent.innerHTML = "";
    }, 300); // Match transition duration
  };

  els.previewArea.addEventListener("click", openModal);
  els.closePreviewModalBtn.addEventListener("click", closeModal);
  els.previewModal.addEventListener("click", (e) => {
    if (e.target === els.previewModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.previewModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  subscribe(updateInputStates);
}
