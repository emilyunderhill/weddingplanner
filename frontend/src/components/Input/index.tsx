import React, { ChangeEvent, FC } from "react"

type Props<T> = {
  label: string
  labelPosition: 'top' | 'left'
  value: T
  onChange: (value: T) => void
  type?: string
}

type T = string | number

const Input: FC<Props<T>> = ({label, labelPosition, value, onChange, type}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    onChange(value)
  }

  return (
    <div className={labelPosition === 'top' ? 'flex-column' : 'flex-row'}>
      <p>
        {label}
      </p>
      <input
        value={value}
        onChange={handleOnChange}
        type={type}
      />
    </div>
  )
}

export default Input
