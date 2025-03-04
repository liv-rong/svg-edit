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

  // 生成与原始颜色组相似的主题色调的函数
  static generateThemeColors = (originalColors: string[], themeColor: string): string[] => {
    const theme = new tinycolor(themeColor)
    const themeHSL = theme.toHsl() // 获取主题色的 HSL 值
    return originalColors.map((color) => {
      const original = new tinycolor(color)
      const originalHSL = original.toHsl() // 获取原始颜色的 HSL 值

      // 使用原始颜色的亮度和饱和度，结合主题色的色相
      const newColor = tinycolor({
        h: themeHSL.h,
        s: originalHSL.s, // 保持原始颜色的饱和度
        l: originalHSL.l // 保持原始颜色的亮度
      })

      return newColor.toHexString() // 转换为十六进制字符串
    })
  }

  /**
   * 获取svg字符串中所有的颜色 不仅要匹配#开头的颜色值 还要匹配rgb()格式的颜色值
   * 把rgb的转为#  用tinycolor2库
   *  如果色彩是#简写的三个字符，要转为六个字符
   * @description 获取svg字符串中所有的颜色
   * @param {string} svg
   * @returns {string[]}
   */
  static getColorsFromSvg = (svg: string): string[] => {
    const colorSet = new Set<string>()
    const colorRegex = /#([0-9a-fA-F]{3,6})|rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/g
    let match

    while ((match = colorRegex.exec(svg)) !== null) {
      if (match[0].startsWith('#')) {
        let color = match[0].toLowerCase()
        if (color.length === 4) {
          color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        }
        colorSet.add(color)
      } else if (match[0].startsWith('rgb')) {
        const hexColor = tinycolor(match[0]).toHexString().toLowerCase()
        colorSet.add(hexColor)
      }
    }

    return Array.from(colorSet)
  }

  /**
   * 首先将svg中所有的颜色 替换出来 如果是rgb 就转换成 #开头的颜色  如果是#简写的三个字符，要转为六个字符
   * 返回替换后字符串
   * @param {string} svg
   * @returns {string} svg
   */
  static replaceColorsInSvg = (svg: string): string => {
    const colorRegex = /#([0-9a-fA-F]{3,6})|rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/g
    return svg.replace(colorRegex, (match) => {
      if (match.startsWith('#')) {
        if (match.length === 4) {
          return `#${match[1]}${match[1]}${match[2]}${match[2]}${match[3]}${match[3]}`
        }
        return match.toLowerCase()
      } else if (match.startsWith('rgb')) {
        return tinycolor(match).toHexString().toLowerCase()
      }
      return match
    })
  }

  /**
   * 首先获取svg中所有的颜色 再生成替换的颜色 然后根据替换的颜色 替换svg中的颜色
   * @param {string} svg
   * @param {string} themeColor
   * @returns {string} svg
   */
  static applyThemeToSvg = (svg: string, themeColor: string): string => {
    const originalColors = ColorUtils.getColorsFromSvg(svg)
    const themeColors = ColorUtils.generateThemeColors(originalColors, themeColor)

    let themedSvg = svg
    originalColors.forEach((color, index) => {
      const regex = new RegExp(color, 'g')
      themedSvg = themedSvg.replace(regex, themeColors[index])
    })

    return themedSvg
  }
}
