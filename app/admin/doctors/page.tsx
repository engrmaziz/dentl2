'use client';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Grid, List, Clock, Phone, Mail } from 'lucide-react';

interface Availability {
  available: boolean;
  from: string;
  to: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  bio: string;
  status: 'active' | 'inactive';
  initials: string;
  color: string;
  availability: Record<string, Availability>;
}

const DEFAULT_AVAIL: Record<string, Availability> = {
  Mon: { available: true,  from: '09:00', to: '17:00' },
  Tue: { available: true,  from: '09:00', to: '17:00' },
  Wed: { available: true,  from: '09:00', to: '13:00' },
  Thu: { available: true,  from: '09:00', to: '17:00' },
  Fri: { available: true,  from: '09:00', to: '17:00' },
  Sat: { available: false, from: '09:00', to: '13:00' },
  Sun: { available: false, from: '09:00', to: '13:00' },
};

const INITIAL_DOCTORS: Doctor[] = [
  { id:'1', name:'Dr. Sophia Harrington', specialization:'Cosmetic & Restorative', email:'sophia@dentl.co.uk', phone:'+44 20 7946 0201', bio:'Principal Dentist and Founder with 18 years of experience in cosmetic and restorative dentistry.', status:'active',   initials:'SH', color:'#B8956A', availability: { ...DEFAULT_AVAIL } },
  { id:'2', name:'Dr. James Whitfield',   specialization:'Oral Surgery & Implants', email:'james@dentl.co.uk',  phone:'+44 20 7946 0202', bio:'Specialist Oral Surgeon with 14 years performing complex extractions and implant placements.', status:'active',   initials:'JW', color:'#60A5FA', availability: { ...DEFAULT_AVAIL } },
  { id:'3', name:'Dr. Priya Nair',        specialization:'Periodontics & Gum Health',email:'priya@dentl.co.uk',  phone:'+44 20 7946 0203', bio:'Consultant Periodontist with 11 years of dedicated gum health and periodontal therapy expertise.', status:'active', initials:'PN', color:'#2DD4BF', availability: { ...DEFAULT_AVAIL } },
  { id:'4', name:'Dr. Oliver Crane',      specialization:'Orthodontics & Clear Aligners', email:'oliver@dentl.co.uk', phone:'+44 20 7946 0204', bio:'Specialist Orthodontist with 12 years transforming smiles with braces and Invisalign.', status:'active', initials:'OC', color:'#FBBF24', availability: { ...DEFAULT_AVAIL } },
  { id:'5', name:'Dr. Amelia Forsythe',   specialization:'Paediatric Dentistry',    email:'amelia@dentl.co.uk', phone:'+44 20 7946 0205', bio:'Dedicated Paediatric Dentist with 9 years creating positive dental experiences for children.', status:'active', initials:'AF', color:'#F87171', availability: { ...DEFAULT_AVAIL } },
  { id:'6', name:'Dr. Marcus Delacroix',  specialization:'Restorative & Endodontics',email:'marcus@dentl.co.uk',phone:'+44 20 7946 0206', bio:'Restorative Dentist with 16 years of expertise in endodontics and complex restorations.', status:'inactive', initials:'MD', color:'#A78BFA', availability: { ...DEFAULT_AVAIL } },
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function DoctorModal({ doctor, onSave, onClose }: { doctor: Doctor | null; onSave: (d: Doctor) => void; onClose: () => void }) {
  const isNew = !doctor;
  const [form, setForm] = useState<Doctor>(doctor ?? {
    id: String(Date.now()),
    name: '', specialization: '', email: '', phone: '', bio: '',
    status: 'active', initials: '', color: '#B8956A',
    availability: JSON.parse(JSON.stringify(DEFAULT_AVAIL)),
  });

  const update = (key: keyof Doctor, val: unknown) => setForm(f => ({ ...f, [key]: val }));
  const updateAvail = (day: string, field: keyof Availability, val: boolean | string) =>
    setForm(f => ({ ...f, availability: { ...f.availability, [day]: { ...f.availability[day], [field]: val } } }));

  const inputStyle: React.CSSProperties = { width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', boxSizing:'border-box' };

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.6)', zIndex:99 }} />
      <div style={{ position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:16, padding:32, zIndex:100, width:600, maxWidth:'95vw', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
          <h2 style={{ color:'var(--admin-text)', fontSize:18, fontWeight:600 }}>{isNew ? 'Add Doctor' : 'Edit Doctor'}</h2>
          <button onClick={onClose} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer' }}><X size={20} /></button>
        </div>

        {/* Basic Info */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
          {([['name','Name','Dr. Sophia Harrington'],['specialization','Specialization','Cosmetic & Restorative'],['email','Email','doctor@dentl.co.uk'],['phone','Phone','+44 20 7946 0200']] as [keyof Doctor, string, string][]).map(([key, label, ph]) => (
            <div key={key as string}>
              <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>{label}</label>
              <input value={String(form[key] ?? '')} onChange={e => update(key, e.target.value)} placeholder={ph}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
            </div>
          ))}
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Bio</label>
          <textarea rows={3} value={form.bio} onChange={e => update('bio', e.target.value)}
            style={{ ...inputStyle, resize:'vertical' }}
            onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
            onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
          />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
          <div>
            <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Status</label>
            <select value={form.status} onChange={e => update('status', e.target.value as 'active' | 'inactive')}
              style={{ ...inputStyle, cursor:'pointer' }}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:6 }}>Initials</label>
            <input value={form.initials} onChange={e => update('initials', e.target.value.slice(0, 2).toUpperCase())} maxLength={2}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
            />
          </div>
        </div>

        {/* Availability */}
        <div style={{ marginBottom:24 }}>
          <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:12 }}>Weekly Availability</div>
          {DAYS.map(day => (
            <div key={day} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8, minWidth:80 }}>
                <input type="checkbox" checked={form.availability[day]?.available ?? false}
                  onChange={e => updateAvail(day, 'available', e.target.checked)}
                  style={{ accentColor:'var(--admin-gold)', cursor:'pointer' }}
                />
                <span style={{ color: form.availability[day]?.available ? 'var(--admin-text)' : 'var(--admin-muted)', fontSize:13, fontWeight:500 }}>{day}</span>
              </label>
              {form.availability[day]?.available && (
                <>
                  <input type="time" value={form.availability[day].from} onChange={e => updateAvail(day, 'from', e.target.value)}
                    style={{ padding:'5px 8px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:6, color:'var(--admin-text)', fontSize:12, outline:'none' }}
                  />
                  <span style={{ color:'var(--admin-muted)', fontSize:12 }}>to</span>
                  <input type="time" value={form.availability[day].to} onChange={e => updateAvail(day, 'to', e.target.value)}
                    style={{ padding:'5px 8px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:6, color:'var(--admin-text)', fontSize:12, outline:'none' }}
                  />
                </>
              )}
              {!form.availability[day]?.available && (
                <span style={{ color:'var(--admin-muted)', fontSize:12, fontStyle:'italic' }}>Day off</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
          <button onClick={onClose} style={{ padding:'10px 20px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:14, cursor:'pointer' }}>Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ padding:'10px 20px', background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            {isNew ? 'Add Doctor' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}

export default function DoctorsPage() {
  const [doctors,    setDoctors]    = useState<Doctor[]>(INITIAL_DOCTORS);
  const [viewMode,   setViewMode]   = useState<'grid' | 'list'>('grid');
  const [editDoctor, setEditDoctor] = useState<Doctor | null | undefined>(undefined);
  const [showModal,  setShowModal]  = useState(false);

  const handleSave = (d: Doctor) => {
    setDoctors(prev => prev.some(x => x.id === d.id) ? prev.map(x => x.id === d.id ? d : x) : [...prev, d]);
  };

  const toggleStatus = (id: string) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d));
  };

  const deleteDoctor = (id: string) => setDoctors(prev => prev.filter(d => d.id !== id));

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Doctors</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{doctors.filter(d => d.status === 'active').length} active \u2022 {doctors.length} total</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => setViewMode('grid')} style={{ padding:'8px 12px', backgroundColor: viewMode === 'grid' ? 'var(--admin-elevated)' : 'transparent', border:'1px solid var(--admin-border)', borderRadius:8, color: viewMode === 'grid' ? 'var(--admin-text)' : 'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}><Grid size={16} /></button>
          <button onClick={() => setViewMode('list')} style={{ padding:'8px 12px', backgroundColor: viewMode === 'list' ? 'var(--admin-elevated)' : 'transparent', border:'1px solid var(--admin-border)', borderRadius:8, color: viewMode === 'list' ? 'var(--admin-text)' : 'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}><List size={16} /></button>
          <button onClick={() => { setEditDoctor(null); setShowModal(true); }} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', backgroundColor:'var(--admin-gold)', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>
            <Plus size={15} /> Add Doctor
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
          {doctors.map(doc => (
            <div key={doc.id} style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24, display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', background:`linear-gradient(135deg, ${doc.color}, ${doc.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'#fff', fontWeight:700, fontSize:16 }}>{doc.initials}</span>
                  </div>
                  <div>
                    <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:2 }}>{doc.name}</div>
                    <div style={{ color:'var(--admin-muted)', fontSize:12 }}>{doc.specialization}</div>
                  </div>
                </div>
                <label style={{ position:'relative', display:'inline-block', width:38, height:22, flexShrink:0, cursor:'pointer' }}>
                  <input type="checkbox" checked={doc.status === 'active'} onChange={() => toggleStatus(doc.id)} style={{ opacity:0, width:0, height:0 }} />
                  <span style={{ position:'absolute', inset:0, borderRadius:11, backgroundColor: doc.status === 'active' ? 'var(--admin-success)' : 'var(--admin-border)', transition:'background 0.2s' }}>
                    <span style={{ position:'absolute', top:3, left: doc.status === 'active' ? 19 : 3, width:16, height:16, borderRadius:'50%', backgroundColor:'#fff', transition:'left 0.2s', display:'block' }} />
                  </span>
                </label>
              </div>
              <p style={{ color:'var(--admin-muted)', fontSize:12, lineHeight:1.5, flex:1 }}>{doc.bio.slice(0, 100)}\u2026</p>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--admin-muted)', fontSize:12 }}>
                  <Mail size={13} color="var(--admin-gold)" />{doc.email}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--admin-muted)', fontSize:12 }}>
                  <Phone size={13} color="var(--admin-gold)" />{doc.phone}
                </div>
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {DAYS.filter(d => doc.availability[d]?.available).map(d => (
                  <span key={d} style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', backgroundColor:'var(--admin-elevated)', borderRadius:12, color:'var(--admin-muted)', fontSize:11 }}>
                    <Clock size={10} />{d}
                  </span>
                ))}
              </div>
              <div style={{ display:'flex', gap:8, paddingTop:8, borderTop:'1px solid var(--admin-border)' }}>
                <button onClick={() => { setEditDoctor(doc); setShowModal(true); }} style={{ flex:1, padding:'7px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-muted)', fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                ><Edit2 size={13} /> Edit</button>
                <button onClick={() => deleteDoctor(doc.id)} style={{ padding:'7px 12px', backgroundColor:'transparent', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-muted)', fontSize:13, cursor:'pointer', display:'flex', alignItems:'center' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-danger)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                ><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead style={{ backgroundColor:'var(--admin-elevated)' }}>
              <tr>
                {['Doctor','Specialization','Email','Phone','Days Available','Status','Actions'].map(col => (
                  <th key={col} style={{ padding:'10px 16px', color:'var(--admin-muted)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'left', whiteSpace:'nowrap' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, i) => (
                <tr key={doc.id} style={{ borderTop: i > 0 ? '1px solid var(--admin-border)' : 'none', transition:'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--admin-elevated)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg, ${doc.color}, ${doc.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ color:'#fff', fontWeight:700, fontSize:12 }}>{doc.initials}</span>
                      </div>
                      <span style={{ color:'var(--admin-text)', fontSize:13, fontWeight:500 }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13 }}>{doc.specialization}</td>
                  <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13 }}>{doc.email}</td>
                  <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13, whiteSpace:'nowrap' }}>{doc.phone}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                      {DAYS.filter(d => doc.availability[d]?.available).map(d => (
                        <span key={d} style={{ padding:'1px 6px', backgroundColor:'var(--admin-elevated)', borderRadius:10, color:'var(--admin-muted)', fontSize:11 }}>{d}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, backgroundColor: doc.status === 'active' ? 'rgba(45,212,191,0.12)' : 'rgba(248,113,113,0.12)', color: doc.status === 'active' ? 'var(--admin-success)' : 'var(--admin-danger)', fontSize:12, fontWeight:500 }}>
                      {doc.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => { setEditDoctor(doc); setShowModal(true); }} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', padding:5, borderRadius:5, display:'flex' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-info)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                      ><Edit2 size={14} /></button>
                      <button onClick={() => deleteDoctor(doc.id)} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', padding:5, borderRadius:5, display:'flex' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-danger)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                      ><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <DoctorModal
          doctor={editDoctor ?? null}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditDoctor(undefined); }}
        />
      )}
    </div>
  );
}
