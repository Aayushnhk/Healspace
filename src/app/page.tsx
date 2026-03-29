import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Orbs */}
      <div style={{
        position: 'fixed', width: '400px', height: '400px',
        borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        background: 'rgba(201,169,110,0.06)', top: '-100px', right: '-100px', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', width: '300px', height: '300px',
        borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
        background: 'rgba(143,168,200,0.05)', bottom: '100px', left: '-80px', zIndex: 0,
      }} />

      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 73px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem 2rem',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
          color: 'var(--accent)', fontSize: '0.75rem', padding: '0.35rem 0.9rem',
          borderRadius: '100px', marginBottom: '2rem', letterSpacing: '0.05em',
        }}>✦ a safe space to feel</div>

        <h1 style={{
          fontFamily: 'var(--font-lora)',
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 400, lineHeight: 1.2,
          maxWidth: '700px', marginBottom: '1.5rem',
        }}>
          You don{"'"}t have to carry this{' '}
          <em style={{ color: 'var(--accent)' }}>alone</em>
        </h1>

        <p style={{
          fontSize: '1rem', color: 'var(--muted)',
          maxWidth: '480px', lineHeight: 1.7,
          marginBottom: '3rem', fontWeight: 300,
        }}>
          HealSpace is a quiet corner of the internet for people going through
          heartbreak, loss, or pain. Vent anonymously, feel heard, and know
          others have survived this too.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/vent" style={{
            background: 'var(--accent)', color: '#1a1208',
            fontSize: '0.9rem', fontWeight: 500,
            padding: '0.8rem 2rem', borderRadius: '100px',
            textDecoration: 'none',
          }}>write what you feel</Link>

          <Link href="/stories" style={{
            background: 'transparent', color: 'var(--text)',
            fontSize: '0.9rem', padding: '0.8rem 2rem',
            borderRadius: '100px', border: '1px solid var(--border)',
            textDecoration: 'none',
          }}>read survival stories</Link>
        </div>
      </section>

      {/* Cards */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem', padding: '0 2rem 5rem',
        maxWidth: '1000px', margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        {[
          { icon: '🕊', title: 'anonymous venting', desc: "No account needed. Say everything you've been holding inside without judgment." },
          { icon: '🤍', title: 'AI that listens', desc: "Not advice. Not toxic positivity. Just genuine acknowledgment of what you're feeling." },
          { icon: '🌱', title: 'survival stories', desc: 'Real people who made it through. Proof that this pain is survivable.' },
          { icon: '📅', title: 'daily check-ins', desc: 'Track how you are feeling over time. Small steps forward still count.' },
        ].map((card) => (
          <div key={card.title} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{card.icon}</div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.5rem' }}>{card.title}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Quote */}
      <div style={{
        textAlign: 'center', padding: '3rem 2rem 5rem',
        fontFamily: 'var(--font-lora)', fontStyle: 'italic',
        color: 'var(--muted)', fontSize: '0.9rem',
        position: 'relative', zIndex: 1,
      }}>
        "The wound is the place where the light enters you." — Rumi
      </div>
    </main>
  )
}