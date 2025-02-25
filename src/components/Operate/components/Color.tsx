import { Divider, Slider } from 'antd'
import { useState } from 'react'
import tinycolor from 'tinycolor2'

const Color = () => {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)

  const handleHueChange = (value) => {
    setHue(value)
  }

  const handleSaturationChange = (value) => {
    setSaturation(value)
  }

  const getColor = () => {
    const color = tinycolor({ h: hue, s: saturation, v: 100 })
    return color.toHexString()
  }

  return (
    <div className="p-2">
      <div>
        <div className="w-full  justify-start flex gap-4 items-center">
          <span>色相度</span>
          <span
            style={{
              backgroundColor: tinycolor({ h: hue, s: 100, v: 100 }).toHexString(),
              display: 'inline-block',
              width: '20px',
              height: '20px'
            }}
          ></span>
        </div>

        <Slider
          min={0}
          max={360}
          value={hue}
          onChange={handleHueChange}
          className="w-[200px]"
        />
      </div>
      <div>
        <div className="w-full  justify-start flex gap-4 items-center">
          <span>饱和度</span>
          <span
            style={{
              backgroundColor: tinycolor({ h: hue, s: saturation, v: 100 }).toHexString(),
              display: 'inline-block',
              width: '20px',
              height: '20px'
            }}
          ></span>
        </div>
        <Slider
          min={0}
          max={100}
          value={saturation}
          onChange={handleSaturationChange}
        />
      </div>
      <Divider />
      <div>
        <p className="text-base font-bold mb-2">描边线</p>
        <ColorPicker defaultValue="#1677ff" />
      </div>
      <Divider />
      <div>
        <p className="text-base font-bold mb-2">填充色</p>
      </div>
    </div>
  )
}

export default Color
