import { Divider, Slider } from 'antd'
import { useState } from 'react'
import tinycolor from 'tinycolor2'

interface Props {
  handleStyleCSS: (value: any) => void
  handleAIChangeColor: (value?: any) => void
}

interface HSVCompProps {
  label: string
  max?: number
  min?: number
  value: number
  key: string
  step?: number
  handleValue?: (value: number) => void
}

const HSVComp = (props: HSVCompProps) => {
  const { label, max, min, value, handleValue, step } = props
  return (
    <div>
      <div className="w-full  justify-start flex gap-4 items-center">
        <span>{label}</span>
      </div>

      <Slider
        min={min ?? 0}
        max={max ?? 100}
        value={value}
        step={step ?? 1}
        onChange={handleValue}
        className="w-[200px]"
      />
    </div>
  )
}

const Color = (props: Props) => {
  const { handleStyleCSS, handleAIChangeColor } = props
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [value, setValue] = useState(0)

  const getColor = () => {
    const color = tinycolor({ h: hue, s: saturation, v: value })
    return color.toHexString()
  }

  const sliders: HSVCompProps[] = [
    {
      value: hue,
      label: '色相',
      key: 'hue',
      max: 180,
      min: -180,
      handleValue: (value: number) => {
        setHue(value)
        handleStyleCSS({ hue: value + 180 })
      }
    },
    {
      value: saturation,
      label: '饱和度',
      key: 'hue',
      max: 10,
      min: -2,
      step: 0.01,
      handleValue: (value: number) => {
        setSaturation(value)
        handleStyleCSS({ saturation: value })
      }
    },
    {
      value: value,
      label: '亮度',
      key: 'value',
      max: 100,
      min: -100,
      handleValue: (value: number) => {
        setValue(value)
        handleStyleCSS({ value: mapRange(value, -100, 100, -2, 2) })
      }
    }
  ]

  const mapRange = (
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
  ): number => {
    const mappedValue =
      ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin
    return mappedValue
  }

  return (
    <div className="p-2">
      <p className="text-base font-bold mb-2">AI 一键改色</p>
      <div>
        {sliders.map((item) => (
          <HSVComp {...item} />
        ))}
      </div>

      <Divider />
      <div>
        <p className="text-base font-bold mb-2">描边线</p>
        <ColorPicker
          allowClear
          defaultValue="#1677ff"
          onChange={(value) => {
            handleStyleCSS({ stroke: value.toHexString() })
          }}
        />
        <div className="space-x-1">
          <span className="text-xs">边线粗细</span>
          <InputNumber
            size="small"
            suffix="px"
            changeOnWheel
            min={0}
            max={100}
            className="!w-20"
            onChange={(value) => {
              handleStyleCSS({ strokeWidth: value })
            }}
          />
        </div>
      </div>
      <Divider />
      <div>
        <p className="text-base font-bold mb-2">填充色</p>
        <ColorPicker
          allowClear
          defaultValue="#1677ff"
          onChange={(value) => {
            handleStyleCSS({ fill: value.toHexString() })
          }}
        />
      </div>
    </div>
  )
}

export default Color
