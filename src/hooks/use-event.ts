import Konva from 'konva'
import type { Stage } from 'konva/lib/Stage'

export const useListenEvent = (stage: Stage) => {
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log('click', e.target)
  }
  useEffect(() => {
    stage?.on('click', function (e: Konva.KonvaEventObject<MouseEvent>) {
      console.log('click111111')
      handleClick(e)
    })
    return () => {
      stage?.off('click111')
    }
  }, [stage])
  return {}
}
