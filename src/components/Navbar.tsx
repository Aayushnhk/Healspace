'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth-client'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/vent', label: 'vent' },
    { href: '/feed', label: 'feed' },
    { href: '/checkin', label: 'check-in' },
    { href: '/stories', label: 'stories' },
    { href: '/crisis', label: 'crisis help', red: true },
  ]

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.2rem clamp(1.5rem,4vw,3rem)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: '#0a0a0b', position: 'relative', zIndex: 100,
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'system-ui,sans-serif', fontSize: '1rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#e2ddd6', fontWeight: 500,
        }}>
          HealSpace
          <sub style={{ fontSize: '0.6rem', color: '#6b6860', letterSpacing: '0.1em', verticalAlign: 'middle', marginLeft: '6px', textTransform: 'none' }}>
            you are not alone
          </sub>
        </span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {links.map(({ href, label, red }) => (
          <Link key={href} href={href} style={{
            fontFamily: 'system-ui,sans-serif', fontSize: '0.78rem', letterSpacing: '0.05em',
            color: red ? '#c4746c' : pathname === href ? '#e2ddd6' : '#6b6860',
            textDecoration: 'none', transition: 'color 0.2s',
          }}>{label}</Link>
        ))}
        {session ? (
          <button onClick={() => signOut()} style={{
            fontFamily: 'system-ui,sans-serif', fontSize: '0.72rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', background: 'transparent', color: '#6b6860',
            padding: '0.5rem 1.3rem', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
          }}>sign out</button>
        ) : (
          <Link href="/login" style={{
            fontFamily: 'system-ui,sans-serif', fontSize: '0.72rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', background: '#c9a96e', color: '#0a0a0b',
            padding: '0.5rem 1.3rem', textDecoration: 'none',
          }}>sign in</Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        color: '#e2ddd6', fontSize: '1.2rem', padding: '0.25rem',
      }} className="mobile-menu-btn">
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#0a0a0b', borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
          zIndex: 99,
        }} className="mobile-menu">
          {links.map(({ href, label, red }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'system-ui,sans-serif', fontSize: '0.88rem', letterSpacing: '0.05em',
              color: red ? '#c4746c' : pathname === href ? '#e2ddd6' : '#6b6860',
              textDecoration: 'none',
            }}>{label}</Link>
          ))}
          {session ? (
            <button onClick={() => { signOut(); setMenuOpen(false) }} style={{
              fontFamily: 'system-ui,sans-serif', fontSize: '0.82rem',
              background: 'transparent', color: '#6b6860',
              padding: '0', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>sign out</button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'system-ui,sans-serif', fontSize: '0.82rem',
              color: '#c9a96e', textDecoration: 'none',
            }}>sign in</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}