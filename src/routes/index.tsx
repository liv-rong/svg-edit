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
    setCurrentColors,
    currentColors
  } = useCanvas()

  const { drop, addItemDrop } = useDropImg()

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
