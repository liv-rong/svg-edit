import text1 from '@/assets/svg/text1.svg'
import text2 from '@/assets/svg/text2.svg'
import text3 from '@/assets/svg/test3.svg'
import text4 from '@/assets/svg/text4.svg'
import text5 from '@/assets/svg/text5.svg'
import svg1 from '@/assets/svg/svg1.svg'
import svg2 from '@/assets/svg/svg1.svg'
import { ShapeIcon, ColorIcon, TextIcon, LoadingSvg, ShareLinkSvg } from '@/assets/svg/index'
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

  // const svgElement = [ShapeIcon, ColorIcon, TextIcon, LoadingSvg, ShareLinkSvg]

  const svgElement = [LoadingSvg]

  const svgElement2 = [text1, text2, text3, text4]

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
        <img
          onClick={() => handleSvg(text3)}
          src={text3}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(text2)}
          src={text2}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(text1)}
          src={text1}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(text4)}
          src={text4}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(text5)}
          src={text5}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(svg1)}
          src={svg1}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
        <img
          onClick={() => handleSvg(svg2)}
          src={svg2}
          alt=""
          className="h-16 w-16 border bg-white cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Material
