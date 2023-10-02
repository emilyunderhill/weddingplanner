import React, { FC } from "react"
import './style.scss'


type Props = {
  checked: boolean
  onChange: () => void
  label: string
  labelPosition: 'top' | 'left'
  name: string
}

const Toggle: FC<Props> = ({ checked, onChange, label, name, labelPosition }) => {
  return (
    <div className={labelPosition === 'left' ? 'felx-row' : 'flex-col'}>
      <p>
        {label}
      </p>
      <div className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} name={name} id={name} className="checkbox"/>
        <label className="label" htmlFor={name}>
              <span className="inner" />
              <span className="switch" />
            </label>
      </div>
    </div>
  )
}

export default Toggle
