import { Layout } from 'antd'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/react/shallow'
import { OperateEnum } from '@/types/operate'
import { AppstoreOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import Shape from './components/Shape'
import Font from './components/Font'
import Material from './components/Material'
import Color from './components/Color'
import { ShapeIcon, ColorIcon, TextIcon } from '@/assets/svg'
import Konva from 'konva'
import type { ShapeEnum } from '@/types/shape'
import type { AllColorsEnum } from '@/types/color'

interface OperateMapType {
  icon: ReactNode
  component: ReactNode
  name: string
}

interface Props {
  handleSvg: (data: string) => void
  handleImg: (url: string) => void
  handleSvgParser: (svgString: string) => void
  addShape: (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => void
  handleStyleCSS: (value: any) => void
  handleAIChangeColor: (value: AllColorsEnum) => void
  setCurrentColors: (value: string[]) => void
  currentColors: string[]
  handleReplaceColors: (value: string[]) => void
}

const Option = (props: Props) => {
  const {
    handleSvg,
    handleImg,
    handleSvgParser,
    addShape,
    handleStyleCSS,
    handleAIChangeColor,
    handleReplaceColors,
    setCurrentColors,
    currentColors
  } = props

  const { OperateType } = useCanvasStore(
    useShallow((state) => ({
      OperateType: state.OperateType
    }))
  )

  const OperateMap = new Map<OperateEnum, OperateMapType>([
    [
      OperateEnum.Material,
      {
        icon: <AppstoreOutlined className="text-2xl" />,
        component: (
          <Material
            handleSvg={handleSvg}
            handleImg={handleImg}
            handleSvgParser={handleSvgParser}
            addShape={addShape}
          />
        ),
        name: '素材'
      }
    ],
    [
      OperateEnum.Color,
      {
        icon: <ColorIcon className="text-2xl" />,
        component: (
          <Color
            handleStyleCSS={handleStyleCSS}
            handleAIChangeColor={handleAIChangeColor}
            handleReplaceColors={handleReplaceColors}
            setCurrentColors={setCurrentColors}
            currentColors={currentColors}
          />
        ),
        name: '颜色'
      }
    ],
    [
      OperateEnum.Shape,
      {
        icon: <ShapeIcon className="text-2xl" />,
        component: <Shape addShape={addShape} />,
        name: '形状'
      }
    ],
    [
      OperateEnum.Font,
      {
        icon: <TextIcon className="text-2xl" />,
        component: <Font />,
        name: '字体'
      }
    ]
  ])

  return (
    <Layout.Sider
      className="!bg-white relative "
      width={'64px'}
      theme="light"
    >
      {Array.from(OperateMap.entries()).map(([key, value]) => (
        <div
          key={key}
          className={classNames(
            'border-b h-16 w-full border-gray-200 flex justify-center items-center cursor-pointer hover:bg-blue-50',
            {
              'bg-blue-50': OperateType === key
            }
          )}
          onClick={() => useCanvasStore.setState({ OperateType: key })}
        >
          <span>{value.icon}</span>
        </div>
      ))}
      {OperateType && (
        <div className="absolute w-[240px] h-full bg-white shadow left-16 top-0 p-1 overflow-auto scrollbar-hidden">
          <div className="text-lg px-1 font-bold">{OperateMap.get(OperateType)?.name}</div>
          {OperateMap.get(OperateType)?.component}
        </div>
      )}
    </Layout.Sider>
  )
}

export default Option
