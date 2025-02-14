import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { OperateEnum } from '@/types/operate'

interface State {
  canvasList: []
  currentCanvasId: string | null
  OperateType: OperateEnum | null
}

interface Actions {}

const initialState: State = {
  canvasList: [],
  currentCanvasId: null,
  OperateType: null
}

export const useCanvasStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      ...initialState
    })),
    {
      name: 'canvasList_store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        canvasList: state.canvasList,
        currentCanvasId: state.currentCanvasId
      })
    }
  )
)
