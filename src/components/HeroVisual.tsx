type HeroVisualProps = {
  variant: 'planner' | 'guides' | 'help'
}

const variantContent = {
  planner: {
    label: 'This week',
    title: 'Plan preview',
    subtitle: 'A compact trip snapshot before booking.',
    items: ['Lisbon long weekend', '2 travelers', 'Balanced pace'],
    footer: 'Best for walkable neighborhoods and easy evenings',
  },
  guides: {
    label: 'Editor picks',
    title: 'Guide notes',
    subtitle: 'Short reminders that improve real travel days.',
    items: ['Protect the first evening', 'Choose one anchor plan', 'Leave weather room'],
    footer: 'Practical pacing usually beats over-scheduling',
  },
  help: {
    label: 'Before you confirm',
    title: 'Travel basics',
    subtitle: 'A quick reference for policies and expectations.',
    items: ['Price changes happen', 'Review cancellation terms', 'Check passport timing'],
    footer: 'Clear language reduces booking mistakes',
  },
} as const

export function HeroVisual({ variant }: HeroVisualProps) {
  const content = variantContent[variant]

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
