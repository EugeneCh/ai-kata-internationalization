import { HeroVisual } from './HeroVisual'

type HeroProps = {
  destinationCount: number
}

export function Hero({ destinationCount }: HeroProps) {
  return (
    <section className="hero-panel">
      <div className="hero-layout">
        <div className="hero-content">
          <p className="eyebrow">Northstar Travel</p>
          <h1>Plan a city break with curated routes, flexible pacing, and smarter defaults.</h1>
          <p className="hero-copy">
            Discover short escapes built around atmosphere, pacing, and practical logistics.
            Compare destination styles, shape a planning request, and preview the kind of trip
            summary a traveler would want before moving into the booking details.
          </p>
          <div className="hero-metrics" aria-label="Project highlights">
            <div>
              <strong>{destinationCount}</strong>
              <span>featured destinations</span>
            </div>
            <div>
              <strong>3</strong>
              <span>planning steps</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>average response window</span>
            </div>
          </div>
        </div>
        <HeroVisual variant="planner" />
      </div>
    </section>
  )
}
