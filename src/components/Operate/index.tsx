import { Layout } from 'antd'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/react/shallow'
import { OperateEnum } from '@/types/operate'
import { AppstoreOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import Shape from './components/Shape'
import Material from './components/Material'
import Color from './components/Color'
import { ShapeIcon, ColorIcon, TextIcon } from '@/assets/svg'
import Konva from 'konva'
import type { ShapeEnum } from '@/types/shape'
import type { AllColorsEnum } from '@/types/color'
import TextEdit from './components/TextEdit'
import ArrowLeftIcon from '~icons/ic/baseline-keyboard-arrow-left'

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
  handleAIChangeColor: (value: AllColorsEnum | null) => void
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
      OperateEnum.Text,
      {
        icon: <TextIcon className="text-2xl" />,
        component: <TextEdit />,
        name: '字体'
      }
    ]
  ])

  return (
    <div
      className={classNames(
        'relative bg-white flex items-start justify-between h-[calc(100vh-64px)]',
        [OperateType ? 'w-[308px]' : 'w-[64px]']
      )}
    >
      <div className="w-16 h-full">
        {Array.from(OperateMap.entries()).map(([key, value]) => (
          <div
            key={key}
            className={classNames(
              'border-b h-16 w-full border-gray-200 flex justify-center items-center cursor-pointer',
              {
                'bg-[#9f7aea]/20': OperateType === key
              }
            )}
            onClick={() => useCanvasStore.setState({ OperateType: key })}
          >
            <span>{value.icon}</span>
          </div>
        ))}
      </div>
      {OperateType && (
        <div className="w-[240px] h-full bg-white shadow relative p-1 overflow-auto scrollbar-hidden">
          <div className="text-lg px-1 font-bold">{OperateMap.get(OperateType)?.name}</div>
          {OperateMap.get(OperateType)?.component}
          {/* <div className="absolute top-1/2 right-0 translate-x-1/2 translate-y-1/2 border shadow rounded-full cursor-pointer hover:bg-[#9f7aea]/20 z-1000">
            <ArrowLeftIcon />
          </div> */}
        </div>
      )}
    </div>
  )
}

export default Option
