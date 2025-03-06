import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { OperateEnum } from '@/types/operate'
import Konva from 'konva'

interface State {
  canvasData: any
  currentShape: null | Konva.Shape
  OperateType: OperateEnum | null
}

interface Actions {}

const initialState: State = {
  canvasData: null,
  currentShape: null,
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
        currentShape: state.currentShape
      })
    }
  )
)
