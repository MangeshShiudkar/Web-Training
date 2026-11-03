import type { HTMLAttributes, ReactNode } from 'react'
import { cardBase } from './Card.css.ts'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
}

function Card({ children, className, ...props }: CardProps) {
  const classes = [cardBase, className].filter(Boolean).join(' ')

  return (
    <article className={classes} {...props}>
      {children}
    </article>
  )
}

export { Card }