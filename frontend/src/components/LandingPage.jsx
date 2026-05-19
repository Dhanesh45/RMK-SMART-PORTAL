import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import collegeBg from '../assets/landingpagebg.png'

/* ─── THEME ────────────────────────────────────────────────────────────────── */
const NAVY   = '#1a2744';   // replaces old light-blue; used as primary accent
const BLUE   = '#2563eb';   // icon / highlight blue
const WHITE  = '#ffffff';
const LIGHT  = '#f4f6fb';
const MUTED  = '#6b7280';
const BORDER = '#e5e9f2';

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const NAV_LINKS = ['Home', 'Academics', 'Resources', 'Campus', 'About Us'];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="3" y="3" width="18" height="18" rx="4" fill={BLUE} opacity=".15"/>
        <path d="M15 9H9m6 4H9m4 4H9" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M17 3v4M7 3v4M3 9h18" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Outpass Management',
    desc: 'Apply for outpass easily and track your request in real-time from submission to approval.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="3" y="4" width="18" height="17" rx="3" fill={BLUE} opacity=".15"/>
        <path d="M8 2v4M16 2v4M3 10h18" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 15l2.5 2.5L16 12" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'OD Management',
    desc: 'Submit On-Duty requests for events, workshops, and more with a smooth approval workflow.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
        <rect x="4" y="2" width="16" height="20" rx="3" fill={BLUE} opacity=".15"/>
        <path d="M8 7h8M8 11h8M8 15h5" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Application Services',
    desc: 'Request Bonafide, Fee Structure, Certificates, and other documents online with ease.',
  },
];

const WORKFLOW = [
  { num: '1', role: 'Student',           color: '#f59e0b', desc: 'Submit your request with all required details.' },
  { num: '2', role: 'Counsellor',        color: '#3b82f6', desc: 'Reviews and approves the request.' },
  { num: '3', role: 'Year Coordinator',  color: '#8b5cf6', desc: 'Verifies and forwards the request to the next level.' },
  { num: '4', role: 'Head of Dept',      color: '#10b981', desc: 'Evaluates and approves the request.' },
  { num: '5', role: 'Office Admin',      color: '#ef4444', desc: 'Final approval and processing by the office.' },
];

const FOOTER_SERVICES = ['Outpass Management','OD Management','Application Services','Track Requests','Documents & Certificates'];
const FOOTER_USERS    = ['Students','Faculty','Office Staff','Help & Support'];

/* ─── ICONS ─────────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const ArrowRight = ({ color = WHITE, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const RocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

/* ─── PERSON ICON SVG ────────────────────────────────────────────────────────── */
const PersonIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill={color} opacity=".8"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

/* ─── SOCIAL ICONS ───────────────────────────────────────────────────────────── */
const FBIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IGIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;
const YTIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.4z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>;
const LIIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const featRef = useRef(null);
  const [featVisible, setFeatVisible] = useState(false);
  const workRef = useRef(null);
  const [workVisible, setWorkVisible] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFeatVisible(true); }, { threshold: 0.15 });
    if (featRef.current) obs.observe(featRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWorkVisible(true); }, { threshold: 0.15 });
    if (workRef.current) obs.observe(workRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: LIGHT, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── TOP NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: WHITE,
        
        display: 'flex', alignItems: 'center',
        padding: '0 28px', height: '56px', gap: '0',
    
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginRight: '32px', flexShrink: 0 }}>
          {/* Shield logo */}
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            background: NAVY, borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7v5c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V7L12 3z" fill="rgba(255,255,255,0.9)"/>
              <path d="M9 12l2 2 4-4" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '13.5px', color: NAVY, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>RMK SMART PORTAL</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={l} href="#" style={{
              padding: '0 14px', height: '56px', lineHeight: '56px',
              fontSize: '13px', fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? NAVY : '#374151',
              textDecoration: 'none',
              borderBottom: i === 0 ? `2.5px solid ${NAVY}` : '2.5px solid transparent',
              boxSizing: 'border-box',
              transition: 'color 0.18s, border-color 0.18s',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = NAVY;
                  e.currentTarget.style.borderBottomColor = 'rgba(26,39,68,0.3)';
                }
              }}
              onMouseLeave={e => {
                if (i !== 0) {
                  e.currentTarget.style.color = '#374151';
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }
              }}
            >{l}</a>
          ))}
        </div>

        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: WHITE, border: `1px solid ${BORDER}`,
          borderRadius: '20px', padding: '6px 14px',
          width: '220px', flexShrink: 0, marginRight: '12px',
        }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search for services, resources, and more..."
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: '12px', color: NAVY, width: '100%',
            }}
          />
          <SearchIcon />
        </div>

        {/* Login button */}
        <button style={{
          background: NAVY, color: WHITE,
          border: 'none', borderRadius: '8px',
          padding: '8px 20px', fontSize: '13px', fontWeight: 600,
          cursor: 'pointer', letterSpacing: '0.02em',
          transition: 'background 0.2s, transform 0.15s',
          flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#243660'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.transform = 'translateY(0)'; }}
        >Login</button>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      {/*
        ⚠️  Replace the div below with your real college photo:
            import collegeBg from '../assets/college.jpg';
            Then swap the gradient div for:
            <img src={collegeBg} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} alt="" />
      */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 56px)',
        overflow: 'hidden',
        /* The rounded card look from the reference — thin border around entire hero */
        
        border:"15px solid white",
        
      }}>

        {/* ── Background photo (gradient placeholder; swap with <img> for real photo) */}
        <div style={{
          position: 'absolute', inset: 0,
          /* Simulate a golden-hour college aerial photo with a warm sky gradient */
          background: `
            linear-gradient(
              to bottom,
              #e8a84e 0%,
              #d4843a 15%,
              #8aab6b 38%,
              #5a8a5a 55%,
              #3a6a4a 75%,
              #2a4a38 100%
            )
          `,borderRadius:"15px"
        }}>
          {/* Fake "campus" shapes to hint at an aerial campus view */}
          <div style={{ position:'absolute', bottom:'20%', left:'30%', right:0, height:'50%',
            background:'linear-gradient(160deg,#4a7a5a 0%,#3a6a4a 60%,#2a4a38 100%)', borderRadius:'40% 0 0 0' }} />
          <div style={{ position:'absolute', bottom:'30%', left:'45%', width:'18%', height:'22%',
            background:'#e8e0d0', borderRadius:'4px', opacity:0.9 }} />
          <div style={{ position:'absolute', bottom:'28%', left:'55%', width:'12%', height:'18%',
            background:'#ddd8c8', borderRadius:'4px', opacity:0.85 }} />
          <div style={{ position:'absolute', bottom:'32%', left:'63%', width:'10%', height:'15%',
            background:'#e0dac8', borderRadius:'4px', opacity:0.8 }} />
          {/* Road lines */}
          <div style={{ position:'absolute', bottom:'20%', left:'40%', width:'3%', height:'40%',
            background:'rgba(200,190,170,0.6)', transform:'rotate(-5deg)' }} />
          {/* Buses */}
          <div style={{ position:'absolute', bottom:'19%', left:'33%', width:'6%', height:'4%',
            background:'#f5c842', borderRadius:'3px', opacity:0.95 }} />
          <div style={{ position:'absolute', bottom:'19%', left:'40%', width:'5%', height:'4%',
            background:'#f5c842', borderRadius:'3px', opacity:0.9 }} />
        </div>

        {/* ── Left dark gradient overlay — only covers left ~55% for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(8,14,30,0.82) 0%, rgba(8,14,30,0.72) 35%, rgba(8,14,30,0.38) 58%, transparent 75%)',
          zIndex: 1,borderRadius:"15px"
        }} />

        {/* ── Subtle bottom vignette */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
          zIndex: 1,borderRadius:"15px"
        }} />
        <img src={collegeBg} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top',borderRadius:"15px"}} />
        {/* ── Hero Content ─────────────────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 5vw',
          maxWidth: '600px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.85s ease, transform 0.85s ease',
          
        }}>
          {/* Main heading */}
          <h1 style={{
            color: WHITE,
            fontSize: 'clamp(48px, 7.5vw, 92px)',
            fontWeight: 900,
            lineHeight: 0.95,
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            RMK<br />
            SMART PORTAL
          </h1>

          {/* Description — no bold tagline, just the paragraph like the reference */}
          <p style={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: '14.5px',
            lineHeight: 1.7,
            margin: '0 0 32px',
            maxWidth: '400px',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}>
            Your one-stop digital gateway to academics, resources, campus life, and more.
            Empowering students, faculty, and staff with seamless access to everything RMK.
          </p>

          {/* CTA Buttons — both outlined, "Explore Portal" filled white */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/SelectRole" style={{ textDecoration: 'none' }}>
              <button style={{
                background: WHITE,
                color: NAVY,
                border: `2px solid ${WHITE}`,
                borderRadius: '7px',
                padding: '10px 24px',
                fontSize: '13.5px', fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'all 0.22s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = WHITE; e.currentTarget.style.transform = 'translateY(0)'; }}
              >Explore Portal</button>
            </Link>

            <button style={{
              background: 'transparent',
              color: WHITE,
              border: '2px solid rgba(255,255,255,0.75)',
              borderRadius: '7px',
              padding: '10px 24px',
              fontSize: '13.5px', fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'all 0.22s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'; }}
            >Learn More</button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section ref={featRef} style={{ background: WHITE, padding: '80px 6vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ color: BLUE, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>FEATURES</span>
          <h2 style={{ color: NAVY, fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, margin: '10px 0 12px', lineHeight: 1.15 }}>
            Everything You Need, One{' '}
            <span style={{ color: BLUE }}>Smart Portal</span>
          </h2>
          <p style={{ color: MUTED, fontSize: '15px', margin: 0 }}>Simplifying campus processes and enhancing your experience.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div key={title} style={{
              background: WHITE, border: `1.5px solid ${BORDER}`,
              borderRadius: '16px', padding: '36px 28px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              opacity: featVisible ? 1 : 0,
              transform: featVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
            }}>
              {/* Icon circle */}
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: `rgba(37,99,235,0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {icon}
              </div>
              <div>
                <h3 style={{ color: NAVY, fontSize: '17px', fontWeight: 700, margin: '0 0 8px' }}>{title}</h3>
                <p style={{ color: MUTED, fontSize: '14px', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
              {/* Arrow button */}
              <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                <button style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: NAVY, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', marginTop: '48px',
          background: LIGHT, borderRadius: '40px', padding: '12px 32px',
          width: 'fit-content', margin: '48px auto 0',
          border: `1px solid ${BORDER}`,
        }}>
          {['Secure', 'Transparent', 'Fast', 'Paperless'].map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <span style={{ color: BORDER, fontSize: '20px' }}>•</span>}
              <span style={{ color: NAVY, fontSize: '13px', fontWeight: 600 }}>{t}</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────────────────────── */}
      <section ref={workRef} style={{ background: LIGHT, padding: '80px 6vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: BLUE, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>HOW IT WORKS</span>
          <h2 style={{ color: NAVY, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, margin: '10px 0 12px', lineHeight: 1.15 }}>
            Simple, Transparent &amp; Structured{' '}
            <span style={{ color: BLUE }}>Workflow</span>
          </h2>
          <p style={{ color: MUTED, fontSize: '15px', margin: 0 }}>Every request follows a hierarchical approval process for accuracy and accountability.</p>
        </div>

        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          gap: '0', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap',
        }}>
          {WORKFLOW.map(({ num, role, color, desc }, i) => (
            <div key={role} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
              {/* Step */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: '150px', textAlign: 'center', padding: '0 8px',
                opacity: workVisible ? 1 : 0,
                transform: workVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}>
                {/* Circle */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: WHITE, border: `2px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '14px', position: 'relative',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}>
                  <PersonIcon color={color} />
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 20, height: 20, borderRadius: '50%',
                    background: color, color: WHITE,
                    fontSize: '10px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{num}</span>
                </div>
                <div style={{ color: NAVY, fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>{role}</div>
                <div style={{ color: MUTED, fontSize: '12px', lineHeight: 1.5 }}>{desc}</div>
              </div>

              {/* Arrow connector */}
              {i < WORKFLOW.length - 1 && (
                <div style={{
                  display: 'flex', alignItems: 'center', paddingTop: '24px', flexShrink: 0,
                  opacity: workVisible ? 1 : 0, transition: `opacity 0.5s ease ${(i + 0.5) * 0.1}s`,
                }}>
                  <div style={{ width: '24px', height: '1.5px', background: BORDER }} />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill={MUTED}><path d="M0 5h8M5 1l4 4-4 4"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Track info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center',
          marginTop: '48px', background: WHITE, borderRadius: '40px',
          padding: '12px 28px', width: 'fit-content', margin: '48px auto 0',
          border: `1px solid ${BORDER}`, boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        }}>
          <CheckCircle />
          <span style={{ color: NAVY, fontSize: '13px', fontWeight: 500 }}>Track every stage in real-time and stay updated at every step.</span>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section style={{
        background: NAVY, margin: '0 4vw 64px', borderRadius: '20px',
        padding: '56px 5vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '32px', flexWrap: 'wrap',
        boxShadow: '0 8px 40px rgba(26,39,68,0.25)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG decorative circle */}
        <div style={{
          position: 'absolute', right: '-60px', top: '-60px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <RocketIcon />
          </div>
          <div>
            <h2 style={{ color: WHITE, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
              Experience Campus Life,<br />Simplified.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: 0, maxWidth: '380px', lineHeight: 1.6 }}>
              Join thousands of students who trust RMK Smart Portal for their daily academic needs.
            </p>
          </div>
        </div>

        {/* Buttons + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/SelectRole" style={{ textDecoration: 'none' }}>
              <button style={{
                background: WHITE, color: NAVY,
                border: 'none', borderRadius: '8px',
                padding: '12px 24px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = WHITE; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Login to Portal <ArrowRight color={NAVY} size={14} />
              </button>
            </Link>
            <button style={{
              background: 'transparent', color: WHITE,
              border: `1.5px solid rgba(255,255,255,0.35)`, borderRadius: '8px',
              padding: '12px 24px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
            >Explore Services</button>
          </div>

          {/* College logo placeholder */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: NAVY, color: WHITE, padding: '56px 6vw 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1.5fr', gap: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '8px',
                background: 'rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '0.04em' }}>RMK SMART PORTAL</span>
            </div>
            <p style={{ color: BLUE, fontSize: '12px', fontWeight: 600, margin: '0 0 14px', letterSpacing: '0.02em' }}>Less clicks. Multiple approvals. Zero chaos.</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7, margin: '0 0 24px', maxWidth: '260px' }}>
              A unified digital platform to simplify campus processes and bridge the gap between students, faculty, and administration.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[FBIcon, IGIcon, YTIcon, LIIcon].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34, borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                ><Icon /></a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 style={{ color: WHITE, fontSize: '13px', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.04em' }}>Our Services</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FOOTER_SERVICES.map(s => (
                <li key={s}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = WHITE}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 style={{ color: WHITE, fontSize: '13px', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.04em' }}>For Users</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FOOTER_USERS.map(u => (
                <li key={u}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = WHITE}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >{u}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: WHITE, fontSize: '13px', fontWeight: 700, margin: '0 0 20px', letterSpacing: '0.04em' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📍', text: 'RMK Engineering College\nR.S.M Nagar, Kavaraipettai,\nChennai – 601206' },
                { icon: '✉️', text: 'rsmartportal@gmail.com' },
                { icon: '📞', text: '+91 8925332038' },
                { icon: '🕐', text: 'Mon – Sat : 8:30 AM – 5:30 PM' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12.5px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 0', flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>© 2026 RMK Smart Portal. All Rights Reserved.</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Designed with <span style={{ color: '#ef4444' }}>❤</span> for RMK Community
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;