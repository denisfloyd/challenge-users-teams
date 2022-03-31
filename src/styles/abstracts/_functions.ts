export function convertPixelToREM(size: number, base = 16): string {
  return `${Math.abs(size / base)}rem`;
}
