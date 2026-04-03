import React, { useMemo, useState } from "react";
import StuNavbar from "./StuNavbar";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --teal: #0abfb8;
    --teal-dark: #089e98;
    --teal-light: #e6faf9;
    --teal-glow: rgba(10, 191, 184, 0.15);
    --navy: #0d1f2d;
    --navy-mid: #1a3245;
    --slate: #4a6378;
    --muted: #8fa3b3;
    --surface: #f5f8fa;
    --white: #ffffff;
    --green: #12c264;
    --green-bg: #e8faf1;
    --amber: #f59e0b;
    --amber-bg: #fef3c7;
    --red: #ef4444;
    --red-bg: #fee2e2;
    --border: rgba(10, 191, 184, 0.12);
    --shadow-sm: 0 2px 8px rgba(13, 31, 45, 0.06);
    --shadow-md: 0 4px 24px rgba(13, 31, 45, 0.1);
    --shadow-lg: 0 8px 48px rgba(13, 31, 45, 0.14);
    --radius: 16px;
  }

  .sd-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sd-root { font-family: 'DM Sans', sans-serif; background: var(--surface); min-height: 100vh; }

  /* ── LAYOUT ── */
  .sd-body {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    padding: 24px 28px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── LEFT COLUMN ── */
  .sd-left { display: flex; flex-direction: column; gap: 20px; }

  /* ── HERO CARD ── */
  .sd-hero {
    border-radius: var(--radius);
    background: var(--white);
    box-shadow: var(--shadow-md);
    overflow: visible;
    position: relative;
  }

  .sd-banner {
    height: 120px;
    border-radius: var(--radius) var(--radius) 0 0;
    background: linear-gradient(135deg, #0abfb8 0%, #0d8fa6 45%, #0d5c8a 100%);
    position: relative;
    overflow: hidden;
  }

  .sd-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%),
      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }

  .sd-banner-rings {
    position: absolute;
    right: -30px;
    top: -30px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: transparent;
    border: 40px solid rgba(255,255,255,0.05);
    box-shadow: 0 0 0 30px rgba(255,255,255,0.04);
  }

  .sd-avatar-wrap {
    position: absolute;
    bottom: -28px;
    left: 32px;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 3px solid var(--white);
    box-shadow: 0 4px 20px rgba(13, 31, 45, 0.2);
    overflow: hidden;
    background: var(--white);
    z-index: 2;
  }
  .sd-avatar-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .sd-hero-body {
    padding: 40px 32px 24px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .sd-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: var(--navy); }
  .sd-email { font-size: 13px; color: var(--muted); margin-top: 2px; }

  .sd-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
  .sd-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    color: var(--slate);
  }
  .sd-chip span { color: var(--teal); font-weight: 600; }

  .sd-badge {
    padding: 6px 14px;
    background: var(--teal-light);
    color: var(--teal-dark);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border: 1px solid rgba(10,191,184,0.2);
    white-space: nowrap;
  }

  /* ── HISTORY CARD ── */
  .sd-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    padding: 24px;
  }

  .sd-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sd-card-title::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background: var(--teal);
  }

  .sd-table-wrap { overflow-x: auto; }
  .sd-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 6px;
    font-size: 13px;
  }

  .sd-table thead th {
    text-align: left;
    padding: 6px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--muted);
  }

  .sd-table tbody tr td {
    padding: 12px 14px;
    background: var(--surface);
    color: var(--navy);
    font-weight: 400;
    transition: background 0.15s;
  }
  .sd-table tbody tr:hover td { background: var(--teal-light); }

  .sd-table tbody tr td:first-child { border-radius: 10px 0 0 10px; }
  .sd-table tbody tr td:last-child { border-radius: 0 10px 10px 0; }

  .sd-days-pill {
    display: inline-block;
    padding: 2px 10px;
    background: var(--teal-glow);
    color: var(--teal-dark);
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    border: 1px solid rgba(10,191,184,0.2);
  }

  .sd-reason-tag {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    background: var(--amber-bg);
    color: #92400e;
    border: 1px solid rgba(245,158,11,0.2);
  }

  /* ── RIGHT COLUMN ── */
  .sd-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sd-approval-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sd-approval-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--navy);
    text-align: center;
  }
  .sd-approval-sub {
    font-size: 12px;
    color: var(--muted);
    text-align: center;
    margin-top: 2px;
  }

  /* ── STAGES ── */
  .sd-stages { display: flex; flex-direction: column; gap: 0; position: relative; }

  .sd-stage-item {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    padding: 10px 0;
    z-index: 1;
  }

  .sd-stage-line {
    position: absolute;
    left: 18px;
    top: 36px;
    bottom: -10px;
    width: 2px;
    background: var(--border);
    z-index: 0;
  }
  .sd-stage-line.filled { background: linear-gradient(180deg, var(--teal) 0%, rgba(10,191,184,0.3) 100%); }

  .sd-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    position: relative;
    z-index: 2;
    transition: all 0.3s;
  }
  .sd-dot.approved {
    background: var(--green-bg);
    color: var(--green);
    border: 2px solid rgba(18,194,100,0.3);
    box-shadow: 0 0 0 4px rgba(18,194,100,0.08);
  }
  .sd-dot.pending {
    background: var(--amber-bg);
    color: var(--amber);
    border: 2px solid rgba(245,158,11,0.3);
    box-shadow: 0 0 0 4px rgba(245,158,11,0.08);
    animation: pulse 2s ease infinite;
  }
  .sd-dot.future {
    background: var(--surface);
    color: var(--muted);
    border: 2px solid var(--border);
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(245,158,11,0.08); }
    50% { box-shadow: 0 0 0 8px rgba(245,158,11,0.14); }
  }

  .sd-stage-info { flex: 1; }
  .sd-stage-name { font-size: 13px; font-weight: 500; color: var(--navy); }
  .sd-stage-status { font-size: 11px; margin-top: 2px; }
  .sd-stage-status.approved { color: var(--green); }
  .sd-stage-status.pending { color: var(--amber); }
  .sd-stage-status.future { color: var(--muted); }

  /* ── PROGRESS BAR ── */
  .sd-progress-section { display: flex; flex-direction: column; gap: 8px; }
  .sd-progress-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }
  .sd-progress-track {
    height: 6px;
    background: var(--surface);
    border-radius: 100px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .sd-progress-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, var(--teal) 0%, #0d8fa6 100%);
    transition: width 0.6s ease;
    box-shadow: 0 0 8px rgba(10,191,184,0.5);
  }

  /* ── STATS ── */
  .sd-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .sd-stat {
    background: var(--surface);
    border-radius: 12px;
    padding: 12px;
    border: 1px solid var(--border);
    text-align: center;
  }
  .sd-stat-num { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: var(--navy); }
  .sd-stat-label { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .sd-stat-num.teal { color: var(--teal-dark); }

  @media (max-width: 960px) {
    .sd-body { grid-template-columns: 1fr; }
    .sd-right { flex-direction: row; flex-wrap: wrap; }
    .sd-approval-card { flex: 1; min-width: 260px; }
  }
`;

export default function Studentdash() {
  const currentStage = 0;

  const stages = [
    "Applied",
    "Counsellor",
    "Year Coordinator",
    "HOD",
    "Approved",
  ];

  const student = {
    name: "Dhanesh P",
    email: "230550.it@rmkec.ac.in",
    regno: "111723203021",
    degree: "B.Tech - Information Technology",
    batch: "2027",
    college: "R.M.K. Engineering College",
    profile:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
  };

  const history = [
    { id: 1, reason: "DEEPAVALI", from: "01/08/2025", to: "01/08/2025", days: 1 },
    { id: 2, reason: "DEEPAVALI", from: "05/08/2025", to: "09/08/2025", days: 5 },
    { id: 3, reason: "DEEPAVALI", from: "12/08/2025", to: "14/08/2025", days: 3 },
    { id: 4, reason: "FESTIVAL", from: "20/08/2025", to: "21/08/2025", days: 2 },
    { id: 5, reason: "TRIP", from: "25/08/2025", to: "27/08/2025", days: 3 },
  ];

  const totalDays = history.reduce((s, h) => s + h.days, 0);

  const fillPercent = useMemo(() => {
    if (currentStage <= 0) return 0;
    return Math.round((currentStage / (stages.length - 1)) * 100);
  }, [currentStage, stages.length]);

  const markerStatus = (idx) => {
    if (currentStage === 4) return "approved";
    if (idx < currentStage) return "approved";
    if (idx === currentStage) return "pending";
    return "future";
  };

  const stageIcon = (st) => {
    if (st === "approved") return "✓";
    if (st === "pending") return "●";
    return "○";
  };

  const stageLabel = (st) => {
    if (st === "approved") return "Approved";
    if (st === "pending") return "Awaiting review";
    return "Pending";
  };

  return (
    <div className="sd-root">
      <style>{styles}</style>
     

      <div className="sd-body">
        {/* ── LEFT ── */}
        <div className="sd-left">

          {/* Hero */}
          <div className="sd-hero">
            <div className="sd-banner">
              <div className="sd-banner-rings" />
            </div>

            <div className="sd-hero-body">
              <div>
                <div className="sd-name">{student.name}</div>
                <div className="sd-email">{student.email}</div>
                <div className="sd-chips">
                  <div className="sd-chip">Reg <span>{student.regno}</span></div>
                  <div className="sd-chip">Batch <span>{student.batch}</span></div>
                  <div className="sd-chip">Dept <span>IT</span></div>
                  <div className="sd-chip">{student.college}</div>
                </div>
              </div>
              <div className="sd-badge">B.Tech · Information Technology</div>
            </div>
          </div>

          {/* History */}
          <div className="sd-card">
            <div className="sd-card-title">Leave History</div>
            <div className="sd-table-wrap">
              <table className="sd-table">
                <thead>
                  <tr>
                    {["#", "Reason", "From", "To", "Days"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, idx) => (
                    <tr key={h.id}>
                      <td style={{ color: "var(--muted)", fontWeight: 500 }}>{String(idx + 1).padStart(2, "0")}</td>
                      <td><span className="sd-reason-tag">{h.reason}</span></td>
                      <td>{h.from}</td>
                      <td>{h.to}</td>
                      <td><span className="sd-days-pill">{h.days}d</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="sd-right">

          {/* Stats */}
          <div className="sd-stats">
            <div className="sd-stat">
              <div className="sd-stat-num teal">{history.length}</div>
              <div className="sd-stat-label">Requests</div>
            </div>
            <div className="sd-stat">
              <div className="sd-stat-num">{totalDays}</div>
              <div className="sd-stat-label">Total Days</div>
            </div>
          </div>

          {/* Approval Card */}
          <div className="sd-approval-card">
            <div>
              <div className="sd-approval-title">OD Approval Status</div>
              <div className="sd-approval-sub">Step {currentStage + 1} of {stages.length}</div>
            </div>

            {/* Progress */}
            <div className="sd-progress-section">
              <div className="sd-progress-label">
                <span>Progress</span>
                <span style={{ color: "var(--teal-dark)", fontWeight: 600 }}>{fillPercent}%</span>
              </div>
              <div className="sd-progress-track">
                <div className="sd-progress-fill" style={{ width: `${fillPercent}%` }} />
              </div>
            </div>

            {/* Stages */}
            <div className="sd-stages">
              {stages.map((s, i) => {
                const st = markerStatus(i);
                const isLast = i === stages.length - 1;
                return (
                  <div key={s} style={{ position: "relative" }}>
                    <div className="sd-stage-item">
                      <div className={`sd-dot ${st}`}>{stageIcon(st)}</div>
                      <div className="sd-stage-info">
                        <div className="sd-stage-name">{s}</div>
                        <div className={`sd-stage-status ${st}`}>{stageLabel(st)}</div>
                      </div>
                    </div>
                    {!isLast && (
                      <div
                        className={`sd-stage-line ${i < currentStage ? "filled" : ""}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}