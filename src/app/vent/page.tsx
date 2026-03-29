'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { useSession } from '@/lib/auth-client'

const moods = [
  { label: 'heartbroken' },
  { label: 'numb' },
  { label: 'angry' },
  { label: 'lonely' },
  { label: 'anxious' },
  { label: 'grieving' },
]

const recentVents = [
  { text: "I keep reaching for my phone to text them before I remember. It's the smallest moments that hit the hardest.", time: '2 hours ago', mood: 'heartbroken' },
  { text: "Everyone keeps saying I'll be fine. I just need someone to say it's okay to not be fine right now.", time: '5 hours ago', mood: 'lonely' },
  { text: "4 years. How do I un-learn someone who was part of every single plan I made?", time: 'yesterday', mood: 'grieving' },
]

export default function VentPage() {
  const { data: session } = useSession()
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [ventText, setVentText] = useState('')
  const [aiReply, setAiReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleMood = (label: string) => {
    setSelectedMoods(prev =>
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    )
  }

  const handleSend = async () => {
    if (!ventText.trim()) return
    setLoading(true)
    setSubmitted(true)
    setAiReply('')

    try {
      const res = await fetch('/api/vent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: ventText, mood: selectedMoods.join(', ') }),
      })
      const data = await res.json()
      setAiReply(data.reply)
    } catch {
      setAiReply("I'm here with you. What you're feeling is real, and it makes complete sense.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', color: '#e2ddd6' }}>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,2rem) 6rem' }}>

        <div style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '2rem' }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '1rem' }}>
            {session ? `writing as ${session.user.name || session.user.email}` : 'anonymous · not saved · no judgment'}
          </div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 400, lineHeight: 1.2, color: '#e2ddd6' }}>
            what's on your mind?
          </h2>
        </div>

        {/* Mood selector */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '0.8rem' }}>
            how are you feeling
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {moods.map(({ label }) => (
              <button key={label} onClick={() => toggleMood(label)} style={{
                background: 'transparent',
                border: selectedMoods.includes(label) ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                padding: '0.35rem 1rem',
                fontFamily: 'system-ui,sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: selectedMoods.includes(label) ? '#c9a96e' : '#6b6860',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Vent box */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem',
          marginBottom: '1rem',
          background: '#0f0f10',
        }}>
          <textarea
            value={ventText}
            onChange={e => setVentText(e.target.value)}
            placeholder="Start with whatever comes first. There's no wrong way to say it..."
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              color: '#e2ddd6', fontFamily: 'Georgia,serif', fontSize: '1rem',
              lineHeight: 1.8, resize: 'none', minHeight: '200px', caretColor: '#c9a96e',
            }}
          />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap', gap: '0.8rem',
          }}>
            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', color: '#3a3835', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: session ? '#c9a96e' : '#4caf86', display: 'inline-block' }} />
              {session ? `saved to your account · ${session.user.name || session.user.email}` : 'anonymous · not saved'}
            </div>
            <button onClick={handleSend} disabled={loading} style={{
              background: '#c9a96e', color: '#0a0a0b',
              fontFamily: 'system-ui,sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
              fontWeight: 500, padding: '0.55rem 1.4rem',
              border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'sending...' : 'send'}
            </button>
          </div>
        </div>

        {/* Sign in prompt for anonymous users */}
        {!session && (
          <div style={{
            fontFamily: 'system-ui,sans-serif', fontSize: '0.72rem',
            color: '#6b6860', marginBottom: '2rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            want to track your journey over time?
            <a href="/login" style={{ color: '#c9a96e', textDecoration: 'none', letterSpacing: '0.04em' }}>sign in →</a>
          </div>
        )}

        {/* AI Reply */}
        {submitted && (
          <div style={{
            borderLeft: '1px solid rgba(201,169,110,0.3)',
            paddingLeft: '1.5rem',
            marginBottom: '3rem',
            marginTop: '2rem',
          }}>
            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', color: '#6b6860', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              healspace
            </div>
            {loading ? (
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '24px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '4px', height: '4px', borderRadius: '50%', background: '#6b6860',
                    animation: 'pulse 1.2s infinite', animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
                <style>{`@keyframes pulse{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}`}</style>
              </div>
            ) : (
              <p style={{ fontFamily: 'Georgia,serif', fontSize: '1rem', lineHeight: 1.8, color: '#a8a49e', fontStyle: 'italic' }}>
                {aiReply}
              </p>
            )}
          </div>
        )}

        {/* Others feeling this */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            others feeling this too
          </div>
          {recentVents.map((v, i) => (
            <div key={i} style={{
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <p style={{ fontFamily: 'Georgia,serif', fontSize: '0.95rem', lineHeight: 1.8, color: '#a8a49e', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                "{v.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', color: '#3a3835', letterSpacing: '0.05em' }}>{v.time}</span>
                <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b6860' }}>{v.mood}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}