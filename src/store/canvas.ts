import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { OperateEnum } from '@/types/operate'

interface State {
  canvasData: any
  currentId: string | null
  OperateType: OperateEnum | null
}

interface Actions {}

const initialState: State = {
  canvasData: null,
  currentId: null,
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
        canvasData: state.canvasData,
        currentId: state.currentId
      })
    }
  )
)
