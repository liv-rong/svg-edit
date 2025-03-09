import { Divider, Slider } from 'antd'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { AllColorsEnum, allColorsMap, HSVType } from '@/types/color'
import { useCanvasStore } from '@/store/canvas'
import { useShallow } from 'zustand/shallow'

interface Props {
  handleStyleCSS: (value: any) => void
  handleAIChangeColor: (value: AllColorsEnum | null) => void
  handleReplaceColors: (value: string[]) => void
  setCurrentColors: (value: string[]) => void
  currentColors: string[]
}

interface HSVCompProps {
  label: string
  max?: number
  min?: number
  value: number
  name: string
  step?: number
  handleValue?: (value: number) => void
}

const HSVComp = (props: HSVCompProps) => {
  const { label, max, min, value, handleValue, step } = props
  return (
    <div>
      <div className="w-full  justify-between flex  items-center">
        <span className="">{label}</span>
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
  const {
    handleStyleCSS,
    handleAIChangeColor,
    handleReplaceColors,
    setCurrentColors,
    currentColors
  } = props

  const { currentShape } = useCanvasStore(
    useShallow((state) => ({
      currentShape: state.currentShape
    }))
  )

  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [value, setValue] = useState(0)

  const getColor = ({ h, s, v }: HSVType) => {
    const color = tinycolor({ h, s, v })
    return color.toHexString()
  }

  const sliders: HSVCompProps[] = [
    {
      value: hue,
      label: '色相',
      name: 'hue',
      max: 180,
      min: -180,
      handleValue: (value: number) => {
        setHue(value)
        handleStyleCSS({ hue: mapRange(value, -180, 180, 0, 360) })
      }
    },
    {
      value: saturation,
      label: '饱和度',
      name: 'saturation',
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
      name: 'value',
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
  // 首先判断currentShape 是否存在

  const preview = () => {
    if (!currentShape) return false
    if (typeof currentShape.toDataURL === 'function' && currentShape.toDataURL()) {
      return true
    }
    return false
  }

  return (
    <div className="p-2">
      {preview() && (
        <>
          <div className="w-full h-40 bg-white flex justify-center items-center overflow-hidden">
            <img
              src={currentShape?.toDataURL()}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <Divider />
        </>
      )}
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-bold ">AI 一键改色</p>
        <Button
          type="text"
          onClick={() => handleAIChangeColor(null)}
        >
          重置
        </Button>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className="w-full grid grid-cols-3 gap-2 mb-2">
          {Object.values(AllColorsEnum).map((item) => (
            <div
              key={item}
              className="h-10  flex justify-center items-center "
              onClick={() => {
                handleAIChangeColor(item)
              }}
            >
              <div className="grid grid-cols-2 size-8 grid-rows-2 gap-y-0.5 cursor-pointer">
                <div
                  style={{
                    background: allColorsMap.get(item)?.colors[5]
                  }}
                />
                <div
                  style={{
                    background: allColorsMap.get(item)?.colors[4]
                  }}
                />
                <div
                  style={{
                    background: allColorsMap.get(item)?.colors[2]
                  }}
                />
                <div
                  style={{
                    background: allColorsMap.get(item)?.colors[3]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {sliders.map((item, index) => (
          <HSVComp
            {...item}
            key={index}
          />
        ))}
      </div>

      <div>
        <p className="mb-2">配色自定义精修</p>
        <div className="flex justify-start items-center gap-2 w-full flex-wrap">
          {currentColors.map((item, index) => (
            <div key={index}>
              <ColorPicker
                size="small"
                value={item}
                onChangeComplete={(color) => {
                  const newColors = [...currentColors]
                  newColors[index] = color.toHexString()
                  setCurrentColors(newColors)
                  handleReplaceColors(newColors)
                }}
              />
            </div>
          ))}
        </div>
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
