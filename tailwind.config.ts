// tailwind.config.js

module.exports = {
  mode: 'jit', // 启用 JIT 模式
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/*'], // 指定需要扫描的文件
  darkMode: false, // 可选：启用黑暗模式,
  safelist: [
    // 动态生成的颜色类名
    ...[
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone'
    ].map((color) => `bg-${color}-600`)
  ]
}
