import {
  ChangeEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
} from 'react'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

import { ChevronDown } from './Icon'
import { T } from './T'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

type InputSize = 'large' | 'medium' | 'small'

const inputBaseStyle =
  'w-full bg-white transition-all ring-0 ring-transparent text-gray placeholder:text-gray-400 border-2 focus:outline-0'

const inputShape: { [K in InputSize]: string } = {
  large: 'text-base rounded-[6px] px-3 py-[14px]',
  medium: 'text-small rounded-[6px] px-3 py-[10px]',
  small: 'text-small rounded-[6px] px-3 py-1',
}

type InputLabelProps = {
  isLoading?: boolean
  label?: ReactNode
  support?: ReactNode
  optional?: ReactNode
  link?: ReactNode
}

export const InputLabel: FC<InputLabelProps> = ({
  label,
  optional,
  support,
}) => {
  if (!label && !optional && !support) return null

  return (
    <>
      <div className="flex gap-3">
        <T size="small" bold>
          {label}{' '}
          {optional && (
            <T size="xsmall" className="font-normal" color="500">
              {optional}
            </T>
          )}
        </T>
      </div>
      {support && (
        <T size="small" block color="500">
          {support}
        </T>
      )}
    </>
  )
}

type InputMessageProps = {
  message?: ReactNode
  error?: boolean | string
}

export const InputMessage: FC<InputMessageProps> = ({ message, error }) => {
  const errorMessage = typeof error === 'string' ? error : undefined
  if (!message && !errorMessage) return null

  return (
    <div>
      <T size="small" color={errorMessage ? 'red' : '500'}>
        {errorMessage || message}
      </T>
    </div>
  )
}

type InputContainerProps = {
  containerClassName?: string
}

type InputProps = {
  inputSize?: InputSize
  onChangeText?: (v: string, e: ChangeEvent<HTMLInputElement>) => void
  testId?: string
} & InputMessageProps &
  InputContainerProps &
  InputLabelProps &
  Partial<MaskedInputProps>

export const TextInput = forwardRef<MaskedInput, InputProps>(
  (
    {
      isLoading,
      inputSize = 'medium' as InputSize,
      testId,
      disabled,
      label,
      support,
      optional,
      message,
      error,
      className,
      containerClassName,
      onChangeText,
      onChange,
      mask = false,
      ...rest
    },
    ref
  ) => {
    const errorMessage = typeof error === 'string' ? error : undefined

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText ? onChangeText(e.target.value, e) : onChange?.(e)
      },
      [onChangeText, onChange]
    )

    return (
      <div
        className={`inline-block ${
          isLoading ? 'pointer-events-none animate-loading opacity-50' : ''
        } ${containerClassName || ''}`}
      >
        <InputLabel label={label} optional={optional} support={support} />
        <MaskedInput
          mask={mask}
          ref={ref}
          data-testid={testId}
          disabled={disabled}
          onChange={handleChange}
          className={`
          ${label || support ? 'mt-2' : ''}
          ${errorMessage || message ? 'mb-2' : ''}
          ${inputBaseStyle}
          ${inputShape[inputSize]}
          ${disabled ? 'text-gray-300' : 'border-gray-200'} 
          ${error ? 'border-red-800' : 'focus:border-purple-600'}
          ${className || ''}`}
          {...rest}
        />
        <InputMessage error={error} message={message} />
      </div>
    )
  }
)

const selectShape: { [K in InputSize]: string } = {
  large: 'text-base rounded-[6px] px-3 py-[14px] h-[54px]',
  medium: 'text-small rounded-[6px] px-3 py-[10px] h-[46px]',
  small: 'text-small rounded-[6px] px-3 py-0.5 h-[32px]',
}

const selectPlaceholderShape: { [K in InputSize]: string } = {
  large: 'h-[54px]',
  medium: 'h-[46px]',
  small: 'h-[32px]',
}

type SelectOption<T> = {
  value: T
  label: string
}

type SelectProps<T> = {
  isLoading?: boolean
  inputSize?: InputSize
  testId?: string
  options: SelectOption<T>[]
  optionClassName?: string
  onChangeValue: (v: T, e: ChangeEvent<HTMLSelectElement>) => void
} & InputMessageProps &
  InputContainerProps &
  InputLabelProps &
  InputHTMLAttributes<HTMLSelectElement>

function SelectInter<T>(
  {
    isLoading,
    inputSize = 'medium' as InputSize,
    value,
    testId,
    options,
    disabled,
    label,
    support,
    optional,
    link,
    placeholder,
    message,
    error,
    onChangeValue,
    containerClassName,
    optionClassName,
    className,
    ...rest
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const errorMessage = typeof error === 'string' ? error : undefined

  return (
    <div
      className={`inline-block ${
        isLoading ? 'pointer-events-none animate-loading opacity-50' : ''
      }  ${containerClassName || ''}`}
    >
      <InputLabel
        label={label}
        optional={optional}
        support={support}
        link={link}
      />
      <div
        className={`relative flex items-center
      ${label || support ? 'mt-2' : ''}
      ${errorMessage || message ? 'mb-2' : ''}`}
      >
        <select
          ref={ref}
          value={value}
          defaultValue={placeholder ? '' : undefined}
          placeholder={placeholder}
          data-testid={testId}
          disabled={disabled}
          onChange={(e) => onChangeValue(e.target.value as T, e)}
          className={`
          ${inputBaseStyle}
          ${selectShape[inputSize]}
          bg-white ${disabled ? 'text-gray-300' : 'border-gray-200'} 
          appearance-none
          pr-12
          ${error ? 'border-red-800' : 'focus:border-purple-600'}
          ${className || ''}`}
          {...rest}
        >
          <option
            value=""
            hidden
            className={`text-gray-400 ${optionClassName || ''}`}
          />
          {options.map((o) => (
            //@ts-expect-error oh fuck off
            <option value={o.value} key={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
        {(value === undefined || value === '') && (
          <T
            block
            color="400"
            size="small"
            className={`pointer-events-none absolute ${selectPlaceholderShape[inputSize]} left-3 right-12 flex flex-col justify-center overflow-hidden`}
          >
            {placeholder}
          </T>
        )}
        <span className="pointer-events-none absolute right-1 text-gray-500">
          <ChevronDown />
        </span>
      </div>
      <InputMessage error={error} message={message} />
    </div>
  )
}

export const Select = forwardRef(SelectInter)
