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
import { OperateModelEnum, OperateModelValue } from '@/types/operate'
import Export from './components/Export'
import type { ImgConfigType } from '@/types/export'
import { BrowserUtils } from '@/utils/browser'

interface Props {
  addShape: (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => void
  handleStyleCSS: (value: any) => void
  initCanvas: () => void
  handleExport: (config?: ImgConfigType) => Promise<string | undefined>
  undo: () => void
  redo: () => void
}

const Header = (props: Props) => {
  const { addShape, handleStyleCSS, initCanvas, handleExport, undo, redo } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [modelType, setModelType] = useState<OperateModelEnum | null>()

  const [imgPreview, setImgPreview] = useState('')

  const operateModelMap = new Map<OperateModelEnum, OperateModelValue>([
    [
      OperateModelEnum.Clean,
      {
        title: '清空画布',
        onOk: () => {
          initCanvas()
          setIsModalOpen(false)
        },
        components: <p>确定清空画板吗</p>
      }
    ],
    [
      OperateModelEnum.Export,
      {
        title: '导出图片',
        onOk: async () => {
          BrowserUtils.downloadFile(imgPreview, 'index')
          setIsModalOpen(false)
        },
        components: (
          <Export
            handleExport={handleExport}
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
          />
        )
      }
    ]
  ])

  return (
    <Layout.Header className="!bg-white border-b h-16 border-gray-300 gap-2 flex justify-center items-center">
      <IconStyle
        tooltip="下一步"
        icon={<UndoIcon className="text-xl text-slate-700" />}
        onClick={undo}
      />
      <IconStyle
        tooltip="上一步"
        icon={<RedoIcon className="text-xl text-slate-700" />}
        onClick={redo}
      />
      <IconStyle
        tooltip="加文字"
        onClick={() => addShape(ShapeEnum.Text)}
        icon={<TextIcon className="text-xl text-slate-700" />}
        className=""
      />
      <IconStyle
        tooltip="锁定"
        onClick={() => {
          handleStyleCSS({
            draggable: false,
            scale: false
          })
        }}
        icon={<LockIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="导出"
        onClick={() => {
          setIsModalOpen(true)
          setModelType(OperateModelEnum.Export)
        }}
        icon={<ExportIcon className="text-xl text-slate-700" />}
      />
      <IconStyle
        tooltip="清空画布"
        onClick={() => {
          setIsModalOpen(true)
          setModelType(OperateModelEnum.Clean)
        }}
        icon={<TrashCanIcon className="text-xl text-slate-700" />}
      />
      {modelType && (
        <Modal
          title={operateModelMap.get(modelType)?.title}
          open={isModalOpen}
          centered
          onOk={operateModelMap.get(modelType)?.onOk}
          onCancel={() => setIsModalOpen(false)}
        >
          {operateModelMap.get(modelType)?.components}
        </Modal>
      )}
    </Layout.Header>
  )
}

export default Header
