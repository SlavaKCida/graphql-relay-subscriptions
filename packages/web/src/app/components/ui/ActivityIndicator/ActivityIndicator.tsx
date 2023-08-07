import { FC } from 'react'
import './ActivityIndicator.css'

export const ActivityIndicator: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    className={`flex justify-center flex-1 items-center ${className || ''}`}
    {...rest}
  >
    <div className='activity-indicator'>
      <div className='activity-indicator-dot'></div>
      <div className='activity-indicator-dot'></div>
      <div className='activity-indicator-dot'></div>
      <div className='activity-indicator-dot'></div>
      <div className='activity-indicator-dot'></div>
      <div className='activity-indicator-dot'></div>
    </div>
  </div>
)
