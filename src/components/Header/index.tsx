import { Layout } from 'antd'
import TextIcon from '~icons/mdi/format-text'
import UndoIcon from '~icons/mdi/undo'
import RedoIcon from '~icons/mdi/redo'
import LockIcon from '~icons/mdi/lock-outline'
import ExportIcon from '~icons/mdi/arrow-expand-up'
import TrashCanIcon from '~icons/mdi/trash-can-outline'
import IconStyle from './components/IconStyle'
import { ShapeEnum } from '@/types/shape'
import type Konva from 'konva'

interface Props {
  addShape: (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => void
  handleStyleCSS: (value: any) => void
  clearCanvas: () => void
}

const Header = (props: Props) => {
  const { addShape, handleStyleCSS, clearCanvas } = props
  return (
    <Layout.Header className="!bg-white border-b h-16 border-gray-300 gap-2 flex justify-center items-center">
      <IconStyle
        tooltip="下一步"
        icon={<UndoIcon className="text-2xl text-slate-700" />}
      />
      <IconStyle
        tooltip="上一步"
        icon={<RedoIcon className="text-2xl text-slate-700" />}
      />
      <IconStyle
        tooltip="加文字"
        onClick={() => addShape(ShapeEnum.Text)}
        icon={<TextIcon className="text-3xl text-slate-700" />}
      />
      <IconStyle
        tooltip="锁定"
        onClick={() => {
          // handleStyleCSS({
          //   draggable: false,
          //   listening: false
          // })
        }}
        icon={<LockIcon className="text-2xl text-slate-700" />}
      />
      <IconStyle
        tooltip="导出"
        icon={<ExportIcon className="text-2xl text-slate-700" />}
      />
      <IconStyle
        tooltip="清空画布"
        onClick={clearCanvas}
        icon={<TrashCanIcon className="text-2xl text-slate-700" />}
      />
    </Layout.Header>
  )
}

export default Header
