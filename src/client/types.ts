export type Shape = number;
export type Size = 256 | 512 | 1024;
export type PreviewMode = "fit" | "actual";

export interface ParsedSvg {
  viewBox: string;
  inner: string;
  isColored: boolean;
}

export interface AppState {
  iconSvgContent: string | null;
  iconViewBox: string;
  iconInner: string;
  isColoredIcon: boolean;
  previewMode: PreviewMode;
}
