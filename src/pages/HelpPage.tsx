import { HeroVisual } from '../components/HeroVisual'

const quickStartSteps = [
  {
    title: 'Start with one route, not five',
    text:
      'Use the Planner page to choose a destination that fits the trip mood first. Once the pace and budget are clear, the rest of the request becomes much easier to shape.',
  },
  {
    title: 'Complete the planning request',
    text:
      'Add your departure city, travel month, group size, budget target, and any notes that would change the type of itinerary you want to receive.',
  },
  {
    title: 'Review the summary before booking',
    text:
      'The booking summary is meant to confirm direction, not lock every detail. It should read like a clear first brief you can refine with a travel specialist.',
  },
]

const policyItems = [
  {
    heading: 'Planning fees',
    body:
      'Initial route suggestions and budget guidance are provided before any supplier booking is confirmed. Final service fees, if applicable, are disclosed before payment is requested.',
  },
  {
    heading: 'Price changes',
    body:
      'Flight and hotel prices can change between inquiry and confirmation. Quotes are subject to availability at the time a traveler approves the final itinerary.',
  },
  {
    heading: 'Cancellation timing',
    body:
      'Cancellation terms depend on the supplier, fare class, and hotel conditions. Travelers should review the final confirmation documents carefully before paying a deposit.',
  },
  {
    heading: 'Traveler responsibility',
    body:
      'Travelers are responsible for passport validity, visa rules, travel insurance decisions, and reviewing all names and dates before any booking is finalized.',
  },
]

const supportTopics = [
  'How to choose between two similar destination ideas',
  'What details matter most in the trip notes field',
  'When a flexible date window can actually lower costs',
  'How far in advance to start planning for seasonal travel',
]

export function HelpPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Help and policies</p>
            <h1>Clear guidance for using the planner and understanding the basics before you book.</h1>
            <p className="hero-copy">
              This page brings together short onboarding help, booking expectations, and policy
              language that travelers often want to review before they move from browsing to
              confirming a trip.
            </p>
          </div>
          <HeroVisual variant="help" />
        </div>
      </section>

      <section className="two-column-layout align-start">
        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">Quick start guide</p>
            <h2>Use the planner in three simple steps.</h2>
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
            <p className="eyebrow">Support topics</p>
            <h2>Questions travelers ask before they send a request.</h2>
          </div>

          <ul className="info-list">
            {supportTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <div className="support-note">
            <h3>Response hours</h3>
            <p>
              Planning requests are reviewed Monday through Friday. Most replies go out
              within two business days, and more complex multi-city requests may take longer.
            </p>
          </div>
        </section>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Booking terms</p>
          <h2>Short policy language that covers the most common pre-booking questions.</h2>
        </div>

        <div className="summary-grid">
          {policyItems.map((item) => (
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
            <p className="eyebrow">Privacy note</p>
            <h2>What information is used during early trip planning.</h2>
          </div>

          <div className="copy-stack">
            <p>
              Planning requests may include departure city, timing, trip length, group size,
              and optional preference notes. That information is used to prepare route ideas,
              estimate price ranges, and shape planning recommendations.
            </p>
            <p>
              Sensitive payment details should never be added to free-text notes. Final
              payment steps, if needed, belong in a separate secured booking flow rather than
              the initial planning form.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>When to reach out directly instead of using the planner.</h2>
          </div>

          <div className="copy-stack">
            <p>
              Contact the travel team directly for visa-sensitive itineraries, group travel
              above six guests, urgent departures, or trips with accessibility requirements
              that need to be reviewed before any destination is suggested.
            </p>
            <p>
              For ordinary city-break planning, the planner route is still the fastest place
              to start because it collects the details the team needs to make the first pass.
            </p>
          </div>
        </section>
      </section>
    </div>
  )
}
