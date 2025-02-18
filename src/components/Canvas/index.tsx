import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'

const Canvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  useEffect(() => {
    // const stage = new Konva.Stage({
    //   container: 'container', // id of container <div>
    //   width: 600,
    //   height: 800,
    //   color: 'red',
    //   backgroundColor: 'blue'
    // })

    var json =
      '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}'

    var stage = Konva.Node.create(json, 'container')

    // anim.start()

    // Cleanup function
    return () => {
      stage.destroy()
    }
  }, [])

  return (
    <div
      id="container"
      className="bg-white w-[600px] h-[800px]"
    ></div>
  )
}

export default Canvas
