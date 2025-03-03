export enum AllColorsEnum {
  'Red' = 'red',
  'Orange' = 'orange',
  'Amber' = 'amber',
  'Yellow' = 'yellow',
  'Lime' = 'lime',
  'Green' = 'green',
  'Emerald' = 'emerald',
  'Teal' = 'teal',
  'Cyan' = 'cyan',
  'Sky' = 'sky',
  'Blue' = 'blue',
  'Indigo' = 'indigo',
  'Violet' = 'violet',
  'Purple' = 'purple',
  'Fuchsia' = 'fuchsia',
  'Pink' = 'pink',
  'Rose' = 'rose',
  'Slate' = 'slate',
  'Gray' = 'gray',
  'Zinc' = 'zinc',
  'Neutral' = 'neutral',
  'Stone' = 'stone'
}

export interface AllColorsEnumValue {
  colors: string[]
}

export const allColorsMap = new Map<AllColorsEnum, AllColorsEnumValue>([
  [
    AllColorsEnum.Red,
    {
      colors: [
        '#fef2f2', // red-50
        '#fee2e2', // red-100
        '#fecaca', // red-200
        '#fca5a1', // red-300
        '#f87171', // red-400
        '#ef4444', // red-500
        '#dc2626', // red-600
        '#b91c1c', // red-700
        '#991b1b', // red-800
        '#7f1d1d' // red-900
      ]
    }
  ],
  [
    AllColorsEnum.Orange,
    {
      colors: [
        '#fff7ed', // orange-50
        '#ffedd5', // orange-100
        '#fed7aa', // orange-200
        '#fdba74', // orange-300
        '#fb923c', // orange-400
        '#f97316', // orange-500
        '#ea580c', // orange-600
        '#c2410c', // orange-700
        '#9a3412', // orange-800
        '#7c2d12' // orange-900
      ]
    }
  ],
  [
    AllColorsEnum.Amber,
    {
      colors: [
        '#fffbeb', // amber-50
        '#fef3c7', // amber-100
        '#fde68a', // amber-200
        '#fcd34d', // amber-300
        '#fbbf24', // amber-400
        '#f59e0b', // amber-500
        '#d97706', // amber-600
        '#b45309', // amber-700
        '#92400e', // amber-800
        '#78350f' // amber-900
      ]
    }
  ],
  [
    AllColorsEnum.Yellow,
    {
      colors: [
        '#fffbeb', // yellow-50
        '#fef08a', // yellow-100
        '#fde68a', // yellow-200
        '#fcd34d', // yellow-300
        '#fbbf24', // yellow-400
        '#f59e0b', // yellow-500
        '#d97706', // yellow-600
        '#b45309', // yellow-700
        '#92400e', // yellow-800
        '#78350f' // yellow-900
      ]
    }
  ],
  [
    AllColorsEnum.Lime,
    {
      colors: [
        '#f7fee7', // lime-50
        '#e6f9c8', // lime-100
        '#d9f99d', // lime-200
        '#bef264', // lime-300
        '#a3e635', // lime-400
        '#84cc16', // lime-500
        '#65a30d', // lime-600
        '#4d7c0f', // lime-700
        '#3f6212', // lime-800
        '#3b4d1f' // lime-900
      ]
    }
  ],
  [
    AllColorsEnum.Green,
    {
      colors: [
        '#f0fdf4', // green-50
        '#dcfce7', // green-100
        '#bbf7d0', // green-200
        '#86efac', // green-300
        '#4ade80', // green-400
        '#22c55e', // green-500
        '#16a34a', // green-600
        '#15803d', // green-700
        '#166534', // green-800
        '#14532d' // green-900
      ]
    }
  ],

  [
    AllColorsEnum.Emerald,
    {
      colors: [
        '#d9f99d', // emerald-50
        '#a3e635', // emerald-100
        '#84cc16', // emerald-200
        '#65a30d', // emerald-300
        '#4d7c0f', // emerald-400
        '#3f6212', // emerald-500
        '#3b4d1f', // emerald-600
        '#1f3a38', // emerald-700
        '#1a2c2f', // emerald-800
        '#0d1b1f' // emerald-900
      ]
    }
  ],
  [
    AllColorsEnum.Teal,
    {
      colors: [
        '#f0fdfa', // teal-50
        '#ccfbf1', // teal-100
        '#99f6e4', // teal-200
        '#5eead4', // teal-300
        '#26d97f', // teal-400
        '#0d9488', // teal-500
        '#0f766e', // teal-600
        '#115e59', // teal-700
        '#134e4a', // teal-800
        '#134e4a' // teal-900
      ]
    }
  ],
  [
    AllColorsEnum.Cyan,
    {
      colors: [
        '#ecfeff', // cyan-50
        '#cffafe', // cyan-100
        '#a5f3fc', // cyan-200
        '#67e8f9', // cyan-300
        '#22d3ee', // cyan-400
        '#06b6d4', // cyan-500
        '#0e7490', // cyan-600
        '#155e75', // cyan-700
        '#164e63', // cyan-800
        '#0d1f3c' // cyan-900
      ]
    }
  ],
  [
    AllColorsEnum.Gray,
    {
      colors: [
        '#f9fafb', // gray-50
        '#f3f4f6', // gray-100
        '#e5e7eb', // gray-200
        '#d1d5db', // gray-300
        '#9ca3af', // gray-400
        '#6b7280', // gray-500
        '#4b5563', // gray-600
        '#374151', // gray-700
        '#1f2937', // gray-800
        '#111827' // gray-900
      ]
    }
  ],
  [
    AllColorsEnum.Sky,
    {
      colors: [
        '#f0f9ff', // sky-50
        '#e0f2fe', // sky-100
        '#bae6fd', // sky-200
        '#7dd3fc', // sky-300
        '#38bdf8', // sky-400
        '#06b6d4', // sky-500
        '#0e7490', // sky-600
        '#155e75', // sky-700
        '#164e63', // sky-800
        '#0c4a6e' // sky-900
      ]
    }
  ],

  [
    AllColorsEnum.Blue,
    {
      colors: [
        '#eff6ff', // blue-50
        '#dbeafe', // blue-100
        '#bfdbfe', // blue-200
        '#93c5fd', // blue-300
        '#60a5fa', // blue-400
        '#3b82f6', // blue-500
        '#2563eb', // blue-600
        '#1d4ed8', // blue-700
        '#1e40af', // blue-800
        '#1e3a8a' // blue-900
      ]
    }
  ],
  [
    AllColorsEnum.Indigo,
    {
      colors: [
        '#eef2ff', // indigo-50
        '#e0e7ff', // indigo-100
        '#c7d2fe', // indigo-200
        '#a5b4fc', // indigo-300
        '#818cf8', // indigo-400
        '#6366f1', // indigo-500
        '#4f46e5', // indigo-600
        '#4338ca', // indigo-700
        '#3730a3', // indigo-800
        '#312e81' // indigo-900
      ]
    }
  ],
  [
    AllColorsEnum.Violet,
    {
      colors: [
        '#f5f3ff', // violet-50
        '#e0e7ff', // violet-100
        '#c7d2fe', // violet-200
        '#a5b4fc', // violet-300
        '#818cf8', // violet-400
        '#6366f1', // violet-500
        '#4f46e5', // violet-600
        '#4338ca', // violet-700
        '#3730a3', // violet-800
        '#1e1e78' // violet-900
      ]
    }
  ],
  [
    AllColorsEnum.Purple,
    {
      colors: [
        '#f5f3ff', // purple-50
        '#ede9fe', // purple-100
        '#e0cafe', // purple-200
        '#c4b5fd', // purple-300
        '#a855f7', // purple-400
        '#9333ea', // purple-500
        '#7e22ce', // purple-600
        '#6b21a8', // purple-700
        '#581c87', // purple-800
        '#4c1d6e' // purple-900
      ]
    }
  ],
  [
    AllColorsEnum.Fuchsia,
    {
      colors: [
        '#fdf4ff', // fuchsia-50
        '#fae8ff', // fuchsia-100
        '#f5d0fe', // fuchsia-200
        '#f0abfc', // fuchsia-300
        '#e879f9', // fuchsia-400
        '#d946ef', // fuchsia-500
        '#a855f7', // fuchsia-600
        '#9333ea', // fuchsia-700
        '#7e22ce', // fuchsia-800
        '#581c87' // fuchsia-900
      ]
    }
  ],

  [
    AllColorsEnum.Pink,
    {
      colors: [
        '#fdf2f8', // pink-50
        '#fce7f3', // pink-100
        '#fbcfe8', // pink-200
        '#f9a8d4', // pink-300
        '#f472b6', // pink-400
        '#ec4899', // pink-500
        '#db2777', // pink-600
        '#be185d', // pink-700
        '#9d174d', // pink-800
        '#831843' // pink-900
      ]
    }
  ],
  [
    AllColorsEnum.Rose,
    {
      colors: [
        '#fff1f2', // rose-50
        '#ffe4e6', // rose-100
        '#fecdd3', // rose-200
        '#fda4af', // rose-300
        '#fb7185', // rose-400
        '#f43f5e', // rose-500
        '#e11d48', // rose-600
        '#be123c', // rose-700
        '#9f1239', // rose-800
        '#7f1d1b' // rose-900
      ]
    }
  ],
  [
    AllColorsEnum.Slate,
    {
      colors: [
        '#f8fafb', // slate-50
        '#f1f5f9', // slate-100
        '#e2e8f0', // slate-200
        '#cbd5e1', // slate-300
        '#94a3b8', // slate-400
        '#64748b', // slate-500
        '#475569', // slate-600
        '#334155', // slate-700
        '#1e293b', // slate-800
        '#0f172a' // slate-900
      ]
    }
  ],
  [
    AllColorsEnum.Gray,
    {
      colors: [
        '#f9fafb', // gray-50
        '#f3f4f6', // gray-100
        '#e5e7eb', // gray-200
        '#d1d5db', // gray-300
        '#9ca3af', // gray-400
        '#6b7280', // gray-500
        '#4b5563', // gray-600
        '#374151', // gray-700
        '#1f2937', // gray-800
        '#111827' // gray-900
      ]
    }
  ],
  [
    AllColorsEnum.Zinc,
    {
      colors: [
        '#fafafa', // zinc-50
        '#f4f4f5', // zinc-100
        '#e4e4e7', // zinc-200
        '#d4d4d8', // zinc-300
        '#a1a1aa', // zinc-400
        '#71717a', // zinc-500
        '#52525b', // zinc-600
        '#3f3f46', // zinc-700
        '#27272a', // zinc-800
        '#18181b' // zinc-900
      ]
    }
  ],
  [
    AllColorsEnum.Neutral,
    {
      colors: [
        '#fafafa', // neutral-50
        '#f5f5f5', // neutral-100
        '#e5e5e5', // neutral-200
        '#d4d4d4', // neutral-300
        '#a1a1a1', // neutral-400
        '#737373', // neutral-500
        '#525252', // neutral-600
        '#404040', // neutral-700
        '#262626', // neutral-800
        '#171717' // neutral-900
      ]
    }
  ],
  [
    AllColorsEnum.Stone,
    {
      colors: [
        '#fafaf9', // stone-50
        '#f5f4f2', // stone-100
        '#e7e5e4', // stone-200
        '#d6d3d1', // stone-300
        '#a8a29e', // stone-400
        '#786e6d', // stone-500
        '#57534e', // stone-600
        '#44403c', // stone-700
        '#292524', // stone-800
        '#1c1917' // stone-900
      ]
    }
  ]
])
export interface HSVType {
  h: number
  s: number
  v: number
}
