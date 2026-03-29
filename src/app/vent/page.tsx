'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

const moods = [
  { emoji: '💔', label: 'heartbroken' },
  { emoji: '😶', label: 'numb' },
  { emoji: '😤', label: 'angry' },
  { emoji: '😞', label: 'lonely' },
  { emoji: '😰', label: 'anxious' },
  { emoji: '🌫', label: 'lost' },
]

const recentVents = [
  { text: "I keep reaching for my phone to text them before I remember. It's the smallest moments that hit the hardest.", time: '2 hours ago', mood: '💔 heartbroken' },
  { text: "Everyone keeps saying I'll be fine. I just need someone to say it's okay to not be fine right now.", time: '5 hours ago', mood: '😞 lonely' },
  { text: "4 years. How do I un-learn someone who was part of every single plan I made?", time: 'yesterday', mood: '🌫 lost' },
]

export default function VentPage() {
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
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            what's on your mind?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            This is a safe space. Anonymous. No judgment. Just say it.
          </p>
        </div>

        {/* Mood selector */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {moods.map(({ emoji, label }) => (
            <button key={label} onClick={() => toggleMood(label)} style={{
              background: selectedMoods.includes(label) ? 'rgba(201,169,110,0.08)' : 'var(--surface)',
              border: selectedMoods.includes(label) ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '100px', padding: '0.4rem 1rem', fontSize: '0.82rem',
              color: selectedMoods.includes(label) ? 'var(--accent)' : 'var(--muted)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
            }}>
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Vent box */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '1rem',
        }}>
          <textarea
            value={ventText}
            onChange={e => setVentText(e.target.value)}
            placeholder="Start with whatever comes first. There's no wrong way to say it..."
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontFamily: 'var(--font-lora, serif)', fontSize: '1rem',
              lineHeight: 1.8, resize: 'none', minHeight: '180px', caretColor: 'var(--accent)',
            }}
          />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '1rem', borderTop: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf86', display: 'inline-block' }} />
              anonymous · not saved
            </div>
            <button onClick={handleSend} disabled={loading} style={{
              background: 'var(--accent)', color: '#1a1208', fontSize: '0.82rem',
              fontWeight: 500, padding: '0.55rem 1.4rem', borderRadius: '100px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'sending...' : 'send ↗'}
            </button>
          </div>
        </div>

        {/* AI Reply */}
        {submitted && (
          <div style={{
            background: '#1a1e28', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1.5rem', marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              healspace is with you
            </div>
            {loading ? (
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '5px', height: '5px', borderRadius: '50%', background: 'var(--muted)',
                    animation: 'pulse 1.2s infinite', animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
                <style>{`@keyframes pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }`}</style>
              </div>
            ) : (
              <p style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text)' }}>
                {aiReply}
              </p>
            )}
          </div>
        )}

        {/* Others feeling this */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            others feeling this too
          </div>
          {recentVents.map((v, i) => (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '1.2rem 1.4rem', marginBottom: '0.8rem',
            }}>
              <p style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '0.8rem', fontStyle: 'italic' }}>
                "{v.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{v.time}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent)', background: 'rgba(201,169,110,0.1)', padding: '2px 8px', borderRadius: '100px' }}>{v.mood}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}