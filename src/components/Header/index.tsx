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
  initCanvas: () => void
}

const Header = (props: Props) => {
  const { addShape, handleStyleCSS, initCanvas } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClean = () => {
    setIsModalOpen(true)
  }

  return (
    <Layout.Header className="!bg-white border-b h-16 border-gray-300 gap-2 flex justify-center items-center">
      <IconStyle
        tooltip="下一步"
        icon={<UndoIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="上一步"
        icon={<RedoIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="加文字"
        onClick={() => addShape(ShapeEnum.Text)}
        icon={<TextIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="锁定"
        onClick={() => {
          // handleStyleCSS({
          //   draggable: false,
          //   listening: false
          // })
        }}
        icon={<LockIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="导出"
        icon={<ExportIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="清空画布"
        onClick={handleClean}
        icon={<TrashCanIcon className="text-xl text-slate-700" />}
      />
      <Modal
        title="清空画板"
        open={isModalOpen}
        centered
        onOk={() => {
          setIsModalOpen(false)
          initCanvas()
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>确定清空画板吗</p>
      </Modal>
    </Layout.Header>
  )
}

export default Header
