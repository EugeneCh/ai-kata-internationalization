import { HeroVisual } from '../components/HeroVisual'

const planningNotes = [
  {
    title: 'Choose one anchor experience per day',
    text:
      'Trips feel calmer when each day has a clear centerpiece. That might be a market visit, a museum block, a lunch reservation, or a half-day excursion. Everything else can stay flexible around it.',
  },
  {
    title: 'Protect your first evening',
    text:
      'After a flight, most travelers benefit from a low-effort first night. Keep dinner close to the hotel, avoid hard-to-reach reservations, and save your ambitious plans for the second day.',
  },
  {
    title: 'Balance logistics with atmosphere',
    text:
      'A beautiful neighborhood matters, but so does the walk to transit, the time back from dinner, and how easy it is to start the day without overcommitting every move.',
  },
]

const cityTips = [
  {
    city: 'Lisbon',
    tip: 'Plan around hills and viewpoints. A shorter list of neighborhoods often makes for a better day than trying to cross the city twice.',
  },
  {
    city: 'Kyoto',
    tip: 'Early mornings change the whole experience. Start with one temple area before breakfast crowds build, then slow down into the afternoon.',
  },
  {
    city: 'Marrakech',
    tip: 'Alternate busy and quiet spaces. Market time feels more enjoyable when it is paired with a garden, courtyard lunch, or rooftop break.',
  },
  {
    city: 'Reykjavik',
    tip: 'Leave weather room in the schedule. A flexible final evening is often more useful than a tightly packed checklist.',
  },
]

export function GuidesPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Travel guides</p>
            <h1>Practical planning notes for city breaks that still leave room to breathe.</h1>
            <p className="hero-copy">
              These short guides help travelers move from inspiration to a workable outline.
              They focus on pacing, neighborhoods, first-day energy, and the kind of practical
              choices that make a trip feel smoother from the start.
            </p>
          </div>
          <HeroVisual variant="guides" />
        </div>
      </section>

      <section className="two-column-layout align-start">
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">Core planning habits</p>
            <h2>Small decisions that usually lead to a better trip.</h2>
          </div>

          <div className="checklist">
            {planningNotes.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">City-specific reminders</p>
            <h2>Quick notes from destinations travelers ask about most often.</h2>
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
          <p className="eyebrow">Before you book</p>
          <h2>Questions worth answering before you commit to flights or hotels.</h2>
        </div>

        <div className="summary-grid">
          <div>
            <h3>What kind of mornings do you want?</h3>
            <p>
              A trip can feel completely different depending on whether you want early museum
              starts, long breakfasts, or enough free time to walk without checking the clock.
            </p>
          </div>
          <div>
            <h3>How much movement is realistic?</h3>
            <p>
              Some travelers love neighborhood hopping. Others are happier choosing one area
              per day and staying there. Build around your actual rhythm, not an idealized one.
            </p>
          </div>
          <div>
            <h3>Where will you spend your splurge?</h3>
            <p>
              One memorable dinner, a better hotel location, or a private guide can shape the
              whole trip. Decide early where extra budget will matter most.
            </p>
          </div>
          <div>
            <h3>What needs to stay flexible?</h3>
            <p>
              Weather, energy, and transit all change plans. The best itineraries usually leave
              at least one block each day open for a slower lunch, a missed turn, or a new idea.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
