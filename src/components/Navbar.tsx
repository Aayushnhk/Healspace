'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

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
      padding: '1.2rem 2rem', borderBottom: '1px solid var(--border)',
      position: 'relative', zIndex: 10,
    }}>
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-lora)', fontSize: '1.2rem', color: 'var(--accent)' }}>HealSpace</span>
          <span style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.75rem' }}>you are not alone</span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'nowrap' }}>
        {links.map(({ href, label, red }) => (
          <Link key={href} href={href} style={{
            color: red ? '#e06b6b' : pathname === href ? 'var(--text)' : 'var(--muted)',
            fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s',
            opacity: red && pathname !== href ? 0.8 : 1, whiteSpace: 'nowrap',
          }}>{label}</Link>
        ))}

        <Link href="/vent" style={{
          background: 'var(--accent)', color: '#1a1208',
          fontSize: '0.78rem', fontWeight: 500,
          padding: '0.45rem 1.1rem', borderRadius: '100px',
          textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
        }}>start healing</Link>
      </div>
    </nav>
  )
}