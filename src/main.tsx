import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import zhCN from 'antd/locale/zh_CN'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { ConfigProvider } from 'antd'
import { lightTheme } from './constants/theme'
import { HappyProvider } from '@ant-design/happy-work-theme'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ConfigProvider
        locale={zhCN}
        theme={lightTheme}
      >
        <HappyProvider>
          <RouterProvider router={router} />
        </HappyProvider>
      </ConfigProvider>
    </DndProvider>
  </StrictMode>
)
