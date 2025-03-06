import { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  tooltip?: string
  onClick?: () => void
  children?: ReactNode
}

const IconStyle = (props: Props) => {
  const { icon, tooltip, onClick, children } = props
  return (
    <Tooltip title={tooltip}>
      <div
        className="h-12 w-12 rounded hover:bg-[#9f7aea]/20 flex justify-center items-center cursor-pointer"
        onClick={onClick}
      >
        {icon}
        {children}
      </div>
    </Tooltip>
  )
}

export default IconStyle
