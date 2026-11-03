import { createTheme, globalStyle } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    brand: '#176b59',
    brandStrong: '#105447',
    brandSoft: '#e4f0eb',
    text: '#202a27',
    muted: '#64716c',
    canvas: '#f4f4ef',
    surface: '#ffffff',
    border: '#dce3dd',
    danger: '#a43e3b',
    dangerStrong: '#842f2d',
    dangerSoft: '#f7e9e7',
    warning: '#89520c',
    warningSoft: '#f8efdc',
    success: '#25664b',
    successSoft: '#e5f1e9',
  },
  space: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    section: '3.5rem',
  },
  radius: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem',
    pill: '999px',
  },
  typography: {
    body: "'Avenir Next', Avenir, 'Segoe UI', sans-serif",
    display: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
  },
  shadow: {
    card: '0 12px 30px rgba(32, 42, 39, 0.06)',
  },
})

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  minWidth: '320px',
  background: vars.color.canvas,
  color: vars.color.text,
  fontFamily: vars.typography.body,
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('button', {
  font: 'inherit',
})