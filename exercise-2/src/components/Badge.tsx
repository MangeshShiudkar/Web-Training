import type { HTMLAttributes, ReactNode } from 'react'
import { badgeBase, badgeVariants } from './Badge.css.ts'

export type BadgeVariant = keyof typeof badgeVariants

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant: BadgeVariant
}

function Badge({ children, variant, className, ...props }: BadgeProps) {
  const classes = [badgeBase, badgeVariants[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

export { Badge }