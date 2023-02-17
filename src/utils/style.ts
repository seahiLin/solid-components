
export const px2vw = (px: number) => {
  return `${(px / 375 * 100).toFixed(3)}vw`
}