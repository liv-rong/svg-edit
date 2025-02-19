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

interface OperateMapType {
  icon: ReactNode
  component: ReactNode
  name: string
}

interface Props {
  handleSvg: (data: string) => void
  handleImg: (url: string) => void
}

const Option = (props: Props) => {
  const { handleSvg, handleImg } = props

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
          />
        ),
        name: '素材'
      }
    ],
    [
      OperateEnum.Color,
      {
        icon: <ColorIcon className="text-2xl" />,
        component: <Color />,
        name: '颜色'
      }
    ],
    [
      OperateEnum.Shape,
      {
        icon: <ShapeIcon className="text-2xl" />,
        component: <Shape />,
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
      className="!bg-white relative"
      width={'64px'}
    >
      {Array.from(OperateMap.entries()).map(([key, value]) => (
        <div
          key={key}
          className={classNames(
            'border-b h-16 w-full border-gray-200 flex justify-center items-center cursor-pointer hover:bg-gray-300',
            {
              'bg-gray-100': OperateType === key
            }
          )}
          onClick={() => useCanvasStore.setState({ OperateType: key })}
        >
          <span>{value.icon}</span>
        </div>
      ))}

      {OperateType && (
        <div className="absolute w-[200px] h-full bg-gray-300 left-16 top-0  p-1">
          <div className="text-base"> {OperateMap.get(OperateType)?.name}</div>
          {OperateMap.get(OperateType)?.component}
        </div>
      )}
    </Layout.Sider>
  )
}

export default Option
