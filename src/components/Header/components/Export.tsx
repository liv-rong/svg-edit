import type { ImgConfigType } from '@/types/export'

interface Props {
  imgPreview: string
  setImgPreview: (value: string) => void
  handleExport: (config?: ImgConfigType) => Promise<string | undefined>
}

const Export = (props: Props) => {
  const { imgPreview, setImgPreview, handleExport } = props

  const [imgType, setImgType] = useState('image/png')

  const handleImg = async (value?: string) => {
    const res = await handleExport({
      mimeType: value ?? imgType
    })
    if (!res) return
    setImgPreview(res)
  }

  useEffect(() => {
    handleImg()
  }, [])

  return (
    <>
      <p className="mb-1">格式</p>
      <Select
        defaultValue="PNG"
        style={{ width: '100%' }}
        onChange={(value) => {
          setImgType(value)
          handleImg(value)
        }}
        options={[
          { value: 'image/png', label: 'PNG' },
          { value: 'image/jpeg', label: 'JPEG' }
        ]}
      />
      {imgPreview && (
        <img
          src={imgPreview}
          alt=""
        />
      )}
    </>
  )
}

export default Export
