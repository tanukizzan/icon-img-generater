import { buildCompositeSvg } from "../svg/composite";
import { downloadBlob } from "./blob";
import { els, getSize } from "../dom";
import { showError } from "../ui/error";

export function downloadJpg(): void {
  const svg = buildCompositeSvg();
  if (!svg) return;

  const size = getSize();
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.fillRect(0, 0, size, size);

    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(url);

    canvas.toBlob(
      (jpgBlob) => {
        if (!jpgBlob) return;
        const name = els.iconNameInput.value.trim().replace(":", "-") || "icon";
        downloadBlob(jpgBlob, `${name}.jpg`);
      },
      "image/jpeg",
      0.95
    );
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    showError("JPG画像の生成に失敗しました");
  };

  img.src = url;
}
