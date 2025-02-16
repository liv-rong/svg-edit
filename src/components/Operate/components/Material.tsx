import text1 from '@/assets/svg/text1.svg'
import text2 from '@/assets/svg/text2.svg'
import text3 from '@/assets/svg/test3.svg'

const Material = () => {
  return (
    <div className="space-y-1">
      <img
        src={text1}
        alt=""
        className="h-16 w-16 border bg-white cursor-pointer"
      />
      <img
        src={text2}
        alt=""
        className="h-16 w-16 border bg-white cursor-pointer"
      />
      <img
        src={text3}
        alt=""
        className="h-16 w-16 border bg-white cursor-pointer"
      />
    </div>
  )
}

export default Material
