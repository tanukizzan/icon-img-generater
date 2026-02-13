export function colorizeInner(
  inner: string,
  color: string,
  isColoredIcon = false
): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
    "image/svg+xml"
  );
  const svgEl = doc.querySelector("svg")!;

  const shapes = svgEl.querySelectorAll(
    "path, circle, rect, polygon, polyline, ellipse, line, g"
  );
  shapes.forEach((el) => {
    const currentFill = el.getAttribute("fill");
    if (currentFill && currentFill !== "none") {
      if (!isColoredIcon || currentFill === "currentColor") {
        el.setAttribute("fill", color);
      }
    }

    const currentStroke = el.getAttribute("stroke");
    if (currentStroke && currentStroke !== "none") {
      if (!isColoredIcon || currentStroke === "currentColor") {
        el.setAttribute("stroke", color);
      }
    }
  });

  return svgEl.innerHTML;
}
