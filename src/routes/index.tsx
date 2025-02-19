import { createFileRoute } from '@tanstack/react-router'
import { Layout } from 'antd'
import Header from '@/components/Header'
import Option from '@/components/Operate'
import Canvas from '@/components/Canvas'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'
import { useCanvas } from '@/hooks/use-canvas'
const { Content } = Layout
export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const { canvasData } = useCanvasStore(
    useShallow((state) => ({
      canvasData: state.canvasData
    }))
  )

  const { initCanvas } = useCanvas()

  useEffect(() => {
    initCanvas()
    return () => {}
  }, [])
  return (
    <Layout className="w-screen h-screen">
      <Header></Header>
      <Layout>
        <Option />
        <Content className="overflow-y-auto flex justify-center items-center">
          <Canvas />
        </Content>
      </Layout>
    </Layout>
  )
}
