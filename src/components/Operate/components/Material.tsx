import text1 from '@/assets/svg/text1.svg'
import text2 from '@/assets/svg/text2.svg'
import text3 from '@/assets/svg/test3.svg'

interface Props {
  handleSvg: (data: string) => void
  handleImg: (url: string) => void
}

const Material = (props: Props) => {
  const { handleSvg, handleImg } = props

  return (
    <div className="space-y-1">
      <img
        onClick={() => handleImg(text1)}
        src={text1}
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
        onClick={() => handleSvg(text3)}
        src={text3}
        alt=""
        className="h-16 w-16 border bg-white cursor-pointer"
      />
    </div>
  )
}

export default Material
