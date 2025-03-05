import LineIcon from '~icons/ic/outline-horizontal-rule'
import StraightArrowIcon from '~icons/ic/baseline-north'
import DoubleArrowIcon from '~icons/ic/outline-height'
import CircleIcon from '~icons/ic/outline-circle'
import TriangleIcon from '~icons/mdi/triangle-outline'
import EllipseIcon from '~icons/mdi/ellipse-outline'
import ConeIcon from '~icons/mdi/cone'
import RectangleIcon from '~icons/mdi/rectangle-outline'
import ParallelogramIcon from '~icons/ph/parallelogram-bold'
import TrapezoidIcon from '~icons/icon-park-outline/trapezoid'
import RhombusIcon from '~icons/mdi/rhombus-outline'
import RoundedRectangleIcon from '~icons/tabler/rectangle'
import CurveIcon from '~icons/fad/softclipcurve'
import { ShapeEnum } from '@/types/shape'
import type Konva from 'konva'
import DraggableComponent from '@/components/Common/Drag'

const ShapeArr = [
  {
    icon: <LineIcon />,
    tooltip: '直线',
    type: ShapeEnum.Line
  },
  {
    icon: <StraightArrowIcon />,
    tooltip: '直线箭头',
    type: ShapeEnum.Line
  },
  {
    icon: <DoubleArrowIcon />,
    tooltip: '双向箭头',
    type: ShapeEnum.Line
  },
  {
    icon: <CurveIcon />,
    tooltip: '曲线',
    type: ShapeEnum.Line
  },
  {
    icon: <LineIcon />,
    tooltip: '双箭头空心',
    type: ShapeEnum.Line
  },
  {
    icon: <LineIcon />,
    tooltip: '空心单箭头',
    type: ShapeEnum.Line
  },
  {
    icon: <EllipseIcon />,
    tooltip: '椭圆',
    type: ShapeEnum.Ellipse
  },
  {
    icon: <CircleIcon />,
    tooltip: '圆',
    type: ShapeEnum.Circle
  },
  {
    icon: <ConeIcon />,
    tooltip: '圆锥',
    type: ShapeEnum.Circle
  },
  {
    icon: <RectangleIcon />,
    tooltip: '矩形',
    type: ShapeEnum.Rect
  },
  {
    icon: <RoundedRectangleIcon />,
    tooltip: '圆角矩形',
    type: ShapeEnum.Rect
  },
  {
    icon: <ParallelogramIcon />,
    tooltip: '平行四边形',
    type: ShapeEnum.Rect
  },
  {
    icon: <TrapezoidIcon />,
    tooltip: '梯形',
    type: ShapeEnum.Rect
  },
  {
    icon: <TriangleIcon />,
    tooltip: '三角形',
    type: ShapeEnum.Rect
  },
  {
    icon: <RhombusIcon />,
    tooltip: '菱形',
    type: ShapeEnum.Rect
  }
]

interface Props {
  addShape: (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => void
}

const Shape = (props: Props) => {
  const { addShape } = props

  return (
    <div className="grid  p-2 grid-cols-4  gap-4">
      {ShapeArr.map((item, index) => (
        <DraggableComponent
          shape={item.type}
          key={index}
        >
          <CommonIcon
            {...item}
            key={index}
            onClick={() => addShape(item.type)}
          />
        </DraggableComponent>
      ))}
    </div>
  )
}

export default Shape
