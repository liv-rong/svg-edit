export interface ImgConfigType {
  x?: number
  y?: number
  width?: number
  height?: number
  pixelRatio?: number
  mimeType?: string
  quality?: number
  callback?: (str: string) => void
}
