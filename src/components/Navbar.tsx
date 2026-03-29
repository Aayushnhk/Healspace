'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 2rem',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      zIndex: 10,
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-lora)',
            fontSize: '1.3rem',
            color: 'var(--accent)',
            letterSpacing: '0.02em',
          }}>HealSpace</span>
          <span style={{
            color: 'var(--muted)',
            fontStyle: 'italic',
            fontSize: '0.8rem',
          }}>you are not alone</span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/vent" style={{
          color: pathname === '/vent' ? 'var(--text)' : 'var(--muted)',
          fontSize: '0.85rem',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}>vent</Link>

        <Link href="/stories" style={{
          color: pathname === '/stories' ? 'var(--text)' : 'var(--muted)',
          fontSize: '0.85rem',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}>survival stories</Link>

        <Link href="/vent" style={{
          background: 'var(--accent)',
          color: '#1a1208',
          fontSize: '0.8rem',
          fontWeight: 500,
          padding: '0.5rem 1.2rem',
          borderRadius: '100px',
          textDecoration: 'none',
        }}>start healing</Link>
      </div>
    </nav>
  )
}