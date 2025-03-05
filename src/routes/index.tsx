import { createFileRoute } from '@tanstack/react-router'
import { Layout } from 'antd'
import Header from '@/components/Header'
import Option from '@/components/Operate'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'
const { Content } = Layout
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DragDropData, DragDropDataType, type AddItemDropType } from '@/types/dragDrop'
import type { ShapeEnum } from '@/types/shape'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const [addItemDrop, setAddItemDrop] = useState<AddItemDropType>({
    x: 0,
    y: 0,
    value: '',
    type: 'svg'
  })

  const {
    initCanvas,
    handleSvg,
    addShape,
    handleImg,
    handleSvgParser,
    handleStyleCSS,
    handleAIChangeColor,
    handleReplaceColors,
    setCurrentColors,
    currentColors
  } = useCanvas()

  const [collectedProps, drop] = useDrop({
    accept: DragDropData.type,
    drop: (item: DragDropDataType, monitor) => {
      //这里应该拿的是 拖入画布中 画布上拖拽结束时候 的位置
      const offset = monitor.getClientOffset()
      const containerBounds = document.getElementById('container')?.getBoundingClientRect()
      if (!containerBounds || !offset) return
      const { svg, shape } = item
      const commonDropData = {
        x: offset.x - containerBounds.left,
        y: offset.y - containerBounds.top
      }
      if (svg) {
        setAddItemDrop({
          ...commonDropData,
          value: svg,
          type: 'svg'
        })
      } else if (shape) {
        setAddItemDrop({
          ...commonDropData,
          value: shape,
          type: 'shape'
        })
      }
    }
  })

  useEffect(() => {
    initCanvas()
    return () => {}
  }, [])

  useEffect(() => {
    const { x, y, value, type } = addItemDrop
    if (type === 'svg') {
      handleSvg(value, { x, y })
    }
    if (type === 'shape') {
      addShape(value as ShapeEnum, { x, y })
    }
  }, [addItemDrop])

  return (
    <Layout className="w-screen h-screen">
      <Header></Header>
      <Layout>
        <Option
          addShape={addShape}
          handleSvg={handleSvg}
          handleImg={handleImg}
          handleSvgParser={handleSvgParser}
          handleStyleCSS={handleStyleCSS}
          handleAIChangeColor={handleAIChangeColor}
          setCurrentColors={setCurrentColors}
          currentColors={currentColors}
          handleReplaceColors={handleReplaceColors}
        />
        <Content className="overflow-y-auto flex justify-center items-center">
          <div
            id="container"
            ref={drop}
            className="bg-white"
          ></div>
        </Content>
      </Layout>
    </Layout>
  )
}
