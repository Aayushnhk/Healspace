import Navbar from '@/components/Navbar'

const resources = [
  {
    name: 'iCall',
    description: 'Free, confidential counselling by trained psychologists. India-based.',
    contact: '9152987821',
    type: 'Call',
    available: 'Mon–Sat, 8am–10pm',
  },
  {
    name: 'Vandrevala Foundation',
    description: '24/7 mental health helpline available in multiple languages.',
    contact: '1860-2662-345',
    type: 'Call',
    available: '24/7',
  },
  {
    name: 'iCall Chat',
    description: 'Prefer to type? Reach iCall through their online portal.',
    contact: 'icallhelpline.org',
    type: 'Chat',
    available: 'Mon–Sat, 8am–10pm',
  },
  {
    name: 'Snehi',
    description: 'Emotional support for people in distress or feeling suicidal.',
    contact: '044-24640050',
    type: 'Call',
    available: 'Daily, 8am–10pm',
  },
]

const selfCare = [
  { icon: '🌬', title: 'box breathing', desc: 'Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 4 times. Calms your nervous system instantly.' },
  { icon: '🧊', title: 'cold water', desc: 'Splash cold water on your face or hold ice. Activates the dive reflex and slows your heart rate.' },
  { icon: '📝', title: 'write it out', desc: 'Set a timer for 5 minutes and write everything in your head. Don\'t stop, don\'t edit.' },
  { icon: '📞', title: 'call someone', desc: 'Not to talk about it. Just to hear a familiar voice. Tell them you need company.' },
]

export default function CrisisPage() {
  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            you don't have to face this alone
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            If you're in crisis or having thoughts of self-harm, please reach out. These are real people who want to help.
          </p>
        </div>

        {/* Helplines */}
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          helplines
        </div>

        {resources.map((r, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '1.3rem 1.5rem',
            marginBottom: '0.8rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{r.name}</span>
                <span style={{
                  fontSize: '0.65rem', background: 'rgba(201,169,110,0.1)',
                  color: 'var(--accent)', padding: '2px 8px', borderRadius: '100px',
                }}>{r.available}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{r.description}</p>
            </div>
            <a href={r.type === 'Call' ? `tel:${r.contact}` : `https://${r.contact}`}
              target={r.type !== 'Call' ? '_blank' : undefined}
              rel="noreferrer"
              style={{
                background: 'var(--accent)', color: '#1a1208',
                fontSize: '0.78rem', fontWeight: 500,
                padding: '0.5rem 1.1rem', borderRadius: '100px',
                textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
              }}>
              {r.type === 'Call' ? `📞 ${r.contact}` : '💬 chat'}
            </a>
          </div>
        ))}

        {/* Self care */}
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', marginTop: '2.5rem' }}>
          right now, try this
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '2.5rem' }}>
          {selfCare.map((s, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '1.2rem',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>{s.icon}</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.4rem' }}>{s.title}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div style={{
          background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)',
          borderRadius: '16px', padding: '1.5rem 1.8rem', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            "This feeling is temporary. You have survived every hard day so far. This one too will pass."
          </p>
        </div>
      </div>
    </main>
  )
}