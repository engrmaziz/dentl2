'use client';
import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Download, Plus, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, X, Check, Edit2, Trash2,
  Phone, Mail, User, Calendar, Clock, Stethoscope,
} from 'lucide-react';

type AppStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
type SortDir = 'asc' | 'desc';

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: AppStatus;
  notes: string;
}

const DOCTORS = ['All Doctors', 'Dr. Harrington', 'Dr. Whitfield', 'Dr. Nair', 'Dr. Crane', 'Dr. Forsythe', 'Dr. Delacroix'];
const SERVICES = ['General Check-up', 'Teeth Whitening', 'Dental Implant', 'Invisalign', 'Root Canal', 'Porcelain Veneers', 'Paediatric Check', 'Gum Treatment', 'Crown Fitting', 'Emergency'];
const STATUSES: AppStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

function generateMockAppointments(): Appointment[] {
  const patients = [
    ['Emma Wilson', 'emma@example.com', '07700 900001'],
    ['James Robertson', 'james@example.com', '07700 900002'],
    ['Priya Sharma', 'priya@example.com', '07700 900003'],
    ['Oliver Chen', 'oliver@example.com', '07700 900004'],
    ['Sophie Williams', 'sophie@example.com', '07700 900005'],
    ['Liam Johnson', 'liam@example.com', '07700 900006'],
    ['Amelia Davis', 'amelia@example.com', '07700 900007'],
    ['Noah Brown', 'noah@example.com', '07700 900008'],
    ['Isabella Taylor', 'isabella@example.com', '07700 900009'],
    ['Mason Anderson', 'mason@example.com', '07700 900010'],
    ['Charlotte Thomas', 'charlotte@example.com', '07700 900011'],
    ['Ethan Martin', 'ethan@example.com', '07700 900012'],
    ['Ava Jackson', 'ava@example.com', '07700 900013'],
    ['Lucas Lee', 'lucas@example.com', '07700 900014'],
    ['Mia Harris', 'mia@example.com', '07700 900015'],
    ['Aiden Thompson', 'aiden@example.com', '07700 900016'],
    ['Harper Garcia', 'harper@example.com', '07700 900017'],
    ['Jackson Martinez', 'jackson@example.com', '07700 900018'],
    ['Layla Robinson', 'layla@example.com', '07700 900019'],
    ['Logan Clark', 'logan@example.com', '07700 900020'],
    ['Zoey Rodriguez', 'zoey@example.com', '07700 900021'],
    ['Lucas Lewis', 'lucas2@example.com', '07700 900022'],
    ['Lily Walker', 'lily@example.com', '07700 900023'],
    ['Benjamin Hall', 'benjamin@example.com', '07700 900024'],
    ['Aria Allen', 'aria@example.com', '07700 900025'],
  ];
  const doctors = DOCTORS.slice(1);
  const statuses: AppStatus[] = ['confirmed', 'pending', 'completed', 'cancelled'];
  const times = ['08:30', '09:00', '09:45', '10:30', '11:15', '12:00', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45'];

  return patients.map(([name, email, phone], i) => {
    const d = new Date(2025, 5, 15 + (i % 14));
    return {
      id: String(i + 1).padStart(3, '0'),
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      service: SERVICES[i % SERVICES.length],
      doctor: doctors[i % doctors.length],
      date: d.toISOString().split('T')[0],
      time: times[i % times.length],
      status: statuses[i % statuses.length],
      notes: i % 3 === 0 ? 'Patient requested morning slot. Sensitive teeth noted.' : '',
    };
  });
}

const ALL_APPOINTMENTS = generateMockAppointments();

const STATUS_CFG: Record<AppStatus, { color: string; bg: string; label: string }> = {
  confirmed:  { color:'var(--admin-info)',    bg:'rgba(96,165,250,0.12)',   label:'Confirmed'  },
  pending:    { color:'var(--admin-warning)', bg:'rgba(251,191,36,0.12)',   label:'Pending'    },
  completed:  { color:'var(--admin-success)', bg:'rgba(45,212,191,0.12)',   label:'Completed'  },
  cancelled:  { color:'var(--admin-danger)',  bg:'rgba(248,113,113,0.12)',  label:'Cancelled'  },
};

function StatusBadge({ status, onClick }: { status: AppStatus; onClick?: () => void }) {
  const { color, bg, label } = STATUS_CFG[status];
  return (
    <span
      onClick={onClick}
      style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, backgroundColor:bg, color, fontSize:12, fontWeight:500, cursor: onClick ? 'pointer' : 'default', userSelect:'none' }}
      title={onClick ? 'Click to change status' : undefined}
    >
      {label}
    </span>
  );
}

interface DrawerProps {
  appt: Appointment | null;
  onClose: () => void;
  onStatusChange: (id: string, status: AppStatus) => void;
}
function AppointmentDrawer({ appt, onClose, onStatusChange }: DrawerProps) {
  if (!appt) return null;
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.5)', zIndex:99 }} />
      <div style={{ position:'fixed', right:0, top:0, bottom:0, width:420, backgroundColor:'var(--admin-surface)', borderLeft:'1px solid var(--admin-border)', zIndex:100, overflowY:'auto', padding:28 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <h2 style={{ color:'var(--admin-text)', fontSize:18, fontWeight:600 }}>Appointment #{appt.id}</h2>
          <button onClick={onClose} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:4, borderRadius:6 }}><X size={20} /></button>
        </div>
        <div style={{ marginBottom:20 }}>
          <StatusBadge status={appt.status} />
        </div>
        {[
          { icon: User,        label:'Patient',  value:appt.patientName       },
          { icon: Mail,        label:'Email',    value:appt.patientEmail      },
          { icon: Phone,       label:'Phone',    value:appt.patientPhone      },
          { icon: Stethoscope, label:'Service',  value:appt.service           },
          { icon: User,        label:'Doctor',   value:appt.doctor            },
          { icon: Calendar,    label:'Date',     value:appt.date              },
          { icon: Clock,       label:'Time',     value:appt.time              },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ display:'flex', gap:12, padding:'12px 0', borderBottom:'1px solid var(--admin-border)' }}>
            <Icon size={16} color="var(--admin-gold)" style={{ flexShrink:0, marginTop:1 }} />
            <div>
              <div style={{ color:'var(--admin-muted)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{label}</div>
              <div style={{ color:'var(--admin-text)', fontSize:14 }}>{value}</div>
            </div>
          </div>
        ))}
        {appt.notes && (
          <div style={{ marginTop:16, padding:14, backgroundColor:'var(--admin-elevated)', borderRadius:8 }}>
            <div style={{ color:'var(--admin-muted)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Notes</div>
            <p style={{ color:'var(--admin-text)', fontSize:13, lineHeight:1.6 }}>{appt.notes}</p>
          </div>
        )}
        <div style={{ marginTop:24 }}>
          <div style={{ color:'var(--admin-muted)', fontSize:12, marginBottom:10 }}>Change Status:</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => { onStatusChange(appt.id, s); onClose(); }}
                style={{ padding:'5px 12px', borderRadius:16, border:'1px solid', borderColor: appt.status === s ? STATUS_CFG[s].color : 'var(--admin-border)', backgroundColor: appt.status === s ? STATUS_CFG[s].bg : 'transparent', color: appt.status === s ? STATUS_CFG[s].color : 'var(--admin-muted)', fontSize:12, cursor:'pointer', fontWeight: appt.status === s ? 600 : 400 }}>
                {STATUS_CFG[s].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

type SortKey = keyof Appointment;

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(ALL_APPOINTMENTS);
  const [search,      setSearch]      = useState('');
  const [statusFilter,setStatusFilter]= useState<AppStatus | 'all'>('all');
  const [doctorFilter,setDoctorFilter]= useState('All Doctors');
  const [dateFilter,  setDateFilter]  = useState('');
  const [sortKey,     setSortKey]     = useState<SortKey>('date');
  const [sortDir,     setSortDir]     = useState<SortDir>('asc');
  const [page,        setPage]        = useState(1);
  const [selected,    setSelected]    = useState<Set<string>>(new Set());
  const [drawer,      setDrawer]      = useState<Appointment | null>(null);
  const [showModal,   setShowModal]   = useState(false);
  const PER_PAGE = 20;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    return appointments.filter(a => {
      const q = search.toLowerCase();
      if (q && !a.patientName.toLowerCase().includes(q) && !a.patientEmail.toLowerCase().includes(q) && !a.service.toLowerCase().includes(q)) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (doctorFilter !== 'All Doctors' && a.doctor !== doctorFilter) return false;
      if (dateFilter && a.date !== dateFilter) return false;
      return true;
    }).sort((a, b) => {
      const av = a[sortKey] as string;
      const bv = b[sortKey] as string;
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [appointments, search, statusFilter, doctorFilter, dateFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const allChecked = pageData.length > 0 && pageData.every(a => selected.has(a.id));

  const toggleAll = () => {
    if (allChecked) setSelected(s => { const n = new Set(s); pageData.forEach(a => n.delete(a.id)); return n; });
    else setSelected(s => { const n = new Set(s); pageData.forEach(a => n.add(a.id)); return n; });
  };

  const toggleOne = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleStatusChange = (id: string, status: AppStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleBulkDelete = () => {
    setAppointments(prev => prev.filter(a => !selected.has(a.id)));
    setSelected(new Set());
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span style={{ display:'inline-flex', flexDirection:'column', marginLeft:4, verticalAlign:'middle', opacity: sortKey === col ? 1 : 0.3 }}>
      <ChevronUp size={10} style={{ marginBottom:-2, color: sortKey === col && sortDir === 'asc' ? 'var(--admin-gold)' : 'inherit' }} />
      <ChevronDown size={10} style={{ color: sortKey === col && sortDir === 'desc' ? 'var(--admin-gold)' : 'inherit' }} />
    </span>
  );

  const thStyle: React.CSSProperties = { padding:'10px 12px', color:'var(--admin-muted)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'left', whiteSpace:'nowrap', cursor:'pointer', userSelect:'none' };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Appointments</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{filtered.length} total records</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', backgroundColor:'var(--admin-gold)', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>
          <Plus size={16} /> New Appointment
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:'16px 20px', marginBottom:16, display:'flex', flexWrap:'wrap', gap:12, alignItems:'center' }}>
        <div style={{ position:'relative', flex:'1 1 200px' }}>
          <Search size={15} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--admin-muted)' }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search patients, services\u2026"
            style={{ width:'100%', padding:'8px 12px 8px 32px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', boxSizing:'border-box' }}
          />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value as AppStatus | 'all'); setPage(1); }}
          style={{ padding:'8px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', cursor:'pointer' }}>
          <option value="all">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_CFG[s].label}</option>)}
        </select>
        <select value={doctorFilter} onChange={e => { setDoctorFilter(e.target.value); setPage(1); }}
          style={{ padding:'8px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', cursor:'pointer' }}>
          {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <input type="date" value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(1); }}
          style={{ padding:'8px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color: dateFilter ? 'var(--admin-text)' : 'var(--admin-muted)', fontSize:13, outline:'none', cursor:'pointer' }}
        />
        {(search || statusFilter !== 'all' || doctorFilter !== 'All Doctors' || dateFilter) && (
          <button onClick={() => { setSearch(''); setStatusFilter('all'); setDoctorFilter('All Doctors'); setDateFilter(''); setPage(1); }}
            style={{ display:'flex', alignItems:'center', gap:4, padding:'8px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-muted)', fontSize:13, cursor:'pointer' }}>
            <X size={13} /> Clear
          </button>
        )}
        <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-muted)', fontSize:13, cursor:'pointer', marginLeft:'auto' }}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div style={{ backgroundColor:'rgba(184,149,106,0.1)', border:'1px solid rgba(184,149,106,0.3)', borderRadius:8, padding:'10px 16px', marginBottom:12, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ color:'var(--admin-gold)', fontSize:13, fontWeight:500 }}>{selected.size} selected</span>
          <button onClick={() => { handleBulkDelete(); }} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', backgroundColor:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:6, color:'var(--admin-danger)', fontSize:12, cursor:'pointer' }}>
            <Trash2 size={13} /> Delete
          </button>
          {STATUSES.map(s => (
            <button key={s} onClick={() => { selected.forEach(id => handleStatusChange(id, s)); setSelected(new Set()); }}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px', backgroundColor:STATUS_CFG[s].bg, border:`1px solid ${STATUS_CFG[s].color}33`, borderRadius:6, color:STATUS_CFG[s].color, fontSize:12, cursor:'pointer' }}>
              <Check size={13} /> Mark {STATUS_CFG[s].label}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead style={{ backgroundColor:'var(--admin-elevated)' }}>
              <tr>
                <th style={{ ...thStyle, width:40 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ cursor:'pointer', accentColor:'var(--admin-gold)' }} />
                </th>
                {(['id','patientName','patientEmail','patientPhone','service','doctor','date','time','status'] as SortKey[]).map(col => (
                  <th key={col} style={thStyle} onClick={() => handleSort(col)}>
                    {col === 'id' ? '#' : col === 'patientName' ? 'Patient' : col === 'patientEmail' ? 'Email' : col === 'patientPhone' ? 'Phone' : col.charAt(0).toUpperCase() + col.slice(1)}
                    <SortIcon col={col} />
                  </th>
                ))}
                <th style={{ ...thStyle, cursor:'default' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((appt, i) => (
                <tr key={appt.id}
                  style={{ borderBottom: i < pageData.length - 1 ? '1px solid var(--admin-border)' : 'none', transition:'background 0.15s', cursor:'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--admin-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  onClick={() => setDrawer(appt)}
                >
                  <td style={{ padding:'11px 12px' }} onClick={e => { e.stopPropagation(); toggleOne(appt.id); }}>
                    <input type="checkbox" checked={selected.has(appt.id)} onChange={() => toggleOne(appt.id)} style={{ cursor:'pointer', accentColor:'var(--admin-gold)' }} />
                  </td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:12, fontFamily:'var(--font-mono)' }}>#{appt.id}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-text)', fontSize:13, fontWeight:500, whiteSpace:'nowrap' }}>{appt.patientName}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:13 }}>{appt.patientEmail}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:13, whiteSpace:'nowrap' }}>{appt.patientPhone}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-text)', fontSize:13 }}>{appt.service}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-muted)', fontSize:13, whiteSpace:'nowrap' }}>{appt.doctor}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-text)', fontSize:13, fontFamily:'var(--font-mono)', whiteSpace:'nowrap' }}>{appt.date}</td>
                  <td style={{ padding:'11px 12px', color:'var(--admin-gold)', fontSize:13, fontFamily:'var(--font-mono)' }}>{appt.time}</td>
                  <td style={{ padding:'11px 12px' }} onClick={e => e.stopPropagation()}>
                    <StatusBadge status={appt.status} onClick={() => {
                      const idx = STATUSES.indexOf(appt.status);
                      handleStatusChange(appt.id, STATUSES[(idx + 1) % STATUSES.length]);
                    }} />
                  </td>
                  <td style={{ padding:'11px 12px' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => setDrawer(appt)} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:5, borderRadius:5 }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-info)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                      ><Edit2 size={14} /></button>
                      <button onClick={() => { setAppointments(prev => prev.filter(a => a.id !== appt.id)); }} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:5, borderRadius:5 }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-danger)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                      ><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr><td colSpan={11} style={{ padding:40, textAlign:'center', color:'var(--admin-muted)', fontSize:14 }}>No appointments match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding:'14px 20px', borderTop:'1px solid var(--admin-border)', display:'flex', alignItems:'center', justifyContent:'space-between', backgroundColor:'var(--admin-elevated)' }}>
            <span style={{ color:'var(--admin-muted)', fontSize:13 }}>
              Showing {(page - 1) * PER_PAGE + 1}&ndash;{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding:'6px 12px', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:6, color: page === 1 ? 'var(--admin-border)' : 'var(--admin-text)', cursor: page === 1 ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', gap:4, fontSize:13 }}>
                <ChevronLeft size={14} /> Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ padding:'6px 11px', backgroundColor: p === page ? 'var(--admin-gold)' : 'var(--admin-surface)', border:'1px solid', borderColor: p === page ? 'var(--admin-gold)' : 'var(--admin-border)', borderRadius:6, color: p === page ? '#fff' : 'var(--admin-text)', cursor:'pointer', fontSize:13, fontWeight: p === page ? 600 : 400 }}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ padding:'6px 12px', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:6, color: page === totalPages ? 'var(--admin-border)' : 'var(--admin-text)', cursor: page === totalPages ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', gap:4, fontSize:13 }}>
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer */}
      <AppointmentDrawer appt={drawer} onClose={() => setDrawer(null)} onStatusChange={handleStatusChange} />

      {/* New Appointment Modal */}
      {showModal && (
        <>
          <div onClick={() => setShowModal(false)} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.6)', zIndex:99 }} />
          <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:16, padding:32, zIndex:100, width:480, maxWidth:'90vw' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
              <h2 style={{ color:'var(--admin-text)', fontSize:18, fontWeight:600 }}>New Appointment</h2>
              <button onClick={() => setShowModal(false)} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                { label:'Patient Name', type:'text',   ph:'Emma Wilson'           },
                { label:'Email',        type:'email',  ph:'patient@example.com'   },
                { label:'Phone',        type:'tel',    ph:'07700 900000'           },
                { label:'Date',         type:'date',   ph:''                      },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    style={{ width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', boxSizing:'border-box' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Service</label>
                <select style={{ width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', cursor:'pointer', boxSizing:'border-box' }}>
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Doctor</label>
                <select style={{ width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', cursor:'pointer', boxSizing:'border-box' }}>
                  {DOCTORS.slice(1).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop:16 }}>
              <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Notes</label>
              <textarea rows={3} style={{ width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', resize:'vertical', boxSizing:'border-box' }}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
            </div>
            <div style={{ display:'flex', gap:12, marginTop:24, justifyContent:'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding:'10px 20px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:14, cursor:'pointer' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} style={{ padding:'10px 20px', background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>Create</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
