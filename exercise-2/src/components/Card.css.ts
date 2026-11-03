import { style } from '@vanilla-extract/css'
import { vars } from '../theme.css'

export const cardBase = style({
  minWidth: 0,
  padding: vars.space.large,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.medium,
  background: vars.color.surface,
  boxShadow: vars.shadow.card,
  '@media': {
    'screen and (min-width: 700px)': {
      padding: vars.space.xlarge,
    },
  },
})