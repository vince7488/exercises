import fullLogoSource from '../../../public/assets/kbh_fullLogo.svg?raw'
import minimizedLogoSource from '../../../public/assets/kbh_minimized.svg?raw'

export type BrandLogoVariant = 'full' | 'minimized'

type BrandLogoProps = {
  className?: string
  label?: string
  variant?: BrandLogoVariant
}

type LogoPalette = {
  e: 'white'
  f: 'primary' | 'warm'
  i?: 'blue'
}

// The source artwork remains exact while its generic Illustrator classes and duplicate IDs become safe, component-scoped animation hooks.
function prepareLogo(source: string, layer: BrandLogoVariant, palette: LogoPalette) {
  let markup = source
    .replace(/<\?xml[^>]*>\s*/, '')
    .replace(/\s*<defs>[\s\S]*?<\/defs>/, '')
    .replace(/\s(?:id|data-name)="[^"]*"/g, '')
    .replace(
      '<svg',
      `<svg class="brand-logo__svg brand-logo__svg--${layer}" aria-hidden="true" focusable="false"`,
    )

  for (const [sourceClass, tone] of Object.entries(palette)) {
    markup = markup.replace(
      new RegExp(`class="${sourceClass}"`, 'g'),
      `class="brand-logo__fill brand-logo__fill--${tone}"`,
    )
  }

  return markup
}

const fullLogoMarkup = prepareLogo(fullLogoSource, 'full', {
  e: 'white',
  f: 'warm',
  i: 'blue',
})

const minimizedLogoMarkup = prepareLogo(minimizedLogoSource, 'minimized', {
  e: 'white',
  f: 'primary',
})

// BrandLogo renders both source marks inline so SCSS can control their individual fills and switch states without another asset request.
export function BrandLogo({ className, label, variant = 'full' }: BrandLogoProps) {
  const classes = ['brand-logo', `brand-logo--${variant}`, className].filter(Boolean).join(' ')
  const accessibilityProps = label
    ? { 'aria-label': label, role: 'img' }
    : { 'aria-hidden': true as const }

  return (
    <span className={classes} {...accessibilityProps}>
      <span
        className="brand-logo__layer brand-logo__layer--full"
        dangerouslySetInnerHTML={{ __html: fullLogoMarkup }}
      />
      <span
        className="brand-logo__layer brand-logo__layer--minimized"
        dangerouslySetInnerHTML={{ __html: minimizedLogoMarkup }}
      />
    </span>
  )
}
