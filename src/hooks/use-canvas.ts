import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import type { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'
import { ElementDataType } from '@/types/operate'
import { CanvasUtils } from '@/utils/canvas'
import { ShapeEnum } from '@/types/shape'
import { AllColorsEnum, allColorsMap } from '@/types/color'
import { ColorUtils } from '@/utils/color'

export const useCanvas = () => {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [stage, setState] = useState<Stage | null>(null)

  const [layer, setLayer] = useState<Layer>()

  const [transformer, setTransformer] = useState<Konva.Transformer>()

  const [currentColors, setCurrentColors] = useState<string[]>([])

  const initCanvas = () => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 1200,
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
      name: 'transformerShape',
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
      name: 'transformerShape',
      draggable: true,
      stroke: 'black',
      strokeWidth: 2,
      id: '222'
    })
    layer.add(rect2)

    const tr = new Konva.Transformer({
      borderStroke: 'blue',
      ignoreStroke: true,
      // manually adjust size of transformer
      padding: 2,
      name: 'transformer'
    })

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
      const shapes = layer.find('.transformerShape')
      console.log(shapes, '')
      const box = selectionRectangle.getClientRect()
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      )
      tr.nodes(selected)
    })

    stage.on('click tap', function (e) {
      console.log('click tap')
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
      // debugger
      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one

        // 判断目标值是不是img  如果是img 就计算出他的色系
        if (e.target instanceof Konva.Image) {
          const imageNode = e.target as Konva.Image
          const imageUrl = imageNode.getAttr('data')
          if (imageUrl) {
            fetch(imageUrl)
              .then((response) => response.text())
              .then((svgText) => {
                const colors = ColorUtils.getColorsFromSvg(svgText)
                setCurrentColors(colors)
              })
          }
        } else {
          setCurrentColors([])
        }

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

    // Unable to listen for changes correctly
    // stage.on('dragenter', function (e) {
    //   console.log('dragenter')
    // })

    // stage.on('copy', function (e) {
    //   console.log('copy')
    // })
    // stage.on('cut', function (e) {
    //   console.log('cut')
    // })

    // stage.on('pointerup', function (e) {
    //   console.log('pointerup')
    // })

    // stage.on('pointerdown', function (e) {
    //   console.log('pointerdown')
    // })

    // 'pointercancel": PointerEvent;
    // "pointerdown": PointerEvent;
    // 'pointerenter": PointerEvent;
    // pointerleave": PointerEvent;
    // pointermove": PointerEvent;
    // pointerout": PointerEvent;
    // "pointerover": PointerEvent;
    // "pointerup": PointerEvent;

    // stage.on('dragleave', function (e) {
    //   console.log('dragleave')
    // })

    // stage.on('dragover', function (e) {
    //   console.log('dragover')
    // })

    // stage.on('drop', function (e) {
    //   console.log('drop')
    // })

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

    return { stage, layer, x1, y1, x2, y2 }
  }

  const handleSvg = (data: string, config?: Record<string, any>) => {
    return new Promise<Konva.Image | undefined>((resolve) => {
      if (!layer) return resolve(undefined)

      let url = data

      if (!CanvasUtils.isValidUrl(data)) {
        const blob = new Blob([data], { type: 'image/svg+xml' })
        url = URL.createObjectURL(blob)
      }

      Konva.Image.fromURL(url, (imageNode) => {
        layer?.add(imageNode)
        imageNode.setAttrs({
          draggable: true,
          data: url,
          name: 'transformerShape',
          ...config
        })
        transformer?.nodes([imageNode])
        useCanvasStore.setState({ currentShape: imageNode })
        if (layer?.children) {
          transformer?.setZIndex(layer.children.length - 1)
        }
        resolve(imageNode)
      })
    })
  }

  const handleImg = (url: string, config?: Record<string, any>) => {
    if (!layer) return
    Konva.Image.fromURL(url, (image) => {
      image.setAttrs({
        x: 200,
        y: 50,
        name: 'transformerShape',
        draggable: true
      })
      layer?.add(image)
      image.setAttrs({
        draggable: true,
        data: url,
        name: 'transformerShape',
        ...config
      })
      image.cache()
      image.filters([Konva.Filters.HSV])
      transformer?.nodes([image])
      transformer?.setZIndex(999)
    })
  }

  const handleSvgParser = (svgString: string) => {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml')
    const svgElement = svgDoc.documentElement
    const allEle: ElementDataType[] = []
    Array.from(svgElement.children).forEach((child) => {
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
            name: 'transformerShape',
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
  }

  const addShape = (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => {
    if (!layer) return
    const resShape = CanvasUtils.createShape(type, customConfig)
    if (!resShape) return
    layer?.add(resShape)
    transformer?.setZIndex(layer?.children ? layer.children.length - 1 : 0)
  }

  const handleStyleCSS = (value: any) => {
    const currentShape = transformer?.getNodes()
    currentShape?.forEach((ele) => {
      ele.clearCache()
      ele.filters([Konva.Filters.HSV])
      ele.setAttrs({
        ...value
      })
      ele.cache({
        pixelRatio: 6,
        imageSmoothingEnabled: true
      })
    })

    layer?.batchDraw()
  }

  const handleAIChangeColor = (color: AllColorsEnum | null) => {
    let colors = color ? (allColorsMap.get(color)?.colors ?? []) : []
    const currentShape = transformer?.getNodes()
    const allSvgNodes: Konva.Image[] = []
    currentShape?.forEach(async (ele) => {
      const currentAttrs = await ele.getAttrs()
      const svgData = await ele.getAttrs()?.data
      const { image, ...restAttrs } = currentAttrs
      if (svgData) {
        const response = await fetch(svgData)
        const svgText = await response.text()
        const newSvg = color ? ColorUtils.applyThemeToSvg(svgText, colors[4]) : svgText
        console.log(newSvg, 'newSvg')
        setCurrentColors(ColorUtils.getColorsFromSvg(newSvg))
        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(newSvg)}`
        ele.destroy()
        transformer?.nodes([])
        handleSvg(svgDataUrl, { ...restAttrs }).then((resSvg) => {
          if (resSvg) {
            allSvgNodes.push(resSvg)
            transformer?.nodes(allSvgNodes)
            if (layer?.children) {
              transformer?.setZIndex(layer.children.length - 1)
            }
          }
        })
      }
    })
  }

  const handleReplaceColors = (value: string[]) => {
    const currentShape = transformer?.getNodes()
    currentShape?.forEach(async (ele) => {
      const currentAttrs = await ele.getAttrs()
      const svgData = await ele.getAttrs()?.data
      const { image, data, ...restAttrs } = currentAttrs
      if (svgData) {
        const response = await fetch(svgData)
        const svgText = await response.text()
        const newSvg = ColorUtils.replaceColorsWithMap(svgText, value)
        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(newSvg)}`
        ele.destroy()
        transformer?.nodes([])
        handleSvg(svgDataUrl, { ...restAttrs, data: svgDataUrl })
      }
    })
  }

  useEffect(() => {
    return () => {
      stage?.destroy()
    }
  }, [])

  return {
    initCanvas,
    handleSvg,
    handleImg,
    handleSvgParser,
    addShape,
    handleAIChangeColor,
    handleReplaceColors,
    handleStyleCSS,
    setCurrentColors,
    stage,
    layer,
    currentColors
  }
}
