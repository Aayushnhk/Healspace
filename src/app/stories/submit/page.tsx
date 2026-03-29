'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function SubmitStoryPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return
    setLoading(true)
    try {
      await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, age: age ? parseInt(age) : null }),
      })
      setDone(true)
    } catch {
      console.error('Failed to submit')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <main>
        <Navbar />
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>🌱</div>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '1rem' }}>
            thank you for sharing
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Your story will help someone survive tonight. That matters more than you know.
          </p>
          <button onClick={() => router.push('/stories')} style={{
            background: 'var(--accent)', color: '#1a1208',
            fontSize: '0.82rem', fontWeight: 500,
            padding: '0.55rem 1.4rem', borderRadius: '100px',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            read other stories
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-lora, serif)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem' }}>
            share your story
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            You made it through. Someone out there needs to know that's possible. Anonymous always.
          </p>
        </div>

        {/* Title */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
            one line that sums it up
          </label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. I thought I wouldn't survive the first month"
            style={{
              width: '100%', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px',
              padding: '0.9rem 1.2rem', color: 'var(--text)',
              fontFamily: 'var(--font-lora, serif)', fontSize: '0.95rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Story */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
            your story
          </label>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '1.2rem',
          }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What got you through? What do you wish someone had told you? Write it in your own words..."
              style={{
                width: '100%', background: 'transparent', border: 'none',
                outline: 'none', color: 'var(--text)',
                fontFamily: 'var(--font-lora, serif)', fontSize: '0.95rem',
                lineHeight: 1.8, resize: 'none', minHeight: '200px',
              }}
            />
          </div>
        </div>

        {/* Age */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
            your age (optional)
          </label>
          <input
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="e.g. 26"
            type="number"
            style={{
              width: '120px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px',
              padding: '0.9rem 1.2rem', color: 'var(--text)',
              fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf86', display: 'inline-block' }} />
            always anonymous
          </span>
          <button onClick={handleSubmit} disabled={loading || !title.trim() || !content.trim()} style={{
            background: 'var(--accent)', color: '#1a1208',
            fontSize: '0.82rem', fontWeight: 500,
            padding: '0.55rem 1.4rem', borderRadius: '100px',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            opacity: loading || !title.trim() || !content.trim() ? 0.5 : 1,
          }}>
            {loading ? 'submitting...' : 'share your story ↗'}
          </button>
        </div>
      </div>
    </main>
  )
}