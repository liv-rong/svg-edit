export enum OperateEnum {
  Color = 'color',
  Shape = 'shape',
  Font = 'font',
  Material = 'material'
}

export interface ElementDataType {
  tagName: string
  [key: string]: string
}
