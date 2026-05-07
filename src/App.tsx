import { useEffect, useMemo, useState } from 'react'
import './App.css'

// ─── Types ──────────────────────────────────────────────────────────────────
type ContactType = 'github' | 'linkedin' | 'medium' | 'email' | string

interface Bio {
  name: string
  title: string
  profileImage: string
  about: string[]
  technicalSkills: string[]
  militarySkills: string[]
  certificates: string[]
  experience: { title: string; period: string; description: string }[]
  education: { degree: string; period: string; description: string }[]
  contact: { type: ContactType; url: string; display: string }[]
}

interface Card {
  id: number
  title: string
  description: string
  role: string
  technologies: string
  year: string
  startDate: string
  results: string
  link?: string
  type: 'live' | 'demo' | 'archived'
}

interface Now {
  status: string
  headline: string
  updated: string
  items: { label: string; text: string }[]
  footer: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmtDate = (d: Date) => {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mi = String(d.getUTCMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}Z`
}

const sortCardsByDate = (cards: Card[]) =>
  [...cards].sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))

// ─── Inline icons ───────────────────────────────────────────────────────────
const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const IconMedium = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="6" cy="12" r="4" />
    <ellipse cx="14.5" cy="12" rx="2" ry="4" />
    <ellipse cx="20" cy="12" rx="1" ry="4" />
  </svg>
)

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="0" />
    <path d="m3 7 9 7 9-7" />
  </svg>
)

const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 4h6v6" />
    <path d="M20 4 10 14" />
    <path d="M20 14v6H4V4h6" />
  </svg>
)

const contactIcon = (type: ContactType) => {
  switch (type) {
    case 'github':   return <IconGithub />
    case 'linkedin': return <IconLinkedIn />
    case 'medium':   return <IconMedium />
    case 'email':    return <IconMail />
    default:         return <IconExternal />
  }
}

const contactLabel = (type: ContactType) => {
  switch (type) {
    case 'github':   return 'GITHUB'
    case 'linkedin': return 'LINKEDIN'
    case 'medium':   return 'MEDIUM'
    case 'email':    return 'EMAIL'
    default:         return type.toUpperCase()
  }
}

const contactHandle = (c: Bio['contact'][number]) => {
  if (c.display) return c.display
  try {
    const u = new URL(c.url)
    return u.hostname.replace('www.', '') + u.pathname.replace(/\/$/, '')
  } catch {
    return c.url
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function App() {
  const [bio, setBio] = useState<Bio | null>(null)
  const [cards, setCards] = useState<Card[] | null>(null)
  const [now, setNow] = useState<Now | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [clock, setClock] = useState<string>(fmtDate(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setClock(fmtDate(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/bioinfo.json').then(r => r.json()),
      fetch('/cardinfo.json').then(r => r.json()),
      fetch('/now.json').then(r => r.json()),
    ]).then(([b, c, n]) => {
      if (cancelled) return
      setBio(b)
      setCards(c)
      setNow(n)
    }).catch(err => console.error('Data load failed', err))
    return () => { cancelled = true }
  }, [])

  const liveOps = useMemo(() => sortCardsByDate((cards || []).filter(c => c.type === 'live')), [cards])
  const archive = useMemo(() => sortCardsByDate((cards || []).filter(c => c.type !== 'live')), [cards])

  if (!bio || !cards || !now) {
    return (
      <div className="cc-app">
        <div className="cc-loading">// ESTABLISHING SECURE CHANNEL</div>
      </div>
    )
  }

  const callsign = bio.name.split(' ').map(p => p[0]).join('').toUpperCase()

  return (
    <div className="cc-app">
      {/* ─── TOP BAR ─────────────────────────────────────────────────── */}
      <div className="cc-topbar" role="banner">
        <div className="cc-prompt">
          <span className="cc-user">sthomas</span>
          <span className="cc-host">@portfolio</span>
          <span>:</span>
          <span style={{ color: 'var(--phosphor-dim)' }}>~</span>
          <span>$</span>
          <span className="cc-cmd">./brief --target=visitor</span>
          <span className="cc-cursor" aria-hidden />
        </div>
        <div className="cc-topbar-meta">
          <span>SYS <b>ONLINE</b></span>
          <span>UPLINK <b>SECURE</b></span>
          <span>UTC <b>{clock}</b></span>
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <div className="cc-hero">
        <div className="cc-hero-main">
          <div className="cc-classification">// UNCLASSIFIED // FOR PUBLIC RELEASE</div>
          <h1>
            <span className="cc-callsign">[{callsign}]</span> {bio.name}
          </h1>
          <div className="cc-tagline">
            CALLSIGN: <b>SOFTWARE CONSULTANT</b> &nbsp;·&nbsp; SGT, 20TH SFG (A) &nbsp;·&nbsp; FOUNDER, SIGNAL SURGE &amp; WHOBREW
          </div>

          <div className="cc-status-grid">
            <div className="cc-tile">
              <span className="cc-tile-label">CLEARANCE</span>
              <span className="cc-tile-value amber">TS/SCI · CI POLY</span>
            </div>
            <div className="cc-tile">
              <span className="cc-tile-label">LOCATION</span>
              <span className="cc-tile-value">TUSCALOOSA, AL</span>
            </div>
            <div className="cc-tile live">
              <span className="cc-tile-label">STATUS</span>
              <span className="cc-tile-value">{(now.status || '').toUpperCase()}</span>
            </div>
            <div className="cc-tile">
              <span className="cc-tile-label">NEXT POST</span>
              <span className="cc-tile-value amber">DALLAS · AUG 2026</span>
            </div>
          </div>
        </div>

        <aside className="cc-hero-side">
          <div className="cc-photo-frame">
            <img src={bio.profileImage} alt={bio.name} />
            <div className="cc-photo-corners" />
            <div className="cc-photo-extra" />
          </div>
          <dl className="cc-id-block">
            <dt>ID</dt><dd>STHOMAS-001</dd>
            <dt>UNIT</dt><dd>20TH SFG (A)</dd>
            <dt>RANK</dt><dd>SGT (E-5)</dd>
            <dt>UPDATED</dt><dd>{now.updated}</dd>
          </dl>
        </aside>
      </div>

      {/* ─── MISSION LOG ─────────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          MISSION LOG <span className="cc-section-id">[01 · BIO]</span>
          <span className="cc-rule" />
        </h2>
        <div className="cc-mission-log">
          <div className="cc-mission-body">
            {bio.about.map((line, i) => <p key={i}>{line}</p>)}
          </div>
          <div className="cc-now">
            <div className="cc-now-head">
              <span>// NOW</span>
              <span>{now.updated}</span>
            </div>
            <div className="cc-now-headline">{now.headline}</div>
            <ul className="cc-now-list">
              {now.items.map((it, i) => (
                <li key={i}>
                  <b>{it.label}</b>
                  {it.text}
                </li>
              ))}
            </ul>
            <div className="cc-now-footer">{now.footer}</div>
          </div>
        </div>
      </section>

      {/* ─── ACTIVE OPS ──────────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          ACTIVE OPS <span className="cc-section-id">[02 · LIVE PROJECTS · {liveOps.length}]</span>
          <span className="cc-rule" />
        </h2>
        <ProjectGrid
          cards={liveOps}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </section>

      {/* ─── ARCHIVE ─────────────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          ARCHIVE <span className="cc-section-id">[03 · CASE FILES · {archive.length}]</span>
          <span className="cc-rule" />
        </h2>
        <ProjectGrid
          cards={archive}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </section>

      {/* ─── CAPABILITIES MATRIX ─────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          CAPABILITIES MATRIX <span className="cc-section-id">[04 · SKILLS]</span>
          <span className="cc-rule" />
        </h2>
        <div className="cc-cap-grid">
          <div className="cc-cap-block">
            <h3 className="cc-cap-title">┌─ TECHNICAL ──┐</h3>
            <ul className="cc-cap-list">
              {bio.technicalSkills.map(s => <li key={s}><span /><span>{s}</span></li>)}
            </ul>
          </div>
          <div className="cc-cap-block">
            <h3 className="cc-cap-title">┌─ MIL / OPS ──┐</h3>
            <ul className="cc-cap-list">
              {bio.militarySkills.map(s => <li key={s}><span /><span>{s}</span></li>)}
            </ul>
          </div>
          <div className="cc-cap-block">
            <h3 className="cc-cap-title">┌─ CREDENTIALS ┐</h3>
            <ul className="cc-cap-list">
              {bio.certificates.map(s => <li key={s}><span /><span>{s}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── SERVICE RECORD ──────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          SERVICE RECORD <span className="cc-section-id">[05 · EXPERIENCE]</span>
          <span className="cc-rule" />
        </h2>
        <div className="cc-record">
          {bio.experience.map((e, i) => (
            <div key={i} className="cc-record-row">
              <div className="cc-record-period">{e.period}</div>
              <div>
                <h3 className="cc-record-title">{e.title}</h3>
                <p className="cc-record-desc">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EDUCATION ───────────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          TRAINING DOSSIER <span className="cc-section-id">[06 · EDUCATION]</span>
          <span className="cc-rule" />
        </h2>
        <div className="cc-edu-grid">
          {bio.education.map((e, i) => (
            <div key={i} className="cc-cap-block">
              <div className="cc-record-period" style={{ marginBottom: 6 }}>{e.period}</div>
              <h3 className="cc-record-title">{e.degree}</h3>
              <p className="cc-record-desc">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COMMS ───────────────────────────────────────────────────── */}
      <section className="cc-section">
        <h2 className="cc-section-head">
          COMMS <span className="cc-section-id">[07 · CONTACT]</span>
          <span className="cc-rule" />
        </h2>
        <div className="cc-comms">
          {bio.contact.map(c => (
            <a
              key={c.type}
              href={c.url}
              target={c.type === 'email' ? undefined : '_blank'}
              rel={c.type === 'email' ? undefined : 'noopener noreferrer'}
            >
              {contactIcon(c.type)}
              <span>
                <span className="cc-comm-label">{contactLabel(c.type)}</span>
                <span className="cc-comm-handle">{contactHandle(c)}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="cc-footer">
        <span>// END OF TRANSMISSION · {bio.name.toUpperCase()} · {clock}</span>
        <span className="cc-classified">UNCLASSIFIED // FOUO</span>
      </footer>
    </div>
  )
}

// ─── Project grid ───────────────────────────────────────────────────────────
function ProjectGrid({
  cards,
  expanded,
  setExpanded,
}: {
  cards: Card[]
  expanded: number | null
  setExpanded: (id: number | null) => void
}) {
  if (cards.length === 0) {
    return <div className="cc-loading" style={{ padding: 24, fontSize: 12 }}>// NO RECORDS</div>
  }
  return (
    <div className="cc-project-grid">
      {cards.map(card => (
        <ProjectCard
          key={card.id}
          card={card}
          isExpanded={expanded === card.id}
          onToggle={() => setExpanded(expanded === card.id ? null : card.id)}
        />
      ))}
    </div>
  )
}

function ProjectCard({
  card,
  isExpanded,
  onToggle,
}: {
  card: Card
  isExpanded: boolean
  onToggle: () => void
}) {
  const hasLink = !!card.link
  const idLabel = `OP-${String(card.id).padStart(3, '0')}`

  const handleClick = () => {
    if (hasLink) {
      window.open(card.link, '_blank', 'noopener,noreferrer')
    } else {
      onToggle()
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const badgeClass =
    card.type === 'live' ? 'cc-badge cc-badge-live'
    : card.type === 'demo' ? 'cc-badge cc-badge-demo'
    : 'cc-badge cc-badge-archived'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      className={`cc-card ${hasLink ? 'is-link' : ''}`}
      aria-expanded={!hasLink ? isExpanded : undefined}
      aria-label={`${card.title} — ${card.type}${hasLink ? ' (opens in new tab)' : ''}`}
    >
      {hasLink && (
        <span className="cc-card-link-cue" aria-hidden>↗ EXT</span>
      )}
      <div className="cc-card-head">
        <div>
          <div className="cc-card-id">{idLabel} · {card.year}</div>
          <h3 className="cc-card-title">{card.title}</h3>
        </div>
        <span className={badgeClass}>{card.type}</span>
      </div>
      <p className="cc-card-desc">{card.description}</p>

      <div className="cc-card-meta">
        <div className="cc-card-meta-row">
          <b>ROLE</b><span>{card.role}</span>
        </div>
        <div className="cc-card-meta-row">
          <b>STACK</b><span>{card.technologies}</span>
        </div>
      </div>

      {(!hasLink && isExpanded) && (
        <div className="cc-card-detail">
          <b>OUTCOME</b>
          {card.results}
        </div>
      )}
    </div>
  )
}
