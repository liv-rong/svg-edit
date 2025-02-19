import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import type { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'

export const useCanvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [stage, setState] = useState<Stage>()

  const [layer, setLayer] = useState<Layer>()

  const initCanvas = () => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 600,
      height: 800
    })
    setState(stage)

    const layer = new Konva.Layer()
    setLayer(layer)
    stage.add(layer)

    var rect1 = new Konva.Rect({
      x: 60,
      y: 60,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      draggable: true
    })
    layer.add(rect1)

    var rect2 = new Konva.Rect({
      x: 250,
      y: 100,
      width: 150,
      height: 90,
      fill: 'green',
      name: 'rect',
      draggable: true
    })
    layer.add(rect2)

    const tr = new Konva.Transformer({
      borderStroke: 'blue'
    })

    layer.add(tr)

    tr.nodes([rect1, rect2])

    const selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.1)',
      visible: false,
      listening: false
    })
    layer.add(selectionRectangle)

    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0
    let selecting = false

    stage.on('mousedown touchstart', (e) => {
      console.log('mousedown touchstart')
      if (e.target !== stage) {
        return
      }
      e.evt.preventDefault()
      x1 = stage?.getPointerPosition()?.x ?? 0
      y1 = stage?.getPointerPosition()?.y ?? 0
      x2 = stage?.getPointerPosition()?.x ?? 0
      y2 = stage?.getPointerPosition()?.y ?? 0

      console.log(x1, y1, x2, y2)

      selectionRectangle.width(0)
      selectionRectangle.height(0)
      selecting = true
    })

    stage.on('mousemove touchmove', (e) => {
      if (!selecting) {
        return
      }
      e.evt.preventDefault()
      x2 = stage?.getPointerPosition()?.x ?? 0
      y2 = stage?.getPointerPosition()?.y ?? 0
      console.log(x2, y2, 'mousemove touchmove')
      selectionRectangle.setAttrs({
        visible: true,
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1)
      })
    })

    stage.on('mouseup touchend', (e) => {
      selecting = false
      if (!selectionRectangle.visible()) {
        return
      }
      e.evt.preventDefault()
      selectionRectangle.visible(false)
      var shapes = stage.find('.rect')
      var box = selectionRectangle.getClientRect()
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      )
      tr.nodes(selected)
    })

    stage.on('click tap', function (e) {
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        return
      }

      // if click on empty area - remove all selections
      if (e.target === stage) {
        tr.nodes([])
        return
      }

      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName('rect')) {
        return
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
      const isSelected = tr.nodes().indexOf(e.target) >= 0

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target])
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice() // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1)
        tr.nodes(nodes)
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target])
        tr.nodes(nodes)
      }
    })

    return { stage, layer, x1, y1, x2, y2 }
  }

  const handleSvg = (data: string) => {
    if (!layer) return
    const svgPath = new Konva.Path({
      x: 0,
      y: 0,
      data
    })
    layer.add(svgPath)
  }

  const handleImg = (url: string) => {
    if (!layer) return
    Konva.Image.fromURL(url, (image) => {
      layer?.add(image)
    })
  }

  useEffect(() => {}, [canvasData])

  return {
    initCanvas,
    handleSvg,
    handleImg,
    stage,
    layer
  }
}
