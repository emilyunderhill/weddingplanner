import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import './style.scss'
import { ValidationError } from "../../redux/auth/types"

type Props<T> = {
  name: string
  label: string
  labelPosition: 'top' | 'left'
  value: T
  onChange: (value: T) => void
  type?: string
  errors?: ValidationError
  placeholder?: string
}

type T = string | number

const Input: FC<Props<T>> = ({
  name,
  label,
  labelPosition,
  value,
  onChange,
  type,
  errors,
  placeholder
}) => {
  const [errorData, setErrorData] = useState<undefined | string[]>(undefined)

  useEffect(() => {
    if (errors && errors[name]) {
      setErrorData(errors[name])
    }
  }, [errors])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setErrorData(undefined)

    onChange(value)
  }

  return (
    <div className={`w-full ${labelPosition === 'top' ? 'flex-column' : 'flex-row'}`}>
      <p className="mb-0 pb-0">
        {label}
      </p>
      <input
        value={value}
        onChange={handleOnChange}
        type={type}
        className={`input ${errorData ? 'input-error' : ''}`}
        placeholder={placeholder}
      />
      {!!errorData && (
        errorData.map((error) => (
          <p className="error helpertext" key={error}>
            {error}
          </p>)
        )
      )}
    </div>
  )
}

export default Input
