import Konva from 'konva'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import type { Stage } from 'konva/lib/Stage'
import { Layer } from 'konva/lib/Layer'
import { ElementDataType } from '@/types/operate'
import { CanvasUtils } from '@/utils/Canvas'
import type { ShapeEnum } from '@/types/shape'
import tinycolor from 'tinycolor2'
import { HSVType } from '@/types/color'

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
      const shapes = layer.find('.transformerShape')
      console.log(shapes, '')
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

    return { stage, layer, x1, y1, x2, y2 }
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSvg = (data: string, config?: Record<string, any>) => {
    if (!layer) return

    let url = data

    if (!isValidUrl(data)) {
      const blob = new Blob([data], { type: 'image/svg+xml' })
      url = URL.createObjectURL(blob)
    }

    Konva.Image.fromURL(url, (imageNode) => {
      console.log(imageNode, 'imageNode')
      layer?.add(imageNode)
      imageNode.setAttrs({
        draggable: true,
        data: url,
        name: 'transformerShape',
        ...config
      })
      // imageNode.cache()
      // imageNode.filters([Konva.Filters.HSV])
      // imageNode.setAttrs({
      //   hue: 0,
      //   saturation: 0,
      //   value: 0
      // })
      // imageNode.on('click', function (e) {
      //   console.log(e.target, 'click tap')
      // })
      // imageNode.on('dblclick', function (e) {
      //   console.log(e.target, 'dblclick')
      // })
      // imageNode.on('auxclick', function (e) {
      //   console.log(e.target, 'auxclick')
      // })
      transformer?.nodes([imageNode])

      transformer?.setZIndex(999)
    })

    // const img = new Image()
    // img.src = data

    // const newShape = new Konva.Shape({
    //   width: img.width ?? 100,
    //   height: img.height ?? 100,
    //   draggable: true,
    //   data: data,
    //   name: 'transformerShape',
    //   sceneFunc: function (context, shape) {
    //     const width = shape.width()
    //     const height = shape.height()
    //     context.drawImage(img, 0, 0, width, height)
    //   }
    // })
    // // newShape.cache()
    // // newShape.filters([Konva.Filters.HSV])
    // newShape.setAttrs({
    //   draggable: true,
    //   data: data,
    //   name: 'transformerShape'
    // })
    // layer?.add(newShape)
    // // transformer?.nodes([triangle])
    // transformer?.setZIndex(999)
  }

  // const handleSvg2Shape = (data: string, config?: Record<string, any>) => {
  //   const triangle = new Konva.Shape({
  //     width: 260,
  //     height: 170,
  //     draggable: true,
  //     data: data,
  //     name: 'transformerShape',
  //     sceneFunc: function (context, shape) {
  //       const width = shape.width()
  //       const height = shape.height()
  //       context.drawImage(img, 0, 0, width, height)
  //     },
  //     fill: '#00D2FF',
  //     stroke: 'black',
  //     strokeWidth: 4
  //   })
  //   layer?.add(triangle)
  // }

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

    // console.log(svgElement, '111111111')

    Array.from(svgElement.children).forEach((child) => {
      // console.log(child, '111111')
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

    // console.log(allEle, 'allEle')
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

  const styleStringToObject = (styleString: string | null): Record<string, string> => {
    const styleObject: Record<string, string> = {}

    if (!styleString) return styleObject

    // Remove any extra spaces and split by semicolon
    const styles = styleString
      .split(';')
      .map((style) => style.trim())
      .filter(Boolean)

    for (const style of styles) {
      const [key, value] = style.split(':').map((part) => part.trim())
      if (key && value) {
        styleObject[key] = rgbToHex(value)
      }
    }
    return styleObject
  }
  //把rgb rgb(180, 189, 225) 字符串转为 hex 格式的 用tinycolor 库来写
  const rgbToHex = (rgb: string): string => {
    //判断是不是rgb 字符串 如果不是直接返回
    if (!rgb.startsWith('rgb')) {
      return rgb
    }
    const color = tinycolor(rgb)
    return color.toHexString()
  }

  const handleAIChangeColor = ({ s, h, v }: HSVType) => {
    // console.log(value, 'handleAIChangeColor')
    const currentShape = transformer?.getNodes()
    currentShape?.forEach(async (ele) => {
      const currentAttrs = await ele.getAttrs()
      const svgData = await ele.getAttrs()?.data
      const { image, ...restAttrs } = currentAttrs

      if (svgData) {
        // console.log(currentAttrs?.data)
        const response = await fetch(svgData)
        const svgText = await response.text()
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
        const svgElement = svgDoc.documentElement
        console.log(svgElement, 'svgElement')
        // console.log(svgElement, 'svgElement')
        //获取类名为classTag的元素  并且更改属性fill为红色  stroke 为blue

        // 获取类名为 'cls-1 cls-2 cls-3 cls-4 ...' 的元素
        // const elements = svgElement.querySelectorAll('[class^="cls-"]')
        // console.log(elements, 'svgElement')
        const elements1 = svgElement.querySelectorAll('[fill], [stroke], [style]')
        console.log(elements1, 'svgElement')
        const colors = ['#fef2f2', '#ffe2e2', '#ffc9c9', '#ffa2a2', '#ff6467', '#fb2c36']
        const currentColors: string[] = []
        const colorMap: Map<string, string> = new Map()
        elements1.forEach((element) => {
          // 获取并打印当前颜色
          const currentFill = element.getAttribute('fill')
          const currentStroke = element.getAttribute('stroke')
          const currentStyle = element.getAttribute('style')
          const styleCurrent = styleStringToObject(element.getAttribute('style'))
          console.log(
            currentFill,
            currentStroke,
            styleCurrent,
            currentStyle,
            '11111111111111111111111'
          )
          if (currentFill) {
            const mapValue = colorMap.has(currentFill)
            if (mapValue) {
              element.setAttribute('fill', colorMap.get(currentFill) ?? 'none')
            } else {
              colorMap.set(currentFill, colors[Math.floor(Math.random() * colors.length)])
            }
          }
          if (currentStroke) {
            const mapValue = colorMap.has(currentStroke)
            if (mapValue) {
              element.setAttribute('fill', colorMap.get(currentStroke) ?? 'none')
            } else {
              colorMap.set(currentStroke, colors[Math.floor(Math.random() * colors.length)])
            }
          }
          if (styleCurrent) {
            const { fill, stroke, ...rest } = styleCurrent
            const newStyle = { ...styleCurrent }
            if (fill) {
              const mapValue = colorMap.has(fill)
              if (mapValue) {
                newStyle.fill = colorMap.get(fill) ?? 'none'
              }
            }
            if (stroke) {
              const mapValue = colorMap.has(stroke)
              if (mapValue) {
                newStyle.stroke = colorMap.get(stroke) ?? 'none'
              }
            }
            element.setAttribute('style', newStyle.toString())
          }
        })

        const serializer = new XMLSerializer()
        const modifiedSvgText = serializer.serializeToString(svgElement)
        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvgText)}`
        ele.destroy()
        transformer?.nodes([])
        handleSvg(svgDataUrl, restAttrs)
        // const newSvgString = new XMLSerializer().serializeToString(svgElement)
        // console.log(newSvgString) // 输出新的 SVG 字符串

        // elements.forEach((element) => {
        //   // const elements1 = svgElement.attributes.fill
        //   const eleStroke = element.getAttribute('stroke')
        //   const eleFill = element.getAttribute('fill')
        //   const eleStyle = element.getAttribute('style.fill')
        //   // if(eleStroke || eleStyle?.fill) {

        //   // }

        //   if (eleFill) {
        //     // 修改填充颜色（例如，将其改为红色）
        //     element.setAttribute('fill', '#ff0000') // 修改为红色
        //   }

        //   // 检查并修改描边属性
        //   if (eleStroke) {
        //     // 修改描边颜色（例如，将其改为蓝色）
        //     element.setAttribute('stroke', '#0000ff') // 修改为蓝色
        //   }

        //   console.log(eleStyle, `Element: ${eleFill}, Fill: ${eleStroke}`, 'svgElement')
        // // })
        // for (const element of elements) {
        //   // const eleStroke = element.getAttribute('stroke')
        //   // const eleFill = element.getAttribute('fill')
        //   // const eleStyle = element.getAttribute('style')
        //   // console.log(eleStroke, eleFill, eleStyle, 'svgElement')
        //   // const newColor = colors[colorIndex]
        //   // colorIndex = (colorIndex + 1) % colors.length
        //   // if (eleFill) {
        //   //   // Update index correctly
        //   //   element.setAttribute('fill', `${newColor}`) // Update fill color
        //   //   colorIndex = (colorIndex + 1) % colors.length
        //   // }
        //   // if (eleStroke) {
        //   //   element.setAttribute('stroke', newColor[colorIndex]) // Update fill color
        //   // }
        //   // console.log(element, '')
        // }
        // // 更改 fill 和 stroke 属性
        // let colorIndex = 0
        // const colors = ['#fef2f2', '#ffe2e2', '#ffc9c9', '#ffa2a2', '#ff6467', '#fb2c36']
        // const rec = colors[0]
        // for (const element of elements) {
        //   const eleStroke = element.getAttribute('stroke')
        //   const eleFill = element.getAttribute('fill')
        //   console.log(element, '')
        //   const newColor = colors[colorIndex]
        //   colorIndex = (colorIndex + 1) % colors.length
        //   if (eleFill) {
        //     // Update index correctly

        //     element.setAttribute('fill', `${newColor}`) // Update fill color
        //     colorIndex = (colorIndex + 1) % colors.length
        //   }
        //   if (eleStroke) {
        //     element.setAttribute('stroke', newColor[colorIndex]) // Update fill color
        //   }
        //   console.log(element, '')
        // }
        // console.log(svgElement, '')

        // const serializer = new XMLSerializer()
        // const modifiedSvgText = serializer.serializeToString(svgElement)
        // // const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvgText)}`
        // //再变成svg 元素 生成图片

        // const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvgText)}`
        // console.log(currentAttrs, 'svgDataUrl')
        // ele.destroy()
        // transformer?.nodes([])
        // handleSvg(svgDataUrl, restAttrs)
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
