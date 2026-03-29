'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

const moodColors: Record<string, string> = {
  heartbroken: '#e06b6b',
  numb: '#8fa8c8',
  angry: '#d4845a',
  lonely: '#c9a96e',
  anxious: '#a88fc8',
  lost: '#7a7a8a',
}

type Vent = {
  id: string
  content: string
  mood: string | null
  createdAt: string
}

export default function FeedPage() {
  const [vents, setVents] = useState<Vent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/feed')
      .then(r => r.json())
      .then(data => {
        setVents(data.vents || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            you are not alone
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Anonymous voices from people feeling exactly what you feel.
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2rem 0' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: 'var(--muted)',
                animation: 'pulse 1.2s infinite',
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
            <style>{`@keyframes pulse{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}`}</style>
          </div>
        ) : vents.length === 0 ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '3rem', textAlign: 'center',
          }}>
            <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-lora, serif)', fontStyle: 'italic' }}>
              no vents yet. be the first to share.
            </p>
          </div>
        ) : (
          vents.map((vent) => {
            const moods = vent.mood?.split(', ').filter(Boolean) || []
            return (
              <div key={vent.id} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '1.4rem 1.6rem',
                marginBottom: '0.8rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-lora, serif)', fontSize: '0.95rem',
                  lineHeight: 1.8, color: 'var(--text)', fontStyle: 'italic',
                  marginBottom: '1rem',
                }}>
                  "{vent.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {moods.map(mood => (
                      <span key={mood} style={{
                        fontSize: '0.7rem',
                        color: moodColors[mood] || 'var(--accent)',
                        background: `${moodColors[mood] || 'var(--accent)'}15`,
                        padding: '2px 10px', borderRadius: '100px',
                      }}>{mood}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{timeAgo(vent.createdAt)}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}