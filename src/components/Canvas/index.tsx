import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'

const Canvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const { initCanvas } = useCanvas()

  useEffect(() => {
    initCanvas()
    return () => {}
  }, [])

  return (
    <div
      id="container"
      className="bg-white"
    ></div>
  )
}

export default Canvas
