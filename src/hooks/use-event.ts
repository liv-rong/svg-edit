import Konva from 'konva'
import type { Stage } from 'konva/lib/Stage'
import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvas'
import { OperateEnum } from '@/types/operate'

export const useListenEvent = (stage: Stage | null) => {
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!stage) return
    const currentValue = e.target
    if (currentValue instanceof Konva.Shape) {
      useCanvasStore.setState({ currentShape: currentValue })
      if (currentValue instanceof Konva.Image && currentValue?.attrs?.data) {
        useCanvasStore.setState({ OperateType: OperateEnum.Color })
      }
    }
  }

  //使得konva的文字可以编辑

  useEffect(() => {
    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      handleClick(e)
    }

    const handleStageDbClick = (e: Konva.KonvaEventObject<MouseEvent>) => {}

    stage?.on('click', handleStageClick)

    return () => {
      stage?.off('click', handleStageClick)
    }
  }, [stage])

  return {}
}
