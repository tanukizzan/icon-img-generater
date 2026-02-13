export const els = {
  iconNameInput: document.getElementById("iconNameInput") as HTMLInputElement,
  previewBtn: document.getElementById("previewBtn") as HTMLButtonElement,
  errorMsg: document.getElementById("errorMsg") as HTMLDivElement,
  previewArea: document.getElementById("previewArea") as HTMLDivElement,
  bgColorPicker: document.getElementById("bgColorPicker") as HTMLInputElement,
  bgColorText: document.getElementById("bgColorText") as HTMLInputElement,
  iconColorPicker: document.getElementById("iconColorPicker") as HTMLInputElement,
  iconColorText: document.getElementById("iconColorText") as HTMLInputElement,
  sizeSelect: document.getElementById("sizeSelect") as HTMLSelectElement,
  downloadSvgBtn: document.getElementById("downloadSvgBtn") as HTMLButtonElement,
  downloadJpgBtn: document.getElementById("downloadJpgBtn") as HTMLButtonElement,
};

export function getShape(): string {
  const checked = document.querySelector(
    'input[name="shape"]:checked'
  ) as HTMLInputElement;
  return checked.value;
}

export function getSize(): number {
  return Number(els.sizeSelect.value);
}
