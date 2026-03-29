'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (mode === 'login') {
        await signIn.email({ email, password })
      } else {
        await signUp.email({ email, password, name })
      }
      router.push('/')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    await signIn.social({ provider: 'google' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0f0f10',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '0.85rem 1rem',
    fontFamily: 'system-ui,sans-serif',
    fontSize: '0.88rem',
    color: '#e2ddd6',
    outline: 'none',
    marginBottom: '0.75rem',
  }

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', color: '#e2ddd6' }}>
      <Navbar />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: 'calc(100vh - 65px)' }}>

        {/* Left — form */}
        <div style={{ padding: 'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '360px', width: '100%' }}>

            <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6860', marginBottom: '1rem' }}>
              {mode === 'login' ? 'welcome back' : 'join healspace'}
            </div>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 400, marginBottom: '2.5rem', lineHeight: 1.2 }}>
              {mode === 'login' ? 'sign in to your space' : 'create your safe space'}
            </h2>

            {/* Google button */}
            <button onClick={handleGoogle} style={{
              width: '100%', background: '#fff',
              border: 'none', padding: '0.8rem 1rem',
              marginBottom: '1.5rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              fontFamily: 'system-ui,sans-serif', fontSize: '0.82rem',
              fontWeight: 500, color: '#1a1a1a',
            }}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', color: '#3a3835', letterSpacing: '0.08em' }}>or continue with email</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {mode === 'signup' && (
              <input value={name} onChange={e => setName(e.target.value)} placeholder="your name" style={inputStyle} />
            )}

            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email address" type="email" style={inputStyle} />

            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" style={{ ...inputStyle, marginBottom: '1.5rem' }} />

            {error && (
              <div style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.78rem', color: '#c4746c', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #c4746c' }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading} style={{
              width: '100%', background: '#c9a96e', color: '#0a0a0b',
              fontFamily: 'system-ui,sans-serif', fontSize: '0.75rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontWeight: 500, padding: '0.9rem',
              border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1,
              marginBottom: '1.5rem',
            }}>
              {loading ? 'please wait...' : mode === 'login' ? 'sign in' : 'create account'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'system-ui,sans-serif', fontSize: '0.78rem', color: '#6b6860',
              }}>
                {mode === 'login' ? "don't have an account? sign up →" : 'already have an account? sign in →'}
              </button>
            </div>
          </div>
        </div>

        {/* Right — quotes, hidden on mobile */}
        <div style={{ padding: 'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5rem' }} className="login-quotes">
          {[
            { quote: '"I thought I wouldn\'t survive the first month. Eighteen months later, I am the happiest I have ever been."', cite: '— anonymous, 28' },
            { quote: '"The grief was real. So was the growth. I journaled every day and one day I read back and realized I had changed."', cite: '— anonymous, 24' },
            { quote: '"You don\'t wait for motivation — you act, and it follows."', cite: '— anonymous, 31' },
          ].map((q, i) => (
            <div key={i} style={{ paddingLeft: '1.5rem', borderLeft: '1px solid rgba(201,169,110,0.2)' }}>
              <blockquote style={{ fontFamily: 'Georgia,serif', fontSize: '0.92rem', lineHeight: 1.8, color: '#6b6860', fontStyle: 'italic' }}>{q.quote}</blockquote>
              <cite style={{ fontFamily: 'system-ui,sans-serif', fontSize: '0.68rem', color: '#3a3835', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.6rem', display: 'block', fontStyle: 'normal' }}>{q.cite}</cite>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .login-quotes { display: none !important; }
        }
      `}</style>
    </main>
  )
}