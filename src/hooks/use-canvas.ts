import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'

export const useCanvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )
  const initCanvas = () => {
    const stage = new Konva.Stage({
      container: 'container', // id of container <div>
      width: 600,
      height: 800,
      color: 'red',
      backgroundColor: 'blue'
    })

    const layer = new Konva.Layer()
  }

  useEffect(() => {}, [canvasData])

  return {
    initCanvas
  }
}
