import { useDrag, DragSourceMonitor } from 'react-dnd'
import { DragDropData, DragDropDataType } from '@/types/dragDrop'

interface DraggableComponentProps extends DragDropDataType {
  children: React.ReactNode
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ svg, children, shape }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DragDropData.type,
    item: { svg, shape },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))

  return (
    <div
      ref={drag}
      {...collected}
      className={classNames([collected.isDragging ? 'opacity-50' : ''])}
    >
      {children}
    </div>
  )
}

export default DraggableComponent
