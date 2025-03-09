import { useDrag, DragSourceMonitor } from 'react-dnd'
import { DragDropData, DragDropDataType } from '@/types/dragDrop'

interface DraggableComponentProps extends DragDropDataType {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  svg,
  children,
  shape,
  className,
  onClick
}) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: DragDropData.type,
    item: { svg, shape },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div
      ref={drag}
      {...collected}
      className={classNames('flex justify-center items-center', className, [
        collected.isDragging ? 'opacity-50' : ''
      ])}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default DraggableComponent
