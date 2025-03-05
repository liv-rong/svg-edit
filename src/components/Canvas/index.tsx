import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'
import { useDrop } from 'react-dnd'
import { DragDropData } from '@/constants/dragDrop'
import { useEffect } from 'react'
import {
  immune1,
  immune2,
  immune3,
  immune4,
  immune5,
  immune6,
  immune7,
  immune8,
  immune9,
  immune10,
  immune11,
  immune12,
  immune13
} from '@/assets/svg/svg9'

interface Props {
  handleSvg: (data: string) => void
}

const Canvas = (props: Props) => {
  const { handleSvg } = props

  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [collectedProps, drop] = useDrop(() => ({
    accept: DragDropData.type,
    drop: async (item: { id: string }) => {
      console.log('11111111111111', item)
      await handleSvg(immune1())
    }
  }))

  const { initCanvas } = useCanvas()

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
