import { FC, HTMLAttributes, PropsWithChildren } from 'react'

import { ActivityIndicator } from './ActivityIndicator/ActivityIndicator'

type ButtonSize = 'large' | 'medium' | 'small' | 'xsmall'
type ButtonColor = 'accent' | 'gray'
type ButtonVariant = 'filled' | 'outlined' | 'ghost'

type ButtonProps = {
  testId?: string
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
  disabled?: boolean
  isFetching?: boolean
} & HTMLAttributes<HTMLDivElement>

const buttonShape: { [K in ButtonSize]: string } = {
  large: 'gap-1 px-6 h-14 rounded-4 text-medium font-bold',
  medium: 'gap-1 px-5 h-11 rounded-[10px]  text-small font-bold',
  small: 'gap-0.5 px-4 h-11 rounded-2  text-xsmall font-bold',
  xsmall: 'gap-0.5 px-2 h-6 rounded-[6px]  text-xxsmall font-bold',
}

const buttonColor = {
  accent_filled:
    'text-white bg-accent hover:bg-purple-600 active:bg-purple-800',
  accent_outlined:
    'text-purple-600 hover:text-purple-800 border-1.5 border-gray-100 hover:border-gray-200 active:bg-purple-100',
  accent_ghost: 'text-purple-600 hover:text-purple-800 active:bg-purple-100',

  gray_filled: 'text-gray bg-gray-100 hover:bg-gray-200 active:bg-gray-300',
  gray_outlined:
    'text-gray border-1.5 border-gray-200 hover:bg-gray-100 active:bg-gray-200 active:border-gray-700',
  gray_ghost: 'text-gray hover:bg-gray-100 active:bg-gray-200',
}

const disabledButton = {
  filled: 'text-gray-500 bg-gray-200',
  outlined: 'text-gray-500 border-1.5 border-gray-200',
  ghost: 'text-gray-500',
}

const containerShape = 'flex min-h-full justify-center items-center'

export const Button: FC<ButtonProps> = ({
  testId,
  variant = 'outlined',
  size = 'medium',
  color = 'accent',
  disabled,
  isFetching,
  children,
  onClick,
  className,
  ...rest
}) => {
  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={`
      antialiased inline-block transition-all relative
      ${buttonShape[size]}
      ${isFetching || disabled ? 'pointer-events-none' : 'cursor-pointer'}
      ${isFetching && 'opacity-60'}
      ${disabled ? disabledButton[variant] : buttonColor[`${color}_${variant}`]}
       ${className || ''}`}
      {...rest}
    >
      <div className={`${containerShape} ${isFetching ? 'opacity-0' : ''}`}>
        {children}
      </div>
      {isFetching && <ButtonLoader />}
    </div>
  )
}

const ButtonLoader = () => (
  <ActivityIndicator className='absolute top-0 left-0 right-0 bottom-0 scale-50' />
)

type IconButtonProps = PropsWithChildren<{
  isFetching?: boolean
  disabled?: boolean
  size?: ButtonSize
}> &
  HTMLAttributes<HTMLDivElement>

const iconButtonShape: { [K in ButtonSize]: string } = {
  large: 'h-14 w-14 rounded-4',
  medium: 'h-11 w-11 rounded-[10px]',
  small: 'h-8 w-8 rounded-2',
  xsmall: 'h-6 w-6 rounded-[6px]',
}

export const IconButton: FC<IconButtonProps> = ({
  size = 'medium',
  disabled,
  isFetching,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={`${iconButtonShape[size]}
      ${isFetching && 'opacity-60'}
      ${isFetching || disabled ? 'pointer-events-none' : 'cursor-pointer'}
      relative inline-block justify-center items-center ${
        disabled ? 'text-gray-300' : 'text-gray-700'
      } hover:bg-gray-100 active:bg-gray-200 ${className || ''}`}
      {...rest}
    >
      <div className={`${containerShape} ${isFetching ? 'opacity-0' : ''}`}>
        {children}
      </div>
      {isFetching && <ButtonLoader />}
    </div>
  )
}
