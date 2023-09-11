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
  const variantClass = () => {
    if (isDisabled) {
      return 'button-disabled'
    }

    switch (variant) {
      case 'primary':
        return 'button-primary'
      default:
        break;
    }
  }

  return (
    <div className={`button ${variantClass()} ${isFullWidth ? 'full-width' : ''}`} onClick={action}>
      {content}
    </div>
  )
}

export default Button
