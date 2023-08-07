import { FC, HTMLAttributes } from 'react'

export const Divider: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div className={`border-b border-gray-100/30 ${className || ''}`} {...rest} />
)
