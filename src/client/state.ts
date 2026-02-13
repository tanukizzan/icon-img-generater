import type { AppState } from "./types";

type Listener = () => void;

const state: AppState = {
  iconSvgContent: null,
  iconViewBox: "0 0 24 24",
  iconInner: "",
  isColoredIcon: false,
  previewMode: "fit",
};

const listeners: Listener[] = [];

export function getState(): Readonly<AppState> {
  return state;
}

export function setState(partial: Partial<AppState>): void {
  Object.assign(state, partial);
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: Listener): void {
  listeners.push(fn);
}
