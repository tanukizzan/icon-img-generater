export type Shape = "square" | "circle" | "rounded";
export type Size = 256 | 512 | 1024;
export type PreviewMode = "fit" | "actual";

export interface ParsedSvg {
  viewBox: string;
  inner: string;
}

export interface AppState {
  iconSvgContent: string | null;
  iconViewBox: string;
  iconInner: string;
  previewMode: PreviewMode;
}
