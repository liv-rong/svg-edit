import type { Stage } from 'konva/lib/Stage'

export class ImgUtils {
  /**
   * 尝试加载图片 并转换为 base64 格式
   * @param {string} url - 要加载的图片 URL
   * @returns {Promise<boolean>} - 如果图片能够成功加载,返回 true,否则返回 false
   */
  static async loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL())
      }
      img.onerror = () => reject(false)
    })
  }

  /**
   * 检查文件扩展名是否为常见的图片格式
   * @param {string} extension - 文件扩展名
   * @returns {boolean} - 如果扩展名为有效的图片格式,返回 true,否则返回 false
   */
  static isValidImageExtension(extension: string): boolean {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    for (const item of validExtensions) {
      if (extension.includes(item)) {
        return true
      }
    }
    return false
  }

  /**
   * 根据svg字符串 计算图片的宽高
   */
  static getSvgDimensions(svgString: string): Promise<any> {
    //debugger
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = (err) => {
        reject(err)
      }
      img.src = svgString
    })
  }
  /**
   * 根据是否超出画布 计算缩放比例
   */
  static getScaleRatio({ width, height }: any, canvasSize: { width: number; height: number }) {
    let scaleRatio: number
    const { width: canvasWidth, height: canvasHeight } = canvasSize
    if (width > canvasWidth || height > canvasHeight) {
      const widthRatio = canvasWidth / width
      const heightRatio = canvasHeight / height
      scaleRatio = Math.min(widthRatio, heightRatio)
    } else {
      scaleRatio = 1
    }

    return scaleRatio
  }

  // static handleExport = (stage: Stage) => {}
}
