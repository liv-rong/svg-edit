export enum OperateEnum {
  Color = 'color',
  Shape = 'shape',
  Text = 'text',
  Material = 'material'
}

export interface ElementDataType {
  tagName: string
  [key: string]: string
}
