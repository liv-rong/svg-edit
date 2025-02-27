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
      <div className="w-full  justify-between flex  items-center">
        <span className="bg-red-200">{label}</span>
        <span className="bg-red-300">{label}</span>
        <span className="bg-red-400">{label}</span>
        <InputNumber
          min={min ?? 0}
          max={max ?? 100}
          size="small"
          value={value}
          step={step ?? 1}
          changeOnWheel
          onChange={(value) => handleValue?.(value ?? 0)}
        />
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

  const getColor = ({ h, s, v }: { h: number; s: number; v: number }) => {
    const color = tinycolor({ h, s, v })
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
        handleStyleCSS({ hue: value })
      }
    },
    {
      value: saturation,
      label: '饱和度',
      key: 'hue',
      max: 100,
      min: -100,
      handleValue: (value: number) => {
        setSaturation(value)
        handleStyleCSS({ saturation: mapRange(value, -100, 100, -10, 10) })
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
        handleStyleCSS({ value: mapRange(value, -100, 100, -4, 4) })
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

      <div className="flex justify-center items-center w-full ">
        <div className="w-full grid grid-cols-3 gap-x-2 gap-y-2 mb-2 ">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="w-8 h-8 grid grid-cols-2 grid-rows-2 gap-y-0.5 cursor-pointer"
              onClick={() => handleAIChangeColor()}
            >
              <div
                style={{
                  background: getColor({ h: index * 30 + 15, s: 100, v: 100 })
                }}
              />
              <div
                style={{
                  background: getColor({ h: index * 30, s: 50, v: 100 })
                }}
              />
              <div
                style={{
                  background: getColor({ h: index * 30 - 15, s: 100, v: 100 })
                }}
              />
              <div
                style={{
                  background: getColor({ h: index * 30, s: 50, v: 100 })
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {sliders.map((item) => (
          <HSVComp {...item} />
        ))}
      </div>

      <div>
        <p className="mb-2">配色自定义精修</p>
        <ColorPicker
          defaultValue={`oklch(0.971 0.013 17.38)`}
          size="small"
        />
      </div>
      <Divider />
      <div>
        <p className="text-base font-bold mb-2">描边线</p>
        <ColorPicker
          allowClear
          defaultValue="#1677ff"
          size="small"
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
          size="small"
          onChange={(value) => {
            handleStyleCSS({ fill: value.toHexString() })
          }}
        />
      </div>
    </div>
  )
}

export default Color
