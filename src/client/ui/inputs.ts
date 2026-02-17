import { els } from "../dom";
import { getState } from "../state";

export function updateInputStates(): void {
  const { isColoredIcon } = getState();

  const iconColorPresetBtns = document.querySelectorAll(
    `button[data-picker-id="${els.iconColorPicker.id}"]`
  );
  const warningMsg = document.getElementById(`${els.iconColorPicker.id}-warning`);

  if (isColoredIcon) {
    els.iconColorPicker.disabled = true;
    els.iconColorText.disabled = true;

    els.iconColorPicker.parentElement?.classList.add("opacity-50", "pointer-events-none");

    // Disable preset buttons
    iconColorPresetBtns.forEach(btn => {
      if (btn instanceof HTMLButtonElement) {
        btn.disabled = true;
        btn.classList.add("opacity-50", "pointer-events-none");
      }
    });

    // Show warning message
    if (warningMsg) {
      warningMsg.classList.remove("invisible");
    }
  } else {
    els.iconColorPicker.disabled = false;
    els.iconColorText.disabled = false;
    els.iconColorPicker.parentElement?.classList.remove("opacity-50", "pointer-events-none");

    // Enable preset buttons
    iconColorPresetBtns.forEach(btn => {
      if (btn instanceof HTMLButtonElement) {
        btn.disabled = false;
        btn.classList.remove("opacity-50", "pointer-events-none");
      }
    });

    // Hide warning message
    if (warningMsg) {
      warningMsg.classList.add("invisible");
    }
  }
}
