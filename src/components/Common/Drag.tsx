import { useDrag, DragSourceMonitor } from 'react-dnd'
import { DragDropData } from '@/constants/dragDrop'

interface DraggableComponentProps {
  id: string
  children: React.ReactNode
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, children }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DragDropData.type,
    item: { id },
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
