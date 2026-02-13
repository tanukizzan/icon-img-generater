import { els } from "../dom";
import { setState } from "../state";
import { parseSvg } from "../svg/parse";
import { showError, hideError } from "../ui/error";
import { setDownloadEnabled } from "../ui/download-buttons";
import { updatePreview } from "../ui/preview";

export async function fetchIcon(): Promise<void> {
  const name = els.iconNameInput.value.trim();
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
  els.previewBtn.textContent = "読み込み中...";

  try {
    const res = await fetch(`/api/icon-svg?name=${encodeURIComponent(name)}`);
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
    els.previewArea.innerHTML = `<span class="text-zinc-500 text-sm">アイコン名を入力してプレビュー</span>`;
  } finally {
    els.previewBtn.disabled = false;
    els.previewBtn.textContent = "プレビュー";
  }
}
