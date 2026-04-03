import React, { useState, useEffect } from 'react'
import logo from "../assets/logo.jpg"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['HOME', 'LOGIN HERE', 'FEATURES']

  return (
    <div style={{
      position: 'fixed',
      top: '2.2vh',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '92vw',
      maxWidth: '1200px',
      zIndex: 1000,
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <nav style={{
        height: '6.5vh',
        minHeight: '52px',
        background: scrolled
          ? 'rgba(20, 45, 60, 0.92)'
          : 'rgba(26, 58, 79, 0.75)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(123, 224, 203, 0.18)',
        borderRadius: '5vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2vw',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vh' }}>
          <div style={{
            width: '3.5vh',
            height: '3.5vh',
            minWidth: '28px',
            minHeight: '28px',
            borderRadius: '50%',
            border: '1.5px solid rgba(123,224,203,0.4)',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 0 0 3px rgba(123,224,203,0.08)',
          }}>
            <img src={logo} alt="RMK Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '2.1vh',
            fontWeight: 700,
            letterSpacing: '0.08em',
            margin: 0,
            whiteSpace: 'nowrap',
          }}>
            RMK SMART PORTAL
          </h1>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5vw' }}>
          {links.map((label) => (
            <a
              key={label}
              href="#"
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                color: hoveredLink === label ? '#7be0cb' : 'rgba(255,255,255,0.85)',
                fontSize: '1.7vh',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
                position: 'relative',
                paddingBottom: '2px',
              }}
            >
              {label}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: hoveredLink === label ? '100%' : '0%',
                height: '1.5px',
                background: '#7be0cb',
                borderRadius: '2px',
                transition: 'width 0.25s ease',
                display: 'block',
              }} />
            </a>
          ))}

          {/* Login button */}
          <button
            style={{
              background: 'rgba(123,224,203,0.15)',
              border: '1.5px solid rgba(123,224,203,0.45)',
              color: '#7be0cb',
              fontWeight: 700,
              fontSize: '1.7vh',
              letterSpacing: '0.07em',
              padding: '0.65vh 1.6vw',
              borderRadius: '5vh',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7be0cb'
              e.currentTarget.style.color = '#1a3a4f'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(123,224,203,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(123,224,203,0.15)'
              e.currentTarget.style.color = '#7be0cb'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            LOGIN
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar