import type { ShapeEnum } from '@/types/shape'

export const DragDropData = Object.freeze({
  type: 'SVG-TYPE'
})

export interface DragDropDataType {
  svg?: string
  shape?: ShapeEnum
}

export interface AddItemDropType {
  x: number
  y: number
  value: string
  type: 'svg' | 'shape'
}
