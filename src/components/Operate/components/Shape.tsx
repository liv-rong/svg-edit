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

const ShapeArr = [
  {
    icon: <LineIcon />,
    tooltip: '直线',
    type: 'Line'
  },
  {
    icon: <StraightArrowIcon />,
    tooltip: '直线箭头',
    type: 'StraightLine'
  },
  {
    icon: <DoubleArrowIcon />,
    tooltip: '双向箭头',
    type: 'DoubleArrow'
  },
  {
    icon: <CurveIcon />,
    tooltip: '曲线',
    type: 'Curve'
  },
  {
    icon: <LineIcon />,
    tooltip: '双箭头空心',
    type: 'StraightLine'
  },
  {
    icon: <LineIcon />,
    tooltip: '空心单箭头',
    type: 'StraightLine'
  },
  {
    icon: <EllipseIcon />,
    tooltip: '椭圆',
    type: 'EllipseIcon'
  },
  {
    icon: <CircleIcon />,
    tooltip: '圆',
    type: 'Circle'
  },
  {
    icon: <ConeIcon />,
    tooltip: '圆锥',
    type: 'Cone'
  },
  {
    icon: <RectangleIcon />,
    tooltip: '矩形',
    type: 'Rectangle'
  },
  {
    icon: <RoundedRectangleIcon />,
    tooltip: '圆角矩形',
    type: 'RoundedRectangle'
  },
  {
    icon: <ParallelogramIcon />,
    tooltip: '平行四边形',
    type: 'Parallelogram'
  },
  {
    icon: <TrapezoidIcon />,
    tooltip: '梯形',
    type: 'Trapezoid'
  },
  {
    icon: <TriangleIcon />,
    tooltip: '三角形',
    type: 'Triangle'
  },
  {
    icon: <RhombusIcon />,
    tooltip: '菱形',
    type: 'Rhombus'
  }
]

interface Props {
  addShape: (value: string) => void
}

const Shape = (props: Props) => {
  const { addShape } = props

  return (
    <div className="grid  p-2 grid-cols-4  gap-4">
      {ShapeArr.map((item, index) => (
        <>
          <CommonIcon
            {...item}
            key={index}
            onClick={() => addShape(item.type)}
          />
        </>
      ))}
    </div>
  )
}

export default Shape
