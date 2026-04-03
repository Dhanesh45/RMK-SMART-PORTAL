import React, { useState, useEffect } from 'react'
import logo from "../../assets/logo.jpg"
import { useNavigate } from 'react-router-dom'

const StuNavbar = ({ setActivePage }) => {
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stuNavItems = ["HOME", "OUTPASS", "ON DUTY", "APPLICATION"]

  return (
    <div style={{
  position: 'sticky',
  top: '0',
  width: '100%',              // ✅ FIXED
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '2.2vh',
  paddingBottom: '1.2vh',     // little more spacing
  zIndex: 1000,
  background: 'transparent'
}}>
      <nav style={{
        width: '80vw',
maxWidth: '1400px',
margin: '0 auto',
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
          ? '0 8px 32px rgba(0,0,0,0.35)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.35s ease',
      }}>

        {/* Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vh' }}>
          <div style={{
            width: '3.5vh',
            height: '3.5vh',
            borderRadius: '50%',
            border: '1.5px solid rgba(123,224,203,0.4)',
            overflow: 'hidden',
          }}>
            <img src={logo} alt="RMK Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{
            color: '#ffffff',
            fontSize: '2.1vh',
            fontWeight: 700,
            letterSpacing: '0.08em',
            margin: 0,
          }}>
            RMK SMART PORTAL
          </h1>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5vw' }}>
          {stuNavItems.map((item) => (
            <span
              key={item}
              onClick={() => setActivePage(item)}
              onMouseEnter={() => setHoveredLink(item)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                color: hoveredLink === item ? '#7be0cb' : 'rgba(255,255,255,0.85)',
                fontSize: '1.7vh',
                fontWeight: 600,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 0.2s ease'
              }}
            >
              {item}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: hoveredLink === item ? '100%' : '0%',
                height: '1.5px',
                background: '#7be0cb',
                transition: 'width 0.25s ease'
              }} />
            </span>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => navigate("/StudentLogin")}
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
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7be0cb'
              e.currentTarget.style.color = '#1a3a4f'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(123,224,203,0.15)'
              e.currentTarget.style.color = '#7be0cb'
            }}
          >
            LOGOUT
          </button>
        </div>

      </nav>
    </div>
  )
}

export default StuNavbar