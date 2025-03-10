import Konva from 'konva'
import { ShapeEnum, ShapeMap, baseShapeConfig } from '@/types/shape'
import type { Stage } from 'konva/lib/Stage'
import type { TransformerConfig } from 'konva/lib/shapes/Transformer'

export class CanvasUtils {
  static createShape(type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) {
    const shapeType = ShapeMap.get(type)
    if (!shapeType) {
      return
    }

    const { constructor, defaultConfig } = shapeType
    return new constructor({ ...baseShapeConfig, ...defaultConfig, ...customConfig })
  }

  static isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  static handleTextEdit = (stage: Stage, textNode: Konva.Text) => {
    // hide text node and transformer:
    // textNode.hide()
    // tr.hide()
    console.log(textNode, 'textNode')

    // create div over canvas with absolute position
    // first we need to find position for div
    // how to find it?

    // at first lets find position of text node relative to the stage:
    const textPosition = textNode.absolutePosition()

    console.log(textPosition)

    // so position of div will be the sum of positions above:
    var areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y
    }

    // create div and style it
    var editableDiv = document.createElement('div')
    document.body.appendChild(editableDiv)

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the div can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    editableDiv.contentEditable = 'true'
    editableDiv.innerText = textNode.text()
    editableDiv.style.position = 'absolute'
    editableDiv.style.top = areaPosition.y + 'px'
    editableDiv.style.left = areaPosition.x + 'px'
    editableDiv.style.width = textNode.width() - textNode.padding() * 2 + 'px'
    editableDiv.style.height = '300px'
    editableDiv.style.fontSize = textNode.fontSize() + 'px'
    editableDiv.style.border = 'none'
    editableDiv.style.padding = '0px'
    editableDiv.style.margin = '0px'
    editableDiv.style.overflow = 'hidden'
    editableDiv.style.background = 'red'
    editableDiv.style.outline = 'none'
    editableDiv.style.resize = 'none'
    editableDiv.style.lineHeight = textNode.lineHeight().toString()
    editableDiv.style.fontFamily = textNode.fontFamily()
    editableDiv.style.transformOrigin = 'left top'
    editableDiv.style.textAlign = textNode.align()
    editableDiv.style.color = textNode.fill() as string
    const rotation = textNode.rotation()
    let transform = ''
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)'
    }

    let px = 0
    // also we need to slightly move div on firefox
    // because it jumps a bit
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20)
    }
    transform += 'translateY(-' + px + 'px)'

    editableDiv.style.transform = transform

    // reset height
    editableDiv.style.height = 'auto'
    // after browsers resized it we can set actual value
    editableDiv.style.height = editableDiv.scrollHeight + 3 + 'px'

    editableDiv.focus()

    function removeEditableDiv() {
      editableDiv.parentNode?.removeChild(editableDiv)
      window.removeEventListener('click', handleOutsideClick)
      textNode.show()
      // tr.show()
      // tr.forceUpdate()
    }

    function setEditableDivWidth(newWidth: number) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.text().length * textNode.fontSize()
      }
      // some extra fixes on different browsers
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth)
      }

      var isEdge = document.DOCUMENT_NODE || /Edge/.test(navigator.userAgent)
      if (isEdge) {
        newWidth += 1
      }
      editableDiv.style.width = newWidth + 'px'
    }

    editableDiv.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(editableDiv.innerText)
        removeEditableDiv()
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeEditableDiv()
      }
    })

    editableDiv.addEventListener('keydown', function (e: KeyboardEvent) {
      const scale = textNode.getAbsoluteScale().x
      setEditableDivWidth(textNode.width() * scale)
      editableDiv.style.height = 'auto'
      editableDiv.style.height = editableDiv.scrollHeight + textNode.fontSize() + 'px'
    })

    function handleOutsideClick(e: MouseEvent) {
      if (e.target !== editableDiv) {
        textNode.text(editableDiv.innerText)
        removeEditableDiv()
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
    })
  }

  static addTransformer = (config?: TransformerConfig): Konva.Transformer => {
    const tr = new Konva.Transformer({
      borderStroke: '#9f7aea',
      borderStrokeWidth: 2,
      anchorStroke: '#9f7aea',
      anchorSize: 8,
      ignoreStroke: true,
      padding: 2,
      rotateLineVisible: false,
      name: 'transformer',
      boundBoxFunc: (oldBox, newBox) => {
        return newBox
      },
      anchorStyleFunc: (anchor) => {
        const transformerSize = tr.getClientRect()
        const transformerWidth = transformerSize.width * 0.9
        const transformerHeight = transformerSize.height - 66
        if (anchor.hasName('top-center') || anchor.hasName('bottom-center')) {
          anchor.width(transformerWidth)
          anchor.height(5)
          anchor.offsetX(transformerWidth / 2)
          anchor.opacity(0)
        }
        if (anchor.hasName('middle-left') || anchor.hasName('middle-right')) {
          anchor.height(transformerHeight)
          anchor.width(5)
          anchor.offsetY(transformerHeight / 2)
          anchor.opacity(0)
        }
        if (anchor.hasName('rotater')) {
          anchor.offsetY(-30)
          anchor.cornerRadius(8)
        }
      },
      ...config
    })

    return tr
  }
}
