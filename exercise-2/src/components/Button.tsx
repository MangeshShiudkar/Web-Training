import type { ButtonHTMLAttributes } from 'react'
import { buttonBase, buttonSizes, buttonVariants } from './Button.css.ts'

export type ButtonVariant = keyof typeof buttonVariants
export type ButtonSize = keyof typeof buttonSizes

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

function Button({ variant = 'primary', size = 'large', className, ...props }: ButtonProps) {
  const classes = [buttonBase, buttonVariants[variant], buttonSizes[size], className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} {...props} />
}

export { Button }