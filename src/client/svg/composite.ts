import { colorizeInner } from "./colorize";
import { getState } from "../state";
import { els, getShape, getSize } from "../dom";

export function buildCompositeSvg(): string | null {
  const { iconInner, iconViewBox, isColoredIcon } = getState();
  if (!iconInner) return null;

  const size = getSize();
  const shape = getShape();
  const bgColor = els.bgColorPicker.value;
  const iconColor = els.iconColorPicker.value;

  const iconSize = size * 0.6;
  const offset = (size - iconSize) / 2;

  const cornerRadiusPercentage = getShape();
  const radius = size * (cornerRadiusPercentage / 100);
  const bgShape = `<rect width="${size}" height="${size}" rx="${radius}" fill="${bgColor}" />`;

  const coloredInner = colorizeInner(iconInner, iconColor, isColoredIcon);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    bgShape,
    `<svg x="${offset}" y="${offset}" width="${iconSize}" height="${iconSize}" viewBox="${iconViewBox}">`,
    coloredInner,
    `</svg>`,
    `</svg>`,
  ].join("");
}
