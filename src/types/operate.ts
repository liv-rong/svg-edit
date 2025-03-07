import type { ReactNode } from '@tanstack/react-router'

export enum OperateEnum {
  Color = 'color',
  Shape = 'shape',
  Text = 'text',
  Material = 'material'
}

export enum OperateModelEnum {
  Text = 'text',
  Export = 'export',
  Clean = 'clean'
}

export interface OperateModelValue {
  title: string
  onClick?: () => void
  onOk?: () => void
  components?: ReactNode
}

export interface ElementDataType {
  tagName: string
  [key: string]: string
}
