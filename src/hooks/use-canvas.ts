import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import type { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'
import { ElementDataType } from '@/types/operate'
import { CanvasUtils } from '@/utils/Canvas'
import type { ShapeEnum } from '@/types/shape'

export const useCanvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [stage, setState] = useState<Stage>()

  const [layer, setLayer] = useState<Layer>()

  const [transformer, setTransformer] = useState<Konva.Transformer>()

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

    const rect1 = new Konva.Rect({
      x: 60,
      y: 60,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      draggable: true,
      id: '1111111111111111'
    })
    layer.add(rect1)

    var rect2 = new Konva.Rect({
      x: 250,
      y: 100,
      width: 150,
      height: 90,
      fill: 'green',
      name: 'rect',
      draggable: true,
      stroke: 'black',
      strokeWidth: 2,
      id: '222222222222222222222'
    })
    layer.add(rect2)

    const tr = new Konva.Transformer({
      borderStroke: 'blue',
      ignoreStroke: true,
      // manually adjust size of transformer
      padding: 2,
      name: 'transformer'
    })
    tr.setZIndex(-1)
    layer.draw()
    setTransformer(tr)

    layer.add(tr)

    // tr.nodes([rect1, rect2])

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
      // const shapes = stage.find('.rect').concat(stage.find('.path'))
      const shapes = layer.find('.rect')
      console.log(shapes, 'shapesshapes')
      const box = selectionRectangle.getClientRect()
      const selected = shapes.filter((shape) =>
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
      // if (!e.target.hasName('rect')) {
      //   return
      // }

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

    const container = stage.container()

    container.tabIndex = 1
    container.style.outline = 'none'
    container.focus()

    container.addEventListener('keydown', function (e) {
      e.preventDefault()

      if (e.key === 'Backspace' || e.key === 'Delete') {
        const selectedNodes = tr.nodes()

        selectedNodes.forEach((node) => {
          node.destroy()
        })

        tr.nodes([])

        layer.batchDraw()
      }
    })

    // stage.on('contentMouseup', () => {
    //   console.log('contentMouseupcontentMouseup')
    //   stage.container().focus()
    // })

    return { stage, layer, x1, y1, x2, y2 }
  }

  const handleSvg = (data: string) => {
    console.log('handleSvg', data, layer)
    // if (!layer) return
    Konva.Image.fromURL(data, (imageNode) => {
      layer?.add(imageNode)
      imageNode.setAttrs({
        width: 150,
        height: 150,
        draggable: true,
        data: data
      })
      transformer?.setZIndex(999)
    })
  }

  const handleImg = (url: string) => {
    if (!layer) return

    Konva.Image.fromURL(url, (image) => {
      image.setAttrs({
        x: 200,
        y: 50,
        draggable: true
      })
      layer?.add(image)
    })
  }

  const handleSvgParser = (svgString: string) => {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = svgDoc.documentElement

    const allEle: ElementDataType[] = []

    console.log(svgElement, '111111111')

    Array.from(svgElement.children).forEach((child) => {
      console.log(child, '111111')
      const elementData: ElementDataType = { tagName: child.tagName }

      const attributes = child.getAttributeNames()
      attributes.forEach((attr) => {
        child.getAttribute(attr)
        if (child.getAttribute(attr)) {
          elementData[attr] = child.getAttribute(attr) ?? ''
        }
      })

      allEle.unshift(elementData)
    })
    allEle.forEach((itemEle) => {
      let shape
      switch (itemEle.tagName) {
        case 'rect':
          shape = new Konva.Rect(itemEle)
          break
        case 'Text':
          shape = new Konva.Text(itemEle)
          break
        case 'path':
          shape = new Konva.Path({
            data: itemEle.d,
            name: 'rect',
            draggable: true,
            x: 300,
            y: 400,
            ...itemEle
          })
          break
        default:
          break
      }

      if (shape) {
        layer?.add(shape)
      }
    })

    console.log(allEle, 'allEle')
  }

  const addShape = (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => {
    const resShape = CanvasUtils.createShape(type, customConfig)
    if (!resShape) return
    layer?.add(resShape)
    transformer?.setZIndex(999)
  }

  useEffect(() => {
    return () => {
      stage?.destroy()
    }
  }, [])

  const handleStyleCSS = (value: any) => {
    const currentShape = transformer?.getNodes()
    currentShape?.forEach((ele) => {
      const currentAttrs = ele.getAttrs()
      console.log(currentAttrs, 'currentAttrs')
      ele.setAttrs({
        ...value
      })
    })
    console.log(currentShape, 'transformer?.getChildren()')
  }

  const handleAIChangeColor = (value: any) => {
    console.log(value, 'handleAIChangeColor')
    const currentShape = transformer?.getNodes()
    currentShape?.forEach(async (ele) => {
      const currentAttrs = await ele.getAttrs()
      if (currentAttrs?.data) {
        console.log(currentAttrs?.data)

        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(currentAttrs?.data, 'image/svg+xml')
        const svgElement = svgDoc.documentElement

        console.log(svgElement, 'svgElement')
      }
      // const currentAttrs3 = await ele.toSvg()
      // console.log(currentAttrs4, 'handleAIChangeColor')

      // console.log(currentAttrs3, 'handleAIChangeColor')
    })
  }

  return {
    initCanvas,
    handleSvg,
    handleImg,
    handleSvgParser,
    addShape,
    handleAIChangeColor,
    stage,
    layer,
    handleStyleCSS
  }
}

const text = `<path fill="#00dba8" d="M44 19c0 11.05-13.5 22.5-20 22.5S4 30.05 4 19S13 1.5 24 1.5S44 8 44 19"/>


<path fill="#00ad85" d="M24 38.39c-6.22 0-18.82-10.47-19.91-21C4 17.89 4 18.43 4 19c0 11.05 13.5 22.5 20 22.5S44 30.05 44 19c0-.57 0-1.11-.08-1.65c-1.1 10.57-13.7 21.04-19.92 21.04"/>


<path fill="none" stroke="#45413c" stroke-linecap="round" d="M29 30a9 9 0 0 1-10 0"/>

<path fill="#45413c" d="M8 45.5a16 1.5 0 1 0 32 0a16 1.5 0 1 0-32 0" opacity=".15"/>



<path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M44 19c0 11.05-13.5 22.5-20 22.5S4 30.05 4 19S13 1.5 24 1.5S44 8 44 19"/>
<path fill="#bf8df2" d="M10.88 12.41c-2.37 1.81-2.44 5.7-.17 8.69s6.28 3.45 9 3.06a8.78 8.78 0 0 0-.41-9.61c-2.3-2.99-6.04-3.94-8.42-2.14"/>



<path fill="#dabff5" d="M19.3 14.55c-2.27-3-6-3.94-8.42-2.14a5.3 5.3 0 0 0-1.67 5.44a4.64 4.64 0 0 1 1.67-2.71c2.38-1.81 6.15-.85 8.42 2.13A8.24 8.24 0 0 1 20.85 21a8.71 8.71 0 0 0-1.55-6.45"/>



<path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M10.88 12.41c-2.37 1.81-2.44 5.7-.17 8.69s6.28 3.45 9 3.06a8.78 8.78 0 0 0-.41-9.61c-2.3-2.99-6.04-3.94-8.42-2.14"/>



<path fill="#bf8df2" d="M37.12 12.41c2.37 1.81 2.44 5.7.17 8.69s-6.28 3.45-9 3.06a8.78 8.78 0 0 1 .41-9.61c2.3-2.99 6.04-3.94 8.42-2.14"/>





<path fill="#dabff5" d="M28.7 14.55c2.27-3 6-3.94 8.42-2.14a5.3 5.3 0 0 1 1.67 5.44a4.64 4.64 0 0 0-1.67-2.71c-2.38-1.81-6.15-.85-8.42 2.13A8.24 8.24 0 0 0 27.15 21a8.71 8.71 0 0 1 1.55-6.45"/>



<path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" d="M37.12 12.41c2.37 1.81 2.44 5.7.17 8.69s-6.28 3.45-9 3.06a8.78 8.78 0 0 1 .41-9.61c2.3-2.99 6.04-3.94 8.42-2.14M25.5 26v1.5m-3-1.5v1.5"/>



<path fill="#00ad85" d="M10.81 28.17a2.5 1.5 0 1 0 5 0a2.5 1.5 0 1 0-5 0m21.38 0a2.5 1.5 0 1 0 5 0a2.5 1.5 0 1 0-5 0"/>


<path fill="#00f5bc" d="M18.04 5.39a6 1.5 0 1 0 12 0a6 1.5 0 1 0-12 0"/>`
