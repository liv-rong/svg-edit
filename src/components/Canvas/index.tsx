import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'
import { useDrop } from 'react-dnd'
import { DragDropData } from '@/types/dragDrop'
import { useEffect } from 'react'

interface Props {
  handleSvg: (data: string) => void
}

const Canvas = (props: Props) => {
  const { handleSvg } = props

  const [current, setCurrent] = useState<string>('')

  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [collectedProps, drop] = useDrop(() => ({
    accept: DragDropData.type,
    drop: async (item: { id: string }) => {
      console.log('11111111111111', item)
      setCurrent(item.id)
    }
  }))

  const { initCanvas } = useCanvas()

  useEffect(() => {
    handleSvg(current)
  }, [current])

  useEffect(() => {
    initCanvas()
    return () => {}
  }, [])

  return (
    <div
      id="container"
      ref={drop}
      className="bg-white"
      {...(collectedProps || {})}
    ></div>
  )
}

export default Canvas
