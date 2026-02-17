import { els } from "../dom";
import { setState } from "../state";
import { parseSvg } from "../svg/parse";
import { showError, hideError } from "../ui/error";
import { setDownloadEnabled } from "../ui/download-buttons";
import { updatePreview } from "../ui/preview";

type Bindings = {
  BASE_PATH: string
}

export async function fetchIcon(env?: Bindings): Promise<void> {
  const name = els.iconNameInput.value.trim();
  const basePath = env?.BASE_PATH ?? window.__BASE_PATH__ ?? "";

  if (!name) {
    showError("アイコン名を入力してください");
    return;
  }

  if (!name.includes(":")) {
    showError("アイコン名は prefix:name 形式で入力してください（例: mdi:home）");
    return;
  }

  hideError();
  els.previewBtn.disabled = true;

  try {
    const res = await fetch(`${basePath}/api/icon-svg?name=${encodeURIComponent(name)}`);
    if (!res.ok) {
      const data: { error?: string } | null = await res.json().catch(() => null);
      throw new Error(data?.error || "アイコンの取得に失敗しました");
    }

    const svgText = await res.text();
    const parsed = parseSvg(svgText);
    if (!parsed) {
      throw new Error("SVGの解析に失敗しました");
    }

    setState({
      iconSvgContent: svgText,
      iconViewBox: parsed.viewBox,
      iconInner: parsed.inner,
      isColoredIcon: parsed.isColored,
    });

    setDownloadEnabled(true);
    updatePreview();
  } catch (err) {
    showError((err as Error).message);
    setState({
      iconSvgContent: null,
      iconInner: "",
    });
    setDownloadEnabled(false);
    els.previewArea.innerHTML = `<span class="text-zinc-500 text-sm">プレビュー</span>`;
  } finally {
    els.previewBtn.disabled = false;
  }
}
