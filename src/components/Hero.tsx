import { HeroVisual } from './HeroVisual'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero-panel">
      <div className="hero-layout">
        <div className="hero-content">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t('hero.title')}</h1>
          <p className="hero-copy">{t('hero.copy')}</p>
          <div className="hero-metrics" aria-label={t('common.highlightsAria')}>
            <div>
              <strong>{t('hero.metrics.destinationsValue')}</strong>
              <span>{t('hero.metrics.destinations')}</span>
            </div>
            <div>
              <strong>{t('hero.metrics.stepsValue')}</strong>
              <span>{t('hero.metrics.steps')}</span>
            </div>
            <div>
              <strong>{t('hero.metrics.responseValue')}</strong>
              <span>{t('hero.metrics.response')}</span>
            </div>
          </div>
        </div>
        <HeroVisual variant="planner" />
      </div>
    </section>
  )
}
