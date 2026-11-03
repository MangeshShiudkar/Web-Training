import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { appLayout, badgeCard, buttonRow, cardGrid, cardMark, cardMarkAlt, cardTopline, componentLabel, eyebrow, footer, hint, intro, pageStyles, sectionHeading, sectionStyles, showcaseCard,} from './App.css.ts'
import { themeClass } from './theme.css'

function App() {
  return (
    <main className={`${themeClass} ${pageStyles}`}>
      <div className={appLayout}>
        <header className={sectionStyles}>
          <p className={eyebrow}>Exercise 02 / Component library</p>
          <h1>Small pieces, well considered.</h1>
          <p className={intro}>
            A reusable interface kit built with typed design tokens and styles
            extracted at build time.
          </p>
        </header>

        <section className={sectionStyles} aria-labelledby="buttons-heading">
          <div className={sectionHeading}>
            <div>
              <p className={eyebrow}>01 / Actions</p>
              <h2 id="buttons-heading">Button</h2>
            </div>
            <span className={componentLabel}>3 variants · 2 sizes</span>
          </div>
          <Card className={showcaseCard}>
            <div className={buttonRow}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className={buttonRow}>
              <Button size="small" variant="primary">Small button</Button>
              <Button size="large" variant="primary">Large button</Button>
              <Button disabled>Disabled</Button>
            </div>
            <p className={hint}>Tab to a button to see its focus style.</p>
          </Card>
        </section>

        <section className={sectionStyles} aria-labelledby="card-heading">
          <div className={sectionHeading}>
            <div>
              <p className={eyebrow}>02 / Surfaces</p>
              <h2 id="card-heading">Card</h2>
            </div>
            <span className={componentLabel}>Consistent spacing</span>
          </div>
          <div className={cardGrid}>
            <Card>
              <div className={cardTopline}>
                <span className={cardMark}>A</span>
                <Badge variant="success">Ready</Badge>
              </div>
              <h3>Workspace overview</h3>
              <p className={intro}>
                A flexible surface for grouping related content and actions.
              </p>
              <Button size="small" variant="secondary">View details</Button>
            </Card>
            <Card>
              <div className={cardTopline}>
                <span className={`${cardMark} ${cardMarkAlt}`}>B</span>
                <Badge variant="warning">Review</Badge>
              </div>
              <h3>Shared components</h3>
              <p className={intro}>
                Spacing, radius, color, and shadow come from common tokens.
              </p>
              <Button size="small" variant="secondary">View details</Button>
            </Card>
          </div>
        </section>

        <section className={sectionStyles} aria-labelledby="badge-heading">
          <div className={sectionHeading}>
            <div>
              <p className={eyebrow}>03 / Indicators</p>
              <h2 id="badge-heading">Badge</h2>
            </div>
            <span className={componentLabel}>3 semantic variants</span>
          </div>
          <Card className={badgeCard}>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Card>
        </section>

        <footer className={footer}>
          Vanilla Extract · TypeScript styles · Build-time CSS
        </footer>
      </div>
    </main>
  )
}

export default App