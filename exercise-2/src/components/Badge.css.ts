import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../theme.css'

export const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  minHeight: '1.75rem',
  padding: `0 ${vars.space.medium}`,
  borderRadius: vars.radius.pill,
  fontSize: '0.75rem',
  fontWeight: 700,
  lineHeight: 1,
})

export const badgeVariants = styleVariants({
  success: {
    background: vars.color.successSoft,
    color: vars.color.success,
  },
  warning: {
    background: vars.color.warningSoft,
    color: vars.color.warning,
  },
  error: {
    background: vars.color.dangerSoft,
    color: vars.color.danger,
  },
})