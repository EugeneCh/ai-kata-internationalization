import { HeroVisual } from '../components/HeroVisual'
import { useTranslation } from 'react-i18next'
import { useLocalizedContent } from '../i18n/content'

export function GuidesPage() {
  const { t } = useTranslation()
  const { guideNotes, cityTips, guideQuestions } = useLocalizedContent()

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">{t('guides.heroEyebrow')}</p>
            <h1>{t('guides.heroTitle')}</h1>
            <p className="hero-copy">{t('guides.heroCopy')}</p>
          </div>
          <HeroVisual variant="guides" />
        </div>
      </section>

      <section className="two-column-layout align-start">
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('guides.habitsEyebrow')}</p>
            <h2>{t('guides.habitsTitle')}</h2>
          </div>

          <div className="checklist">
            {guideNotes.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('guides.cityEyebrow')}</p>
            <h2>{t('guides.cityTitle')}</h2>
          </div>

          <div className="faq-list">
            {cityTips.map((item) => (
              <article key={item.city} className="faq-item">
                <h3>{item.city}</h3>
                <p>{item.tip}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">{t('guides.beforeBookEyebrow')}</p>
          <h2>{t('guides.beforeBookTitle')}</h2>
        </div>

        <div className="summary-grid">
          {guideQuestions.map((question) => (
            <div key={question.title}>
              <h3>{question.title}</h3>
              <p>{question.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
