export const SET_COLOR_FILTER = 'SET_COLOR_FILTER';
export const setColorFilter = colorHex => {
  return {
    type: 'SET_COLOR_FILTER',
    color: colorHex
  }
}
