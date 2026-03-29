'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

const moods = [
  { emoji: '😊', label: 'good', value: 5, color: '#4caf86' },
  { emoji: '🙂', label: 'okay', value: 4, color: '#8fa8c8' },
  { emoji: '😐', label: 'meh', value: 3, color: '#c9a96e' },
  { emoji: '😞', label: 'low', value: 2, color: '#d4845a' },
  { emoji: '😢', label: 'bad', value: 1, color: '#e06b6b' },
]

type CheckIn = {
  mood: string
  note: string
  createdAt: string
  value: number
}

export default function CheckInPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<CheckIn[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('healspace_checkins')
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const handleSubmit = async () => {
    if (!selected) return
    setLoading(true)

    const moodObj = moods.find(m => m.label === selected)
    const entry: CheckIn = {
      mood: selected,
      note,
      createdAt: new Date().toISOString(),
      value: moodObj?.value || 3,
    }

    const updated = [entry, ...history].slice(0, 30)
    localStorage.setItem('healspace_checkins', JSON.stringify(updated))
    setHistory(updated)
    setSubmitted(true)
    setLoading(false)
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  const getMoodColor = (label: string) => moods.find(m => m.label === label)?.color || 'var(--muted)'
  const getMoodEmoji = (label: string) => moods.find(m => m.label === label)?.emoji || '😐'

  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            how are you today?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            A small check-in. No pressure. Just notice.
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Mood picker */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {moods.map(({ emoji, label, color }) => (
                <button key={label} onClick={() => setSelected(label)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  background: selected === label ? 'rgba(201,169,110,0.08)' : 'var(--surface)',
                  border: selected === label ? `1px solid ${color}` : '1px solid var(--border)',
                  borderRadius: '16px', padding: '1.2rem 1.5rem',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                  minWidth: '90px',
                }}>
                  <span style={{ fontSize: '2rem' }}>{emoji}</span>
                  <span style={{ fontSize: '0.78rem', color: selected === label ? color : 'var(--muted)' }}>{label}</span>
                </button>
              ))}
            </div>

            {/* Note */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '1.2rem', marginBottom: '1.5rem',
            }}>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="anything specific on your mind today? (optional)"
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--text)',
                  fontFamily: 'var(--font-lora, serif)', fontSize: '0.95rem',
                  lineHeight: 1.8, resize: 'none', minHeight: '100px',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSubmit} disabled={!selected || loading} style={{
                background: 'var(--accent)', color: '#1a1208',
                fontSize: '0.82rem', fontWeight: 500,
                padding: '0.55rem 1.4rem', borderRadius: '100px',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                opacity: !selected ? 0.5 : 1,
              }}>
                {loading ? 'saving...' : 'check in ↗'}
              </button>
            </div>
          </>
        ) : (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {getMoodEmoji(selected!)}
            </div>
            <p style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1rem', marginBottom: '0.5rem' }}>
              checked in — feeling <span style={{ color: getMoodColor(selected!) }}>{selected}</span>
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              small steps forward still count.
            </p>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              your journey
            </div>

            {/* Simple bar chart */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                {[...history].reverse().slice(-14).map((entry, i) => {
                  const color = getMoodColor(entry.mood)
                  const height = `${(entry.value / 5) * 100}%`
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{
                        width: '100%', background: color, borderRadius: '4px 4px 0 0',
                        height, opacity: 0.8, minHeight: '4px', transition: 'height 0.3s',
                      }} />
                    </div>
                  )
                })}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                last {Math.min(history.length, 14)} check-ins
              </div>
            </div>

            {/* List */}
            {history.slice(0, 7).map((entry, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.9rem 1.2rem',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '12px', marginBottom: '0.6rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{getMoodEmoji(entry.mood)}</span>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: getMoodColor(entry.mood) }}>{entry.mood}</div>
                    {entry.note && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>{entry.note}</div>}
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{formatDate(entry.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}