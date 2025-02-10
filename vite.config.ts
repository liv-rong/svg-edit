import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "unplugin-auto-import/vite";
import ViteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.md$/],
      imports: [
        "react",
        "react-router-dom",
        {
          classnames: [["default", "classNames"]],
          antd: [
            "Button",
            "ColorPicker",
            "Dropdown",
            "InputNumber",
            "Modal",
            "Radio",
            "Select",
            "Tooltip",
          ],
          react: [
            "Suspense",
            "lazy",
            "memo",
            "useEffect",
            "useState",
            "useRef",
            "useCallback",
            "useMemo",
            "useContext",
            "useImperativeHandle",
          ],
          "@tanstack/react-router": [
            "createRootRoute",
            "Link",
            "Outlet",
            "createFileRoute",
          ],
        },
      ],
      defaultExportByFilename: false,
      dirsScanOptions: {
        types: true,
      },
      dts: "@types/auto-imports.d.ts",
      dirs: [
        "src/api/**",
        "src/components/**",
        "src/hooks/**",
        "src/layouts/*",
        "src/store/**",
        "src/hooks/**",
        "src/utils/**",
        "src/assets/**",
      ],
    }),
    ViteCompression({
      verbose: true,
      disable: true,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
