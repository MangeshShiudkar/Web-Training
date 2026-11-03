import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../theme.css'

export const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.small,
  border: '1px solid transparent',
  borderRadius: vars.radius.small,
  fontWeight: 700,
  lineHeight: 1.2,
  cursor: 'pointer',
  transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 160ms ease',
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translateY(-1px)',
    },
    '&:focus-visible': {
      outline: `3px solid ${vars.color.brand}`,
      outlineOffset: 3,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.48,
    },
  },
})

export const buttonVariants = styleVariants({
  primary: {
    background: vars.color.brand,
    color: vars.color.surface,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.brandStrong,
      },
    },
  },
  secondary: {
    background: vars.color.surface,
    borderColor: vars.color.border,
    color: vars.color.text,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.brandSoft,
        borderColor: vars.color.brand,
      },
    },
  },
  danger: {
    background: vars.color.danger,
    color: vars.color.surface,
    selectors: {
      '&:hover:not(:disabled)': {
        background: vars.color.dangerStrong,
      },
    },
  },
})

export const buttonSizes = styleVariants({
  small: {
    minHeight: '2.25rem',
    padding: `0 ${vars.space.medium}`,
    fontSize: '0.8125rem',
  },
  large: {
    minHeight: '2.875rem',
    padding: `0 ${vars.space.large}`,
    fontSize: '0.9375rem',
  },
})