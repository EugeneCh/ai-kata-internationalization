import { HeroVisual } from '../components/HeroVisual'
import { useTranslation } from 'react-i18next'
import { useLocalizedContent } from '../i18n/content'

export function HelpPage() {
  const { t } = useTranslation()
  const {
    quickStartSteps,
    supportTopics,
    bookingTerms,
    privacyParagraphs,
    contactParagraphs,
  } = useLocalizedContent()

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">{t('help.heroEyebrow')}</p>
            <h1>{t('help.heroTitle')}</h1>
            <p className="hero-copy">{t('help.heroCopy')}</p>
          </div>
          <HeroVisual variant="help" />
        </div>
      </section>

      <section className="two-column-layout align-start">
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('help.quickStartEyebrow')}</p>
            <h2>{t('help.quickStartTitle')}</h2>
          </div>

          <div className="checklist">
            {quickStartSteps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('help.supportEyebrow')}</p>
            <h2>{t('help.supportTitle')}</h2>
          </div>

          <ul className="info-list">
            {supportTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <div className="support-note">
            <h3>{t('help.responseHoursTitle')}</h3>
            <p>{t('help.responseHoursText')}</p>
          </div>
        </section>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">{t('help.bookingEyebrow')}</p>
          <h2>{t('help.bookingTitle')}</h2>
        </div>

        <div className="summary-grid">
          {bookingTerms.map((item) => (
            <div key={item.heading}>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="two-column-layout align-start">
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('help.privacyEyebrow')}</p>
            <h2>{t('help.privacyTitle')}</h2>
          </div>

          <div className="copy-stack">
            {privacyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('help.contactEyebrow')}</p>
            <h2>{t('help.contactTitle')}</h2>
          </div>

          <div className="copy-stack">
            {contactParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
