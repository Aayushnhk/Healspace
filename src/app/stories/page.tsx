import Navbar from '@/components/Navbar'

const stories = [
  {
    title: "I thought I wouldn't survive the first month",
    content: "We were together for 6 years. I genuinely didn't know who I was without them. Eighteen months later, I am the happiest I have ever been — but I had to let myself fall apart first. Don't rush it.",
    age: 28,
  },
  {
    title: "The grief was real. So was the growth.",
    content: "I journaled every single day for three months. It felt pointless at first. Then one day I read back and realized I had changed. The pain was still there, but I was bigger than it now.",
    age: 24,
  },
  {
    title: "Stop waiting to feel okay. Start doing things anyway.",
    content: "I started going to the gym not to feel better, but just to have somewhere to go. Three months in I realized I was actually okay. You don't wait for motivation — you act, and it follows.",
    age: 31,
  },
  {
    title: "It was the making of me.",
    content: "The relationship ending destroyed me. But rebuilding forced me to figure out what I actually wanted from life — not what we wanted. That clarity was the most valuable thing I've ever had.",
    age: 26,
  },
  {
    title: "Seven years. I survived it.",
    content: "People kept telling me time heals everything. I hated that. What actually helped was letting myself be angry, sad, and broken — without apologizing for it. Feel it fully. That's the only way through.",
    age: 29,
  },
  {
    title: "The person I became after was worth the pain.",
    content: "I won't pretend it was easy or fast. It took almost two years to feel like myself again. But the version of me that came out the other side — stronger, clearer, more honest — I wouldn't trade that for anything.",
    age: 33,
  },
]

export default function StoriesPage() {
  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            survival stories
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            From people who were exactly where you are — and made it through.
          </p>
        </div>

        {stories.map((story, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1.5rem 1.8rem',
            marginBottom: '1rem',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-lora, serif)',
              fontSize: '1rem', fontWeight: 500,
              marginBottom: '0.8rem', color: 'var(--text)',
            }}>
              "{story.title}"
            </h4>
            <p style={{
              fontSize: '0.875rem', color: 'var(--muted)',
              lineHeight: 1.7, fontStyle: 'italic',
            }}>
              {story.content}
            </p>
            <div style={{
              fontSize: '0.75rem', color: 'var(--accent)',
              marginTop: '1rem',
            }}>
              — anonymous, {story.age}
            </div>
          </div>
        ))}

        <div style={{
          textAlign: 'center', marginTop: '3rem',
          padding: '2rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
        }}>
          <p style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
            have you made it through? your story could help someone survive tonight.
          </p>
          <a href="/vent" style={{
            background: 'var(--accent)', color: '#1a1208',
            fontSize: '0.82rem', fontWeight: 500,
            padding: '0.55rem 1.4rem', borderRadius: '100px',
            textDecoration: 'none', display: 'inline-block',
          }}>
            share your story
          </a>
        </div>
      </div>
    </main>
  )
}