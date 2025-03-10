import { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  tooltip?: string
  onClick?: () => void
  children?: ReactNode
  className?: string
}

const IconStyle = (props: Props) => {
  const { icon, tooltip, onClick, children, className } = props
  return (
    <Tooltip title={tooltip}>
      <div
        className={classNames(
          'h-12 w-12 rounded hover:bg-[#9f7aea]/20 flex justify-center items-center cursor-pointer',
          className
        )}
        onClick={onClick}
      >
        {icon}
        {children}
      </div>
    </Tooltip>
  )
}

export default IconStyle
