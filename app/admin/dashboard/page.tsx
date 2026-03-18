'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Calendar, Users, Mail, TrendingUp, TrendingDown,
  Clock, CheckCircle, XCircle, AlertCircle, FileText, Image, Stethoscope,
  ChevronRight,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface ScheduleItem {
  id: string;
  time: string;
  patient: string;
  service: string;
  doctor: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

interface ActivityItem {
  id: string;
  type: 'appointment' | 'message' | 'blog' | 'gallery';
  text: string;
  time: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const STATS: StatCard[] = [
  { label: "Today's Appointments", value: 8,  change: +2,  icon: Calendar,     color: 'var(--admin-gold)'    },
  { label: "This Week's Appts",    value: 34, change: +5,  icon: TrendingUp,   color: 'var(--admin-info)'    },
  { label: 'Unread Messages',      value: 12, change: -3,  icon: Mail,         color: 'var(--admin-warning)' },
  { label: 'Patients This Month',  value: 96, change: +18, icon: Users,        color: 'var(--admin-success)' },
];

const WEEK_DATA = [12, 19, 15, 22, 17, 28, 34];
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SCHEDULE: ScheduleItem[] = [
  { id:'1', time:'09:00', patient:'Emma Wilson',     service:'Teeth Whitening',    doctor:'Dr. Harrington', status:'confirmed'  },
  { id:'2', time:'09:45', patient:'James Robertson', service:'Dental Implant',     doctor:'Dr. Whitfield',  status:'confirmed'  },
  { id:'3', time:'10:30', patient:'Priya Sharma',    service:'General Check-up',   doctor:'Dr. Harrington', status:'completed'  },
  { id:'4', time:'11:15', patient:'Oliver Chen',     service:'Invisalign',         doctor:'Dr. Crane',      status:'pending'    },
  { id:'5', time:'12:00', patient:'Sophie Williams', service:'Root Canal',         doctor:'Dr. Delacroix',  status:'cancelled'  },
  { id:'6', time:'13:30', patient:'Liam Johnson',    service:'Porcelain Veneers',  doctor:'Dr. Harrington', status:'confirmed'  },
  { id:'7', time:'14:15', patient:'Amelia Davis',    service:'Paediatric Check',   doctor:'Dr. Forsythe',   status:'confirmed'  },
  { id:'8', time:'15:00', patient:'Noah Brown',      service:'Gum Treatment',      doctor:'Dr. Nair',       status:'pending'    },
];

const ACTIVITY: ActivityItem[] = [
  { id:'1', type:'appointment', text:'New booking: Emma Wilson \u2014 Teeth Whitening',    time:'2 min ago'  },
  { id:'2', type:'message',     text:'Contact form: John Doe enquiring about implants', time:'14 min ago' },
  { id:'3', type:'appointment', text:'Cancelled: Sophia Lee \u2014 3:00 PM today',          time:'31 min ago' },
  { id:'4', type:'blog',        text:'Blog post published: "Guide to Dental Implants"', time:'1 hr ago'   },
  { id:'5', type:'appointment', text:'Appointment confirmed: James Robertson \u2014 9:45 AM',time:'2 hr ago'   },
  { id:'6', type:'gallery',     text:'5 new gallery images uploaded to Cosmetic category', time:'3 hr ago'   },
  { id:'7', type:'message',     text:'Contact form: Anna M\u00fcller \u2014 appointment request', time:'4 hr ago'   },
];

const MINI_STATS = [
  { label:'Blog Posts',       value:24, icon: FileText,     color:'var(--admin-info)'    },
  { label:'Gallery Images',   value:87, icon: Image,        color:'var(--admin-success)' },
  { label:'Active Doctors',   value:6,  icon: Stethoscope,  color:'var(--admin-gold)'    },
];

// ── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200): number {
  const [val, setVal] = useState(0);
  const frame = useRef<number | null>(null);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.round(progress * target));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [target, duration]);
  return val;
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ScheduleItem['status'] }) {
  const cfg: Record<string, { color: string; bg: string; icon: React.ElementType; label: string }> = {
    confirmed:  { color:'var(--admin-info)',    bg:'rgba(96,165,250,0.12)',   icon: CheckCircle,  label:'Confirmed'  },
    pending:    { color:'var(--admin-warning)', bg:'rgba(251,191,36,0.12)',   icon: AlertCircle,  label:'Pending'    },
    completed:  { color:'var(--admin-success)', bg:'rgba(45,212,191,0.12)',   icon: CheckCircle,  label:'Completed'  },
    cancelled:  { color:'var(--admin-danger)',  bg:'rgba(248,113,113,0.12)',  icon: XCircle,      label:'Cancelled'  },
  };
  const { color, bg, icon: Icon, label } = cfg[status];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, backgroundColor:bg, color, fontSize:12, fontWeight:500 }}>
      <Icon size={12} />{label}
    </span>
  );
}

// ── Activity icon ──────────────────────────────────────────────────────────
function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const cfg = {
    appointment: { icon: Calendar, color:'var(--admin-info)'    },
    message:     { icon: Mail,     color:'var(--admin-warning)' },
    blog:        { icon: FileText, color:'var(--admin-success)' },
    gallery:     { icon: Image,    color:'var(--admin-gold)'    },
  };
  const { icon: Icon, color } = cfg[type];
  return (
    <div style={{ width:32, height:32, borderRadius:'50%', backgroundColor:'var(--admin-elevated)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <Icon size={15} color={color} />
    </div>
  );
}

// ── SVG Line Chart ─────────────────────────────────────────────────────────
function AppointmentsChart() {
  const W = 480, H = 180, PAD = { t: 20, r: 20, b: 36, l: 40 };
  const chartW = W - PAD.l - PAD.r;
  const chartH = H - PAD.t - PAD.b;
  const max = Math.max(...WEEK_DATA) + 4;

  const pts = WEEK_DATA.map((v, i) => ({
    x: PAD.l + (i / (WEEK_DATA.length - 1)) * chartW,
    y: PAD.t + chartH - (v / max) * chartH,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(PAD.t + chartH).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(PAD.t + chartH).toFixed(1)} Z`;

  // Y grid lines
  const gridY = [0, 0.25, 0.5, 0.75, 1].map(f => PAD.t + chartH * (1 - f));
  const gridVals = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * max));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:'auto' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--admin-gold)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--admin-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {gridY.map((y, i) => (
        <g key={i}>
          <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="var(--admin-border)" strokeWidth="1" />
          <text x={PAD.l - 6} y={y + 4} textAnchor="end" fill="var(--admin-muted)" fontSize="10">{gridVals[i]}</text>
        </g>
      ))}
      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--admin-gold)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* Points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="var(--admin-gold)" stroke="var(--admin-surface)" strokeWidth="2" />
      ))}
      {/* X labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 6} textAnchor="middle" fill="var(--admin-muted)" fontSize="11">{WEEK_LABELS[i]}</text>
      ))}
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ card }: { card: StatCard }) {
  const displayVal = useCountUp(card.value);
  return (
    <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:'20px 24px', display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ width:48, height:48, borderRadius:12, backgroundColor:'var(--admin-elevated)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <card.icon size={22} color={card.color} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ color:'var(--admin-muted)', fontSize:12, fontWeight:500, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>{card.label}</div>
        <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
          <span style={{ color:'var(--admin-text)', fontSize:28, fontWeight:700, fontFamily:'var(--font-mono)' }}>{displayVal}</span>
          <span style={{ display:'flex', alignItems:'center', gap:3, fontSize:12, color: card.change >= 0 ? 'var(--admin-success)' : 'var(--admin-danger)', fontWeight:500 }}>
            {card.change >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {card.change >= 0 ? '+' : ''}{card.change}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)', marginBottom:4 }}>Dashboard</h1>
        <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{today}</p>
      </div>

      {/* Row 1 \u2014 Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16, marginBottom:24 }}>
        {STATS.map(card => <StatCard key={card.label} card={card} />)}
      </div>

      {/* Row 2 \u2014 Chart + Activity */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:16, marginBottom:24 }}>
        {/* Chart */}
        <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div>
              <div style={{ color:'var(--admin-text)', fontSize:15, fontWeight:600, marginBottom:2 }}>Appointments This Week</div>
              <div style={{ color:'var(--admin-muted)', fontSize:12 }}>Daily appointment volume</div>
            </div>
            <span style={{ backgroundColor:'rgba(184,149,106,0.12)', color:'var(--admin-gold)', padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:500 }}>147 total</span>
          </div>
          <AppointmentsChart />
        </div>
        {/* Activity Feed */}
        <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div style={{ color:'var(--admin-text)', fontSize:15, fontWeight:600 }}>Activity Feed</div>
            <button style={{ color:'var(--admin-gold)', fontSize:12, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14, overflowY:'auto', maxHeight:280 }}>
            {ACTIVITY.map(item => (
              <div key={item.id} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <ActivityIcon type={item.type} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:'var(--admin-text)', fontSize:13, lineHeight:1.4, marginBottom:2 }}>{item.text}</p>
                  <span style={{ color:'var(--admin-muted)', fontSize:11 }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 \u2014 Today's Schedule */}
      <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24, marginBottom:24 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <div style={{ color:'var(--admin-text)', fontSize:15, fontWeight:600 }}>Today&apos;s Schedule</div>
          <a href="/admin/appointments" style={{ color:'var(--admin-gold)', fontSize:12, display:'flex', alignItems:'center', gap:4, textDecoration:'none' }}>
            View all <ChevronRight size={12} />
          </a>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--admin-border)' }}>
                {['Time', 'Patient', 'Service', 'Doctor', 'Status'].map(col => (
                  <th key={col} style={{ padding:'8px 12px', color:'var(--admin-muted)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'left', whiteSpace:'nowrap' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row, i) => (
                <tr key={row.id} style={{ borderBottom: i < SCHEDULE.length - 1 ? '1px solid var(--admin-border)' : 'none', transition:'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--admin-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding:'11px 12px', color:'var(--admin-gold)', fontSize:13, fontFamily:'var(--font-mono)', whiteSpace:'nowrap' }}>
                    <Clock size={13} style={{ display:'inline', marginRight:6, verticalAlign:'middle', opacity:0.6 }} />{row.time}
                  </td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-text)', fontSize:13, fontWeight:500 }}>{row.patient}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:13 }}>{row.service}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:13 }}>{row.doctor}</td>
                  <td style={{ padding:'11px 12px' }}><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4 \u2014 Mini stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
        {MINI_STATS.map(s => (
          <div key={s.label} style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:'18px 20px', display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:40, height:40, borderRadius:10, backgroundColor:'var(--admin-elevated)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <s.icon size={20} color={s.color} />
            </div>
            <div>
              <div style={{ color:'var(--admin-text)', fontSize:22, fontWeight:700, fontFamily:'var(--font-mono)' }}>{s.value}</div>
              <div style={{ color:'var(--admin-muted)', fontSize:12 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
