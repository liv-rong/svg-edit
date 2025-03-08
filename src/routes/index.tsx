import { createFileRoute } from '@tanstack/react-router'
import { Layout } from 'antd'
import Header from '@/components/Header'
import Option from '@/components/Operate'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'
const { Content } = Layout
import { useEffect } from 'react'
import type { ShapeEnum } from '@/types/shape'
import { useDropImg } from '@/hooks/use-drop-img'
import { useListenEvent } from '@/hooks/use-event'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const {
    initCanvas,
    handleSvg,
    addShape,
    handleImg,
    handleSvgParser,
    handleStyleCSS,
    handleAIChangeColor,
    handleReplaceColors,
    handleExport,
    setCurrentColors,
    currentColors,
    stage
  } = useCanvas()

  useListenEvent(stage)

  const { drop, addItemDrop } = useDropImg()

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
      <Header
        addShape={addShape}
        handleStyleCSS={handleStyleCSS}
        initCanvas={initCanvas}
        handleExport={handleExport}
      />
      <Layout>
        <Content className="overflow-y-auto flex justify-between items-center">
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
          <div className="h-[calc(100vh-64px)] flex-1 flex justify-center items-center">
            <div
              id="container"
              ref={drop}
              className="bg-white"
            ></div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
