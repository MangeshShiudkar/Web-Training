import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from './theme.css'

export const pageStyles = style({
  minHeight: '100vh',
  padding: `${vars.space.xlarge} ${vars.space.medium}`,
  '@media': {
    'screen and (min-width: 700px)': {
      padding: `${vars.space.section} ${vars.space.xlarge}`,
    },
  },
})

export const appLayout = style({
  width: '100%',
  maxWidth: '68rem',
  margin: '0 auto',
})

export const sectionStyles = style({
  marginBottom: vars.space.section,
})

export const eyebrow = style({
  margin: `0 0 ${vars.space.small}`,
  color: vars.color.brand,
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
})

export const intro = style({
  maxWidth: '34rem',
  margin: `${vars.space.medium} 0 0`,
  color: vars.color.muted,
  fontSize: '0.95rem',
  lineHeight: 1.65,
})

export const sectionHeading = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'end',
  justifyContent: 'space-between',
  gap: vars.space.medium,
  marginBottom: vars.space.large,
})

export const componentLabel = style({
  paddingBottom: '0.2rem',
  color: vars.color.muted,
  fontSize: '0.78rem',
})

export const showcaseCard = style({
  display: 'grid',
  gap: vars.space.large,
})

export const buttonRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space.medium,
})

export const hint = style({
  margin: 0,
  color: vars.color.muted,
  fontSize: '0.8rem',
})

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.large,
  '@media': {
    'screen and (min-width: 700px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  },
})

export const cardTopline = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: vars.space.large,
})

export const cardMark = style({
  display: 'grid',
  width: '2.5rem',
  aspectRatio: '1',
  placeItems: 'center',
  borderRadius: vars.radius.small,
  background: vars.color.brandSoft,
  color: vars.color.brand,
  fontFamily: vars.typography.display,
  fontSize: '1.2rem',
  fontWeight: 700,
})

export const cardMarkAlt = style({
  background: vars.color.warningSoft,
  color: vars.color.warning,
})

export const badgeCard = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space.medium,
})

export const footer = style({
  paddingTop: vars.space.large,
  borderTop: `1px solid ${vars.color.border}`,
  color: vars.color.muted,
  fontSize: '0.8rem',
})

globalStyle('h1', {
  maxWidth: '52rem',
  margin: 0,
  fontFamily: vars.typography.display,
  fontSize: '3.25rem',
  fontWeight: 500,
  lineHeight: 0.98,
  '@media': {
    'screen and (min-width: 700px)': {
      fontSize: '4.5rem',
    },
  },
})

globalStyle('h2', {
  margin: 0,
  fontFamily: vars.typography.display,
  fontSize: '2rem',
  fontWeight: 500,
  lineHeight: 1.1,
})

globalStyle('h3', {
  margin: `0 0 ${vars.space.small}`,
  fontSize: '1.1rem',
  fontWeight: 700,
})