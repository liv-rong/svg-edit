import { CSSProperties, ReactNode } from 'react'

const CommonIcon = ({
  icon,
  style,
  className,
  tooltip,
  onClick
}: {
  icon?: ReactNode
  style?: CSSProperties
  className?: string
  tooltip?: string
  onClick?: () => void
}) => (
  <Tooltip title={tooltip}>
    <span
      className={classNames(
        'text-3xl inline-flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:rounded border border-white bg-white ',
        className
      )}
      style={style}
      onClick={() => onClick?.()}
    >
      {icon}
    </span>
  </Tooltip>
)

export default memo(CommonIcon)
