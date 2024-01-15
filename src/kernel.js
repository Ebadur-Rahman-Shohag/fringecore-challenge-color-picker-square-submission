export const kernelFunction = function (width, height, hue) {
  const imageSize = width * height;
  const imageDataLength = imageSize * 4;
  const i = this.thread.x;

  const y = Math.floor(i / (width * 4)); // Adjusted calculation for y
  const x = Math.floor((i / 4) % width); // Adjusted calculation for x
  const channel = i % 4;
  // Calculate normalized values for position and hue
  const normalizedX = x / width;
  const normalizedY = y / height;
  const normalizedHue = hue;

  // Calculate fade, saturation, lightness, and alpha based on the given conditions
  const fade = 1 - normalizedX; // more fade towards left
  const saturation = normalizedX; // more saturation towards right
  const lightness = (1 - normalizedY)/2; // lighter towards top
  const darkness = normalizedY*2; // darker towards bottom
  const alpha = 1;

  // Calculate color values based on the channel
  let colorValue;
  if (channel === 0) {
    return (colorValue =
      fade * 255 * (1 - saturation) + normalizedHue * 255 * saturation);
  } else if (channel === 1) {
    return (colorValue =
      fade * 255 * (1 - saturation) + (1 - normalizedHue) * 255 * saturation);
  } else if (channel === 2) {
    return (colorValue =
      fade * 255 * (1 - saturation) + normalizedHue * 100 * saturation);
  } else if (channel === 3) {
    return (colorValue = alpha * 255) * 1 - darkness* lightness;
  }
  colorValue *= (fade * (1 - saturation) + saturation) * (1 - darkness);
  return colorValue;
};
