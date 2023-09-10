import { FC, ReactNode } from "react";

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
    <button className="" onClick={action} disabled={isDisabled}>
      {content}
    </button>
  )
}

export default Button
