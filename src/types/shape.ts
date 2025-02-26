import Konva from 'konva'

export enum ShapeEnum {
  Circle = 'Circle',
  Rect = 'Rect',
  Ellipse = 'Ellipse',
  Wedge = 'Wedge',
  Line = 'Line',
  Image = 'Image',
  Text = 'Text',
  TextPath = 'TextPath',
  Star = 'Star',
  Ring = 'Ring',
  Arc = 'Arc',
  Label = 'Label',
  Path = 'Path',
  RegularPolygon = 'RegularPolygon',
  Arrow = 'Arrow',
  Shape = 'Shape'
}

export const baseShapeConfig = {
  x: 20,
  y: 20,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 2,
  name: 'transformerShape',
  draggable: true
}

interface ShapeType<T extends Konva.ShapeConfig = Konva.ShapeConfig> {
  defaultConfig: Partial<T>
  constructor: new (config: T) => Konva.Shape
}

export const ShapeMap = new Map<ShapeEnum, ShapeType<any>>([
  [
    ShapeEnum.Rect,
    {
      defaultConfig: { width: 100, height: 50, fill: 'white', stroke: 'black', strokeWidth: 2 },
      constructor: Konva.Rect
    }
  ],
  [
    ShapeEnum.Circle,
    {
      defaultConfig: { radius: 70, fill: 'white', stroke: 'black', strokeWidth: 2 },
      constructor: Konva.Circle
    }
  ],
  [
    ShapeEnum.Ellipse,
    {
      defaultConfig: { radiusX: 100, radiusY: 50, fill: 'white', stroke: 'black', strokeWidth: 2 },
      constructor: Konva.Ellipse
    }
  ],
  [
    ShapeEnum.Wedge,
    {
      defaultConfig: {
        radius: 70,
        angle: 60,
        rotation: -120,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      },
      constructor: Konva.Wedge
    }
  ],
  [
    ShapeEnum.Line,
    {
      defaultConfig: {
        points: [5, 70, 140, 23, 250, 60, 300, 20],
        stroke: 'black',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
      },
      constructor: Konva.Line
    }
  ],
  [
    ShapeEnum.Text,
    {
      defaultConfig: { text: 'Simple Text', fontSize: 30, fill: 'black' },
      constructor: Konva.Text
    }
  ]
])
