import { FC, ReactNode } from "react";
import './style.scss'

type Variants = {
  primary: 'primary',
  destructive: 'destructive',
  warning: 'warning',
  subtle: 'subtle',
}

type VariantKey = keyof Variants
type Variant = Variants[VariantKey]

type Props = {
  action: () => void
  content: string|ReactNode
  variant: Variant
  isDisabled?: boolean
  isFullWidth?: boolean
}

const Button: FC<Props> = ({
  action,
  content,
  variant,
  isDisabled,
  isFullWidth
}) => {
  return (
    <button className="button-primary" onClick={action}>
      {content}
    </button>
  )
}

export default Button
