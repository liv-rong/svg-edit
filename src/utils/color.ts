import tinycolor from 'tinycolor2'

export class ColorUtils {
  static rgbToHex = (rgb: string | null): string | null => {
    if (!rgb) {
      return null
    }
    if (rgb.startsWith('rgb')) {
      return tinycolor(rgb).toHex().toLowerCase()
    }
    if (rgb.length === 4 && rgb.startsWith('#')) {
      return `#${rgb[1]}${rgb[1]}${rgb[2]}${rgb[2]}${rgb[3]}${rgb[3]}`
    }
    return rgb.toLowerCase()
  }
}
