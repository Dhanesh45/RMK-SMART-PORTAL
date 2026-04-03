import stuimg from '../assets/student.png'
import facimg from '../assets/faculty.png'
import staimg from '../assets/staff.png'
import { Link } from "react-router-dom"
import { useState } from "react"

const roles = [
  { to: "/StudentLogin", img: stuimg, alt: "Student", label: "STUDENT", icon: "🎓", desc: "Access your academic portal" },
  { to: "/FacultyLogin", img: facimg, alt: "Faculty", label: "FACULTY", icon: "👨‍🏫", desc: "Manage classes & approvals" },
  { to: "/OfficeStaffLogin", img: staimg, alt: "Office Staff", label: "OFFICE STAFF", icon: "🏢", desc: "Handle admin operations" },
]

const SelectRole = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a3a4f 0%, #1e4d5a 45%, #1a5a5a 100%)',
        padding: '4vh 3vw',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative orb top-right */}
      <div style={{
        position: 'fixed',
        top: '-10vh',
        right: '-8vw',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,224,203,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Decorative orb bottom-left */}
      <div style={{
        position: 'fixed',
        bottom: '-10vh',
        left: '-8vw',
        width: '35vw',
        height: '35vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,100,120,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main card */}
      <div
        style={{
          width: '92%',
          maxWidth: '1000px',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '2.5vh',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Top banner — matches portal header style */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #1a3a4f 0%, #1e4d5a 50%, #1a5a5a 100%)',
            padding: '4vh 3vw 3vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle circle decoration */}
          <div style={{
            position: 'absolute',
            right: '-4%',
            top: '-30%',
            width: '28vh',
            height: '28vh',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }} />
          <div style={{
            position: 'absolute',
            right: '8%',
            top: '10%',
            width: '14vh',
            height: '14vh',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }} />

          {/* Badge */}
          <div style={{
            background: 'rgba(123,224,203,0.15)',
            border: '1px solid rgba(123,224,203,0.35)',
            borderRadius: '5vh',
            padding: '0.5vh 1.8vh',
            marginBottom: '1.8vh',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7be0cb', display: 'inline-block' }} />
            <span style={{ color: '#7be0cb', fontSize: '1.5vh', fontWeight: 600, letterSpacing: '0.08em' }}>RMK SMART PORTAL</span>
          </div>

          <h1 style={{
            color: '#ffffff',
            fontSize: '3.5vh',
            fontWeight: 800,
            letterSpacing: '0.1em',
            margin: 0,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            Select Your Role
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1.7vh',
            marginTop: '1vh',
            marginBottom: 0,
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}>
            Choose your role to continue and personalize your experience
          </p>
        </div>

        {/* Role cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '2.5vw',
            padding: '5vh 4vw 6vh',
            width: '100%',
            boxSizing: 'border-box',
            flexWrap: 'wrap',
          }}
        >
          {roles.map(({ to, img, alt, label, desc }, i) => (
            <Link
              key={label}
              to={to}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: '1 1 200px',
                maxWidth: '260px',
                minWidth: '160px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: hovered === i
                  ? 'linear-gradient(160deg, #1a3a4f 0%, #1a5a5a 100%)'
                  : '#ffffff',
                border: hovered === i
                  ? '2px solid #1a5a5a'
                  : '2px solid #d0dde8',
                borderRadius: '2vh',
                padding: '3vh 2.5vh 2.5vh',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered === i ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hovered === i
                  ? '0 20px 48px rgba(26,58,79,0.28), 0 4px 12px rgba(0,0,0,0.12)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Hover glow ring */}
              {hovered === i && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #7be0cb, #1a5a5a)',
                  borderRadius: '2vh 2vh 0 0',
                }} />
              )}

              {/* Image container */}
              <div style={{
                width: '13vh',
                height: '13vh',
                borderRadius: '50%',
                background: hovered === i
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, #e8f4f8, #d0e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2.5vh',
                border: hovered === i
                  ? '2px solid rgba(123,224,203,0.35)'
                  : '2px solid rgba(26,58,79,0.12)',
                transition: 'all 0.3s ease',
                padding: '1.5vh',
                boxSizing: 'border-box',
              }}>
                <img
                  src={img}
                  alt={alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: hovered === i ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>

              {/* Label */}
              <h2 style={{
                color: hovered === i ? '#ffffff' : '#1a3a4f',
                fontSize: '2.1vh',
                fontWeight: 800,
                letterSpacing: '0.1em',
                margin: '0 0 0.8vh',
                textAlign: 'center',
                transition: 'color 0.3s ease',
              }}>
                {label}
              </h2>

              {/* Description */}
              <p style={{
                color: hovered === i ? 'rgba(255,255,255,0.6)' : '#6b8fa8',
                fontSize: '1.45vh',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.4,
                transition: 'color 0.3s ease',
              }}>
                {desc}
              </p>

              {/* Arrow indicator */}
              <div style={{
                marginTop: '2vh',
                width: '3.5vh',
                height: '3.5vh',
                borderRadius: '50%',
                background: hovered === i ? 'rgba(123,224,203,0.2)' : 'rgba(26,58,79,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke={hovered === i ? '#7be0cb' : '#1a3a4f'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer strip */}
        <div style={{
          width: '100%',
          padding: '1.5vh 3vw',
          borderTop: '1px solid rgba(26,58,79,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6vw',
          background: 'rgba(26,58,79,0.025)',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7be0cb' }} />
          <span style={{ color: '#6b8fa8', fontSize: '1.35vh', letterSpacing: '0.04em' }}>
            Secure login — R.M.K. Engineering College
          </span>
        </div>
      </div>
    </div>
  )
}

export default SelectRole