import { els } from "../dom";
import { getState } from "../state";

export function updateInputStates(): void {
  const { isColoredIcon } = getState();

  if (isColoredIcon) {
    els.iconColorPicker.disabled = true;
    els.iconColorText.disabled = true;
    // Optional: Add visual feedback for disabled state
    els.iconColorPicker.parentElement?.classList.add("opacity-50", "pointer-events-none");
  } else {
    els.iconColorPicker.disabled = false;
    els.iconColorText.disabled = false;
    els.iconColorPicker.parentElement?.classList.remove("opacity-50", "pointer-events-none");
  }
}
