import Konva from 'konva'
import { ShapeEnum, ShapeMap, baseShapeConfig } from '@/types/shape'

export class CanvasUtils {
  static createShape(type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) {
    const shapeType = ShapeMap.get(type)
    if (!shapeType) {
      return
    }

    const { constructor, defaultConfig } = shapeType
    return new constructor({ ...baseShapeConfig, ...defaultConfig, ...customConfig })
  }
}
