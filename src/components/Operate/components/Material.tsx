import text1 from '@/assets/svg/text1.svg'
import text2 from '@/assets/svg/text2.svg'
import text3 from '@/assets/svg/test3.svg'
import text4 from '@/assets/svg/text4.svg'
import text5 from '@/assets/svg/text5.svg'
import img1 from '@/assets/svg/image1.png'
import svg1Copy from '@/assets/svg/svg1.svg'
import {
  svg1,
  svg2,
  svg3,
  svg4,
  svg5,
  svg6,
  svg7,
  svg8,
  svg9,
  svg10,
  svg11,
  svg0
} from '@/assets/svg/svg8'
import type { ShapeEnum } from '@/types/shape'
import Konva from 'konva'

interface Props {
  handleSvg: (data: string) => void
  handleImg: (url: string) => void
  handleSvgParser: (svgString: string) => void
  addShape: (type: ShapeEnum, customConfig?: Partial<Konva.ShapeConfig>) => void
}

const Material = (props: Props) => {
  const { handleSvg, handleImg, handleSvgParser, addShape } = props

  const handleSvgLoad = async (svgUrl: string) => {
    const response = await fetch(svgUrl)
    const svgText = await response.text()
    handleSvgParser(svgText)
  }

  const svgElement = [svg0, svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8, svg9, svg10, svg11]

  const svgElement2 = [text1, text2, text3, text4]

  const svgDataUri = (svgString: string) =>
    'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)

  return (
    <div className="space-y-1">
      {svgElement2.map((item, index) => (
        <div key={index}>
          <img
            onClick={() => handleSvgLoad(item)}
            src={item}
            alt=""
            className="h-16 w-16 border bg-white cursor-pointer"
          />
        </div>
      ))}
      <div className="border-t">
        <p>svg整体导入</p>
        <div className="grid grid-cols-3 gap-2">
          {svgElement.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSvg(svgDataUri(item()))}
              className="flex items-center justify-center h-16 w-16 border border- overflow-hidden cursor-pointer"
            >
              {index}
              <img
                src={svgDataUri(item())}
                alt="SVG Image"
                className="svg-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Material
