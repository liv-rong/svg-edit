import type { Stage } from 'konva/lib/Stage'

export const useDo = (stage: Stage | null) => {
  const [appHistory, setAppHistory] = useState<Stage[]>([])

  const [appHistoryStep, setAppHistoryStep] = useState(0)

  const saveStateToHistory = (state: Stage) => {
    setAppHistory((pre) => appHistory.slice(0, appHistoryStep + 1).concat([state]))
    setAppHistoryStep((pre) => pre + 1)
  }

  const undo = () => {
    if (appHistoryStep === 0) {
      return
    }
    setAppHistoryStep((pre) => pre - 1)
    const state = appHistory[appHistoryStep]
    // create(state)
  }

  const redo = () => {
    if (appHistoryStep === appHistory.length - 1) {
      return
    }
    setAppHistoryStep((pre) => pre + 1)
    // state = appHistory[appHistoryStep]
    // create everything from scratch
    // create(state)
  }

  //为啥当画布中的元素 移动和缩放的时候 没有触发这个
  //修改正确 我想把画布中的每一个元素的操作 都记录下来 做撤销和重做 功能

  useEffect(() => {
    console.log('111111111111111')
    console.log(stage?.toJSON())
    // if (stage) {
    //   saveStateToHistory(stage)
    // }
  }, [stage?.toJSON()])

  useEffect(() => {
    console.log('22222222')
    console.log(stage?.toObject())
    // if (stage) {
    //   saveStateToHistory(stage)
    // }
  }, [stage?.toObject()])

  return {
    saveStateToHistory,
    undo,
    redo
  }
}
