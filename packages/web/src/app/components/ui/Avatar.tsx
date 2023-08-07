import { FC, HTMLAttributes } from 'react'

const avatarShape: { [K in AvatarSize]: string } = {
  xl: 'w-24 h-24 text-lg',
  lg: 'w-12 h-12 text-lg',
  md: 'w-10 h-10 text-lg',
  sm: 'w-6 h-6 text-base',
}

const avatarRound: { [K in AvatarSize]: string } = {
  xl: 'rounded-5',
  lg: 'rounded-5',
  md: 'rounded-4',
  sm: 'rounded-2',
}

type AvatarSize = 'lg' | 'md' | 'sm' | 'xl'

export type AvatarProps = {
  rounded?: boolean
  name?: string
  imageUrl?: string | null
  size?: AvatarSize
} & HTMLAttributes<HTMLDivElement>

export const Avatar: FC<AvatarProps> = ({
  name = '',
  rounded,
  size = 'md',
  imageUrl,
  onClick,
  children,
  className,
  ...rest
}) => {
  const initials =
    !imageUrl &&
    name
      ?.split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')

  return (
    <div
      onClick={onClick}
      style={
        imageUrl
          ? {
              backgroundSize: 'cover',
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center center',
            }
          : undefined
      }
      className={`${avatarShape[size]} ${
        rounded ? 'rounded-full' : avatarRound[size]
      } relative uppercase bg-accent/25 font-bold flex justify-center items-center aspect-square text-white

        ${
          onClick
            ? 'cursor-pointer ring-purple-600 hover:ring-2 transition-all'
            : ''
        }
        ${className || ''}`}
      {...rest}
    >
      {children || initials}
    </div>
  )
}
