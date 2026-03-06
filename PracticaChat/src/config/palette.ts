import palette from '../../palette.json'

type Palette = Record<string, string>

const mapPaletteToCss = (p: Palette) => ({
  '--primary': p.primary,
  '--secondary': p.secondary,
  '--background': p.background,
  '--card': p.surface,
  '--surface': p.surface,
  '--accent': p.accent,
  '--destructive': p.danger,
  '--warning': p.warning,
  '--info': p.info,
  '--text': p.text,
  '--muted': p.muted,
  '--border': p.border,
})

export const applyPalette = () => {
  try {
    const root = document.documentElement
    const map = mapPaletteToCss(palette as Palette)
    Object.entries(map).forEach(([key, value]) => {
      if (value) root.style.setProperty(key, value)
    })
  } catch (err) {
    // fail silently to avoid breaking app if import fails
    // eslint-disable-next-line no-console
    console.warn('Could not apply palette', err)
  }
}

export default applyPalette
