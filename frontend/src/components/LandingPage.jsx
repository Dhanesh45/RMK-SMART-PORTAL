import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import bubbleTopRight from '../assets/rightbubble.png';
import bubbleBottomLeft from '../assets/leftbubble.png';
import mainVectorImage from '../assets/landing.png';
import { Link } from "react-router-dom"

const stats = [
  { value: '3+', label: 'Services' },
  { value: '5K+', label: 'Students' },
  { value: '100%', label: 'Digital' },
]

const LandingPage = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a3a4f 0%, #1e4d5a 45%, #1a5a5a 100%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Decorative orb — top right */}
      <div style={{
        position: 'absolute',
        top: '-12vh',
        right: '-8vw',
        width: '45vw',
        height: '45vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,224,203,0.10) 0%, transparent 68%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Decorative orb — bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '-12vh',
        left: '-8vw',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,80,100,0.35) 0%, transparent 68%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Subtle grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '6vw 6vw',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Bubble assets (kept from original) */}
      <img src={bubbleTopRight} alt="" aria-hidden="true"
        style={{ position: 'absolute', top: 0, right: 0, width: '18vw', opacity: 0.07, zIndex: 0, pointerEvents: 'none' }} />
      <img src={bubbleBottomLeft} alt="" aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '22vw', opacity: 0.07, zIndex: 0, pointerEvents: 'none' }} />

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        gap: '2vw',
      }}>

        {/* Left: Text */}
        <div style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            background: 'rgba(123,224,203,0.12)',
            border: '1px solid rgba(123,224,203,0.3)',
            borderRadius: '5vh',
            padding: '0.55vh 1.6vh',
            marginBottom: '2.5vh',
            width: 'fit-content',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7be0cb', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: '#7be0cb', fontSize: '1.5vh', fontWeight: 600, letterSpacing: '0.09em' }}>
              R.M.K. ENGINEERING COLLEGE
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            color: '#ffffff',
            fontSize: '6.5vh',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            margin: '0 0 2.2vh',
            textTransform: 'uppercase',
          }}>
            RMK<br />
            <span style={{ color: '#7be0cb' }}>Smart</span>{' '}
            Portal
          </h1>

          {/* Description */}
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1.85vh',
            lineHeight: 1.75,
            margin: '0 0 4vh',
            maxWidth: '38vw',
          }}>
            An integrated digital platform designed to streamline student services —
            enabling efficient management of outpass, on-duty, and bonafide processes
            with full transparency and accuracy.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5vw', marginBottom: '4.5vh' }}>
            <Link to="/SelectRole" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: '#7be0cb',
                  color: '#1a3a4f',
                  fontSize: '1.8vh',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '1.4vh 2.8vw',
                  borderRadius: '5vh',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8vw',
                  boxShadow: '0 6px 24px rgba(123,224,203,0.25)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#5dcfb5'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(123,224,203,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#7be0cb'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(123,224,203,0.25)'
                }}
              >
                GET STARTED
                <span style={{ fontSize: '2.2vh', lineHeight: 1 }}>→</span>
              </button>
            </Link>

            <a href="#" style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.7vh',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              paddingBottom: '1px',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >
              Learn more
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '2.5vw',
            paddingTop: '3vh',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{ color: '#ffffff', fontSize: '2.8vh', fontWeight: 800, lineHeight: 1 }}>{value}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.4vh', marginTop: '0.4vh', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Illustration */}
        <div style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateX(0)' : 'translateX(32px)',
          transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
        }}>
          {/* Glow ring behind image */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute',
              width: '55vh',
              height: '55vh',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,224,203,0.08) 0%, transparent 70%)',
              border: '1px solid rgba(123,224,203,0.1)',
            }} />
            <img
              src={mainVectorImage}
              alt="Students illustration"
              style={{
                maxWidth: '42vw',
                maxHeight: '78vh',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.25))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage