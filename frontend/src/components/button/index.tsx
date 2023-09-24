import React, { FC, ReactNode } from "react";
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

type Variants = {
  primary: 'primary',
  destructive: 'destructive',
  warning: 'warning',
  subtle: 'subtle',
  link: 'link',
  linkDestructive: 'link-destructive',
}

type VariantKey = keyof Variants
type Variant = Variants[VariantKey]

type Props = {
  action: () => void
  content: string|ReactNode
  variant: Variant
  isDisabled?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
}

const Button: FC<Props> = ({
  action,
  content,
  variant,
  isDisabled,
  isFullWidth,
  isLoading
}) => {

  const variantClass = () => {
    if (isDisabled) {
      return 'button-disabled'
    }

    switch (variant) {
      case 'primary':
        return 'button-primary'
      case 'link':
        return 'button-link link'
      case 'link-destructive':
        return 'link button-link-destructive'
      default:
        break;
    }
  }

  return (
    <div className={`button ${variantClass()} ${isFullWidth ? 'full-width' : ''}`} onClick={action}>
      {isLoading ? <FontAwesomeIcon icon={solid("spinner")} spin={true} /> : content}
    </div>
  )
}

export default Button
