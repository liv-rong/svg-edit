import Konva from 'konva'
import type { Stage } from 'konva/lib/Stage'
import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvas'
import { OperateEnum } from '@/types/operate'

export const useListenEvent = (stage: Stage | null) => {
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!stage) return
    if (e.target instanceof Konva.Shape) {
      useCanvasStore.setState({ OperateType: OperateEnum.Color, currentShape: e.target })
    }
  }

  useEffect(() => {
    stage?.on('click', function (e: Konva.KonvaEventObject<MouseEvent>) {
      handleClick(e)
    })
    return () => {
      stage?.off('click')
    }
  }, [stage])

  return {}
}
