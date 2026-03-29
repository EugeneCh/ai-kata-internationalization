import type { FaqItem } from '../data/faqs'

type FaqListProps = {
  items: FaqItem[]
}

export function FaqList({ items }: FaqListProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Travel questions</p>
        <h2>Common questions from travelers before they commit to a route.</h2>
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
