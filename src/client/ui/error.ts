import { els } from "../dom";

export function showError(msg: string): void {
  els.errorMsg.textContent = msg;
  els.errorMsg.classList.remove("hidden");
}

export function hideError(): void {
  els.errorMsg.classList.add("hidden");
}
