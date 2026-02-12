(() => {
  // DOM elements
  const iconNameInput = document.getElementById("iconNameInput") as HTMLInputElement;
  const previewBtn = document.getElementById("previewBtn") as HTMLButtonElement;
  const errorMsg = document.getElementById("errorMsg") as HTMLDivElement;
  const previewArea = document.getElementById("previewArea") as HTMLDivElement;
  const bgColorPicker = document.getElementById("bgColorPicker") as HTMLInputElement;
  const bgColorText = document.getElementById("bgColorText") as HTMLInputElement;
  const iconColorPicker = document.getElementById("iconColorPicker") as HTMLInputElement;
  const iconColorText = document.getElementById("iconColorText") as HTMLInputElement;
  const sizeSelect = document.getElementById("sizeSelect") as HTMLSelectElement;
  const downloadSvgBtn = document.getElementById("downloadSvgBtn") as HTMLButtonElement;
  const downloadJpgBtn = document.getElementById("downloadJpgBtn") as HTMLButtonElement;
  const previewModeFit = document.getElementById("previewModeFit") as HTMLButtonElement;
  const previewModeActual = document.getElementById("previewModeActual") as HTMLButtonElement;

  // State
  let iconSvgContent: string | null = null;
  let iconViewBox = "0 0 24 24";
  let iconInner = "";
  let previewMode: "fit" | "actual" = "fit";

  // Helpers
  function getShape(): string {
    const checked = document.querySelector('input[name="shape"]:checked') as HTMLInputElement;
    return checked.value;
  }

  function getSize(): number {
    return Number(sizeSelect.value);
  }

  function showError(msg: string): void {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("hidden");
  }

  function hideError(): void {
    errorMsg.classList.add("hidden");
  }

  function setDownloadEnabled(enabled: boolean): void {
    downloadSvgBtn.disabled = !enabled;
    downloadJpgBtn.disabled = !enabled;
  }

  function updatePreviewModeUI(): void {
    if (previewMode === "fit") {
      previewModeFit.className = "px-3 py-1.5 rounded-l-md bg-zinc-800 text-zinc-100 transition-colors";
      previewModeActual.className = "px-3 py-1.5 rounded-r-md text-zinc-400 hover:text-zinc-200 transition-colors";
    } else {
      previewModeFit.className = "px-3 py-1.5 rounded-l-md text-zinc-400 hover:text-zinc-200 transition-colors";
      previewModeActual.className = "px-3 py-1.5 rounded-r-md bg-zinc-800 text-zinc-100 transition-colors";
    }
  }

  // Parse SVG to extract viewBox and inner content
  function parseSvg(svgText: string): { viewBox: string; inner: string } | null {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svgEl = doc.querySelector("svg");
    if (!svgEl) return null;

    const vb = svgEl.getAttribute("viewBox") || "0 0 24 24";
    const inner = svgEl.innerHTML;
    return { viewBox: vb, inner };
  }

  // Apply icon color to SVG inner content
  function colorizeInner(inner: string, color: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
      "image/svg+xml"
    );
    const svgEl = doc.querySelector("svg")!;

    const shapes = svgEl.querySelectorAll("path, circle, rect, polygon, polyline, ellipse, line, g");
    shapes.forEach((el) => {
      const currentFill = el.getAttribute("fill");
      if (currentFill !== "none") {
        el.setAttribute("fill", color);
      }
      const currentStroke = el.getAttribute("stroke");
      if (currentStroke && currentStroke !== "none") {
        el.setAttribute("stroke", color);
      }
    });

    return svgEl.innerHTML;
  }

  // Build composite SVG
  function buildCompositeSvg(): string | null {
    if (!iconInner) return null;

    const size = getSize();
    const shape = getShape();
    const bgColor = bgColorPicker.value;
    const iconColor = iconColorPicker.value;

    const iconSize = size * 0.6;
    const offset = (size - iconSize) / 2;

    let bgShape = "";
    switch (shape) {
      case "square":
        bgShape = `<rect width="${size}" height="${size}" fill="${bgColor}" />`;
        break;
      case "circle":
        bgShape = `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bgColor}" />`;
        break;
      case "rounded":
        bgShape = `<rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${bgColor}" />`;
        break;
    }

    const coloredInner = colorizeInner(iconInner, iconColor);

    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
      bgShape,
      `<svg x="${offset}" y="${offset}" width="${iconSize}" height="${iconSize}" viewBox="${iconViewBox}">`,
      coloredInner,
      `</svg>`,
      `</svg>`,
    ].join("");
  }

  // Update preview
  function updatePreview(): void {
    if (!iconInner) return;

    const svg = buildCompositeSvg();
    if (!svg) return;

    previewArea.innerHTML = svg;
    const svgEl = previewArea.querySelector("svg");
    if (svgEl) {
      if (previewMode === "fit") {
        svgEl.style.width = "100%";
        svgEl.style.height = "100%";
        previewArea.classList.add("items-center", "justify-center");
        previewArea.classList.remove("items-start", "justify-start");
      } else {
        const size = getSize();
        svgEl.style.width = `${size}px`;
        svgEl.style.height = `${size}px`;
        svgEl.style.minWidth = `${size}px`;
        svgEl.style.minHeight = `${size}px`;
        previewArea.classList.remove("items-center", "justify-center");
        previewArea.classList.add("items-start", "justify-start");
      }
    }
  }

  // Fetch icon from API
  async function fetchIcon(): Promise<void> {
    const name = iconNameInput.value.trim();
    if (!name) {
      showError("アイコン名を入力してください");
      return;
    }

    if (!name.includes(":")) {
      showError("アイコン名は prefix:name 形式で入力してください（例: mdi:home）");
      return;
    }

    hideError();
    previewBtn.disabled = true;
    previewBtn.textContent = "読み込み中...";

    try {
      const res = await fetch(`/api/icon-svg?name=${encodeURIComponent(name)}`);
      if (!res.ok) {
        const data: { error?: string } | null = await res.json().catch(() => null);
        throw new Error(data?.error || "アイコンの取得に失敗しました");
      }

      const svgText = await res.text();
      iconSvgContent = svgText;

      const parsed = parseSvg(svgText);
      if (!parsed) {
        throw new Error("SVGの解析に失敗しました");
      }

      iconViewBox = parsed.viewBox;
      iconInner = parsed.inner;

      setDownloadEnabled(true);
      updatePreview();
    } catch (err) {
      showError((err as Error).message);
      iconSvgContent = null;
      iconInner = "";
      setDownloadEnabled(false);
      previewArea.innerHTML = `<span class="text-zinc-500 text-sm">アイコン名を入力してプレビュー</span>`;
    } finally {
      previewBtn.disabled = false;
      previewBtn.textContent = "プレビュー";
    }
  }

  // Download helpers
  function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadSvg(): void {
    const svg = buildCompositeSvg();
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const name = iconNameInput.value.trim().replace(":", "-") || "icon";
    downloadBlob(blob, `${name}.svg`);
  }

  function downloadJpg(): void {
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

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, size, size);

      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (jpgBlob) => {
          if (!jpgBlob) return;
          const name = iconNameInput.value.trim().replace(":", "-") || "icon";
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

  // Event listeners
  previewBtn.addEventListener("click", fetchIcon);

  iconNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchIcon();
  });

  // Color pickers sync
  bgColorPicker.addEventListener("input", () => {
    bgColorText.value = bgColorPicker.value.toUpperCase();
    updatePreview();
  });
  bgColorText.addEventListener("change", () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(bgColorText.value)) {
      bgColorPicker.value = bgColorText.value;
      updatePreview();
    }
  });
  iconColorPicker.addEventListener("input", () => {
    iconColorText.value = iconColorPicker.value.toUpperCase();
    updatePreview();
  });
  iconColorText.addEventListener("change", () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(iconColorText.value)) {
      iconColorPicker.value = iconColorText.value;
      updatePreview();
    }
  });

  // Shape change
  document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener("change", updatePreview);
  });

  // Size change
  sizeSelect.addEventListener("change", updatePreview);

  // Preview mode toggle
  previewModeFit.addEventListener("click", () => {
    previewMode = "fit";
    updatePreviewModeUI();
    updatePreview();
  });

  previewModeActual.addEventListener("click", () => {
    previewMode = "actual";
    updatePreviewModeUI();
    updatePreview();
  });

  // Download buttons
  downloadSvgBtn.addEventListener("click", downloadSvg);
  downloadJpgBtn.addEventListener("click", downloadJpg);
})();
