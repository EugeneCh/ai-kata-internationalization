import { useTranslation } from 'react-i18next'
import type { FaqItem } from '../data/faqs'

type FaqListProps = {
  items: FaqItem[]
}

export function FaqList({ items }: FaqListProps) {
  const { t } = useTranslation()

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">{t('faq.eyebrow')}</p>
        <h2>{t('faq.title')}</h2>
      </div>

      <div className="faq-list">
        {items.map((item) => (
          <article key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
