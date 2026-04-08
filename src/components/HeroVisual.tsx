import { useTranslation } from 'react-i18next'

type HeroVisualProps = {
  variant: 'planner' | 'guides' | 'help'
}

export function HeroVisual({ variant }: HeroVisualProps) {
  const { t } = useTranslation()
  const content = t(`heroVisual.${variant}`, { returnObjects: true }) as {
    label: string
    title: string
    subtitle: string
    items: string[]
    footer: string
  }

  return (
    <aside className={`hero-visual hero-visual--${variant}`} aria-hidden="true">
      <div className="hero-visual__card hero-visual__card--primary">
        <span className="hero-visual__label">{content.label}</span>
        <h3>{content.title}</h3>
        <p>{content.subtitle}</p>
      </div>

      <div className="hero-visual__card hero-visual__card--secondary">
        <ul className="hero-visual__list">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="hero-visual__footer">{content.footer}</p>
      </div>
    </aside>
  )
}
