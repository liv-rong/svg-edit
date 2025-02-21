import { CSSProperties, ReactNode } from 'react'

const OperateItem = ({
  icon,
  style,
  className
}: {
  icon?: ReactNode
  style?: CSSProperties
  className?: string
}) => (
  <span
    className={classNames('text-2xl bg-red-500', className)}
    style={style}
  >
    {icon}
  </span>
)

export default memo(OperateItem)
