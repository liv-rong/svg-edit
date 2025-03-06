import { DragDropData, type AddItemDropType, type DragDropDataType } from '@/types/dragDrop'
import { useState } from 'react'
import { useDrop } from 'react-dnd'

export const useDropImg = () => {
  const [addItemDrop, setAddItemDrop] = useState<AddItemDropType>({
    x: 0,
    y: 0,
    value: '',
    type: 'svg'
  })

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

  return {
    drop,
    addItemDrop
  }
}
