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

  useEffect(() => {
    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      handleClick(e)
    }

    stage?.on('click', handleStageClick)
    return () => {
      stage?.off('click', handleStageClick)
    }
  }, [stage])

  return {}
}
