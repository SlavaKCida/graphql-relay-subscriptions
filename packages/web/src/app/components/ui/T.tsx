import { FC, HTMLAttributes } from 'react'

export type TextSize =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall'
  | 'xxsmall'

export type TextColor =
  | 'white'
  | 'white/50'
  | 'white/75'
  | 'accent'
  | 'gray'
  | 'blue'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'red'
  | '800'
  | '700'
  | '500'
  | '400'
  | '200'
  | '100'

/*

h1
font-size: 32px;
line-height: 40px;

h2
font-size: 24px;
line-height: 36px;

h3
font-size: 20px;
line-height: 32px;

h4
font-size: 16px;
line-height: 28px;

h5
font-size: 14px;
line-height: 20px;

h6
font-size: 12px;
line-height: 18px;

xlarge
font-size: 20px;
line-height: 28px;

large
font-size: 18px;
line-height: 30px;

medium
font-size: 16px;
line-height: 24px;

small
font-size: 14px;
line-height: 22px;

xsmall
font-size: 12px;
line-height: 16px;

xxsmall
font-size: 11px;
line-height: 14px;

*/

export type TextProps = {
  testId?: string
  color?: TextColor
  size?: TextSize
  bold?: boolean
  centered?: boolean
  block?: boolean
  placeholder?: boolean
} & Omit<HTMLAttributes<HTMLSpanElement>, 'placeholder'>

const textSize: { [k in TextSize]: string } = {
  h0: 'text-h0  font-telegraf',
  h1: 'text-h1 font-telegraf',
  h2: 'text-h2 font-telegraf',
  h3: 'text-h3 font-telegraf',
  h4: 'text-h4 font-telegraf',
  h5: 'text-h5 font-telegraf',
  h6: 'text-h6 font-telegraf',
  xlarge: 'text-xlarge',
  large: 'text-large',
  medium: 'text-medium',
  small: 'text-small',
  xsmall: 'text-xsmall',
  xxsmall: 'text-xxsmall',
}

const textColor: { [k in TextColor]: string } = {
  white: 'text-white',
  'white/50': 'text-white/50',
  'white/75': 'text-white/75',
  accent: 'text-accent',
  gray: 'text-gray',
  green: 'text-green-800',
  blue: 'text-blue-800',
  purple: 'text-purple-500',
  yellow: 'text-yellow-900',
  red: 'text-red-800',
  '800': 'text-gray-800',
  '700': 'text-gray-700',
  '500': 'text-gray-500',
  '400': 'text-gray-400',
  '200': 'text-gray-200',
  '100': 'text-gray-100',
}

export const T: FC<TextProps> = ({
  testId,
  children,
  className,
  bold,
  block,
  centered,
  placeholder,
  size = 'medium',
  color,
  ...rest
}) => {
  return (
    <span
      data-testid={testId}
      className={`${textSize[size]} ${block ? 'block' : ''} ${
        centered ? 'text-center' : ''
      } ${!placeholder && color ? textColor[color] : ''} ${
        bold ? 'font-bold' : ''
      }
      
      ${
        placeholder
          ? 'animate-loading rounded-4 bg-gray-200/20 text-transparent'
          : ''
      }
      ${className || ''}`}
      {...rest}
    >
      {children}
    </span>
  )
}
