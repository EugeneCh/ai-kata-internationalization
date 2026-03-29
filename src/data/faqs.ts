export type FaqItem = {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Can I use this planner for a short city break and not just a full vacation?',
    answer:
      'Yes. The destinations and planning flow are designed for shorter trips, especially long weekends and one-week escapes where time, energy, and location matter more than checking off every major sight.',
  },
  {
    question: 'How fixed are the sample itineraries?',
    answer:
      'Think of them as starting points. Each route highlights a likely pacing strategy, but the final plan can shift around flight times, weather, neighborhoods, or one or two standout experiences.',
  },
  {
    question: 'Do the listed prices include every travel expense?',
    answer:
      'No. They are rough planning anchors meant to help with early decision-making. Flights, hotel category, season, and last-minute changes all affect the final total.',
  },
  {
    question: 'What if I am traveling with family or a small group?',
    answer:
      'That works well here. The request form already captures group size, timing, and notes, which usually covers the first round of planning for couples, friends, and small family trips.',
  },
]
