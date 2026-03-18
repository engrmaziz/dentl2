'use client';
import React, { useState } from 'react';
import {
  Building2, Clock, Mail, Calendar, User, Save, Check, Eye, EyeOff,
} from 'lucide-react';

const TABS = [
  { id:'clinic',   label:'Clinic Info',     icon: Building2  },
  { id:'hours',    label:'Working Hours',   icon: Clock      },
  { id:'email',    label:'Email Settings',  icon: Mail       },
  { id:'calendar', label:'Google Calendar', icon: Calendar   },
  { id:'account',  label:'Admin Account',   icon: User       },
];

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

interface WorkingHour { open: string; close: string; closed: boolean; }
type WorkingHours = Record<string, WorkingHour>;

const DEFAULT_HOURS: WorkingHours = {
  Monday:    { open:'08:30', close:'18:00', closed:false },
  Tuesday:   { open:'08:30', close:'18:00', closed:false },
  Wednesday: { open:'08:30', close:'18:00', closed:false },
  Thursday:  { open:'08:30', close:'18:00', closed:false },
  Friday:    { open:'08:30', close:'17:00', closed:false },
  Saturday:  { open:'09:00', close:'14:00', closed:false },
  Sunday:    { open:'09:00', close:'13:00', closed:true  },
};

function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', marginTop:8 }}>
      {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState('clinic');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  // Clinic info state
  const [clinic, setClinic] = useState({
    name: 'Dentl Clinic', tagline: 'Precision Meets Warmth',
    address: '12 Harley Street, London, W1G 9PQ',
    phone: '+44 20 7946 0200', email: 'hello@dentl.co.uk',
    website: 'https://dentl.co.uk',
    description: 'A luxury dental clinic where precision meets warmth. Expert cosmetic, restorative, and general dentistry in London.',
    vat: 'GB 123 4567 89', regNumber: '12345678',
  });

  // Working hours
  const [hours, setHours] = useState<WorkingHours>(DEFAULT_HOURS);
  const updateHour = (day: string, field: keyof WorkingHour, val: string | boolean) =>
    setHours(h => ({ ...h, [day]: { ...h[day], [field]: val } }));

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.mailgun.org', smtpPort: '587',
    smtpUser: 'postmaster@dentl.co.uk', smtpPass: '',
    fromName: 'Dentl Clinic', fromEmail: 'hello@dentl.co.uk',
    notifyOnAppointment: true, notifyOnContact: true, notifyOnCancellation: true,
  });
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Google Calendar
  const [calSettings, setCalSettings] = useState({
    enabled: false, calendarId: '',
    clientId: '', clientSecret: '',
    syncAppointments: true, syncCancellations: true,
  });

  // Admin account
  const [account, setAccount] = useState({
    name: 'Dr. Admin', email: 'admin@dentl.co.uk',
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [showPasses, setShowPasses] = useState<Record<string, boolean>>({});
  const passwordMismatch: string | false = (account.newPassword && account.confirmPassword && account.newPassword !== account.confirmPassword) ? 'Passwords do not match' : false;

  const inputStyle: React.CSSProperties = { width:'100%', padding:'9px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', boxSizing:'border-box' };
  const labelStyle: React.CSSProperties = { display:'block', color:'var(--admin-muted)', fontSize:11, fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:7 };

  const Field = ({ label, value, onChange, type = 'text', span = false }: { label:string; value:string; onChange:(v:string)=>void; type?:string; span?:boolean }) => (
    <div style={{ gridColumn: span ? '1 / -1' : undefined }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
        onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
      />
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Settings</h1>
        <p style={{ color:'var(--admin-muted)', fontSize:13 }}>Manage clinic configuration and preferences</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:20 }}>
        {/* Tab nav */}
        <nav style={{ display:'flex', flexDirection:'column', gap:4 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:8, border:'none', cursor:'pointer', textAlign:'left',
                backgroundColor: tab === t.id ? 'var(--admin-elevated)' : 'transparent',
                color: tab === t.id ? 'var(--admin-gold)' : 'var(--admin-muted)',
                fontWeight: tab === t.id ? 600 : 400,
                fontSize: 13,
                borderLeft: tab === t.id ? '3px solid var(--admin-gold)' : '3px solid transparent',
              }}>
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:28 }}>

          {/* Clinic Info */}
          {tab === 'clinic' && (
            <div>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:20 }}>Clinic Information</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <Field label="Clinic Name"   value={clinic.name}      onChange={v => setClinic(c => ({ ...c, name:v }))} />
                <Field label="Tagline"       value={clinic.tagline}   onChange={v => setClinic(c => ({ ...c, tagline:v }))} />
                <Field label="Phone"         value={clinic.phone}     onChange={v => setClinic(c => ({ ...c, phone:v }))} />
                <Field label="Email"         value={clinic.email}     onChange={v => setClinic(c => ({ ...c, email:v }))} type="email" />
                <Field label="Website"       value={clinic.website}   onChange={v => setClinic(c => ({ ...c, website:v }))} span />
                <Field label="Address"       value={clinic.address}   onChange={v => setClinic(c => ({ ...c, address:v }))} span />
                <Field label="VAT Number"    value={clinic.vat}       onChange={v => setClinic(c => ({ ...c, vat:v }))} />
                <Field label="Company Reg"   value={clinic.regNumber} onChange={v => setClinic(c => ({ ...c, regNumber:v }))} />
                <div style={{ gridColumn:'1 / -1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={clinic.description} onChange={e => setClinic(c => ({ ...c, description:e.target.value }))} rows={3}
                    style={{ ...inputStyle, resize:'vertical' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
              </div>
              <SaveButton onClick={handleSave} saved={saved} />
            </div>
          )}

          {/* Working Hours */}
          {tab === 'hours' && (
            <div>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:20 }}>Working Hours</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {DAYS.map(day => (
                  <div key={day} style={{ display:'flex', alignItems:'center', gap:16, padding:'12px 16px', backgroundColor:'var(--admin-elevated)', borderRadius:8 }}>
                    <div style={{ width:100, color: hours[day].closed ? 'var(--admin-muted)' : 'var(--admin-text)', fontSize:13, fontWeight:500 }}>{day}</div>
                    <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                      <input type="checkbox" checked={!hours[day].closed} onChange={e => updateHour(day, 'closed', !e.target.checked)}
                        style={{ accentColor:'var(--admin-gold)', cursor:'pointer' }} />
                      <span style={{ color:'var(--admin-muted)', fontSize:12 }}>Open</span>
                    </label>
                    {!hours[day].closed ? (
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <input type="time" value={hours[day].open} onChange={e => updateHour(day, 'open', e.target.value)}
                          style={{ padding:'5px 10px', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:6, color:'var(--admin-text)', fontSize:13, outline:'none' }}
                          onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                          onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                        />
                        <span style={{ color:'var(--admin-muted)', fontSize:12 }}>to</span>
                        <input type="time" value={hours[day].close} onChange={e => updateHour(day, 'close', e.target.value)}
                          style={{ padding:'5px 10px', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:6, color:'var(--admin-text)', fontSize:13, outline:'none' }}
                          onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                          onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                        />
                      </div>
                    ) : (
                      <span style={{ color:'var(--admin-muted)', fontSize:12, fontStyle:'italic' }}>Closed</span>
                    )}
                  </div>
                ))}
              </div>
              <SaveButton onClick={handleSave} saved={saved} />
            </div>
          )}

          {/* Email Settings */}
          {tab === 'email' && (
            <div>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:20 }}>Email Settings</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                <div style={{ gridColumn:'1 / -1' }}>
                  <p style={{ color:'var(--admin-muted)', fontSize:13, marginBottom:16 }}>Configure SMTP settings to enable the clinic to send emails for appointment confirmations and notifications.</p>
                </div>
                <div>
                  <label style={labelStyle}>SMTP Host</label>
                  <input value={emailSettings.smtpHost} onChange={e => setEmailSettings(s => ({ ...s, smtpHost:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SMTP Port</label>
                  <input value={emailSettings.smtpPort} onChange={e => setEmailSettings(s => ({ ...s, smtpPort:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SMTP Username</label>
                  <input value={emailSettings.smtpUser} onChange={e => setEmailSettings(s => ({ ...s, smtpUser:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>SMTP Password</label>
                  <div style={{ position:'relative' }}>
                    <input type={showSmtpPass ? 'text' : 'password'} value={emailSettings.smtpPass} onChange={e => setEmailSettings(s => ({ ...s, smtpPass:e.target.value }))} placeholder="••••••••"
                      style={{ ...inputStyle, paddingRight:40 }}
                      onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                      onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                    />
                    <button onClick={() => setShowSmtpPass(s => !s)} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}>
                      {showSmtpPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>From Name</label>
                  <input value={emailSettings.fromName} onChange={e => setEmailSettings(s => ({ ...s, fromName:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>From Email</label>
                  <input type="email" value={emailSettings.fromEmail} onChange={e => setEmailSettings(s => ({ ...s, fromEmail:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
              </div>
              <div style={{ borderTop:'1px solid var(--admin-border)', paddingTop:20 }}>
                <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:12 }}>Notification Triggers</div>
                {([
                  { label:'New appointment booked',       key:'notifyOnAppointment'  as const },
                  { label:'New contact form submission',  key:'notifyOnContact'      as const },
                  { label:'Appointment cancelled',        key:'notifyOnCancellation' as const },
                ] as { label: string; key: 'notifyOnAppointment' | 'notifyOnContact' | 'notifyOnCancellation' }[]).map(({ label, key }) => (
                  <label key={key} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:10 }}>
                    <input type="checkbox" checked={emailSettings[key]} onChange={e => setEmailSettings(s => ({ ...s, [key]:e.target.checked }))}
                      style={{ accentColor:'var(--admin-gold)', cursor:'pointer', width:15, height:15 }} />
                    <span style={{ color:'var(--admin-text)', fontSize:13 }}>{label}</span>
                  </label>
                ))}
              </div>
              <SaveButton onClick={handleSave} saved={saved} />
            </div>
          )}

          {/* Google Calendar */}
          {tab === 'calendar' && (
            <div>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:20 }}>Google Calendar Integration</h2>
              <div style={{ backgroundColor:'var(--admin-elevated)', borderRadius:10, padding:16, marginBottom:20, display:'flex', alignItems:'flex-start', gap:12 }}>
                <Calendar size={18} color="var(--admin-info)" style={{ flexShrink:0, marginTop:1 }} />
                <p style={{ color:'var(--admin-muted)', fontSize:13, lineHeight:1.6 }}>
                  Connect your Google Calendar to automatically sync appointments. Create a service account in Google Cloud Console and provide the credentials below.
                </p>
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:20 }}>
                <div style={{ position:'relative', display:'inline-block', width:44, height:24 }}>
                  <input type="checkbox" checked={calSettings.enabled} onChange={e => setCalSettings(s => ({ ...s, enabled:e.target.checked }))} style={{ opacity:0, width:0, height:0 }} />
                  <span style={{ position:'absolute', inset:0, borderRadius:12, backgroundColor: calSettings.enabled ? 'var(--admin-success)' : 'var(--admin-border)', transition:'background 0.2s', cursor:'pointer' }}>
                    <span style={{ position:'absolute', top:3, left: calSettings.enabled ? 23 : 3, width:18, height:18, borderRadius:'50%', backgroundColor:'#fff', transition:'left 0.2s', display:'block' }} />
                  </span>
                </div>
                <span style={{ color:'var(--admin-text)', fontSize:13, fontWeight:500 }}>Enable Google Calendar sync</span>
              </label>
              {calSettings.enabled && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {([
                    { label:'Calendar ID',   key:'calendarId'   as const, ph:'clinic@group.calendar.google.com' },
                    { label:'Client ID',     key:'clientId'     as const, ph:'123456789.apps.googleusercontent.com' },
                    { label:'Client Secret', key:'clientSecret' as const, ph:'GOCSPX-…' },
                  ] as { label: string; key: 'calendarId' | 'clientId' | 'clientSecret'; ph: string }[]).map(({ label, key, ph }) => (
                    <div key={key} style={{ gridColumn: key === 'calendarId' ? '1 / -1' : undefined }}>
                      <label style={labelStyle}>{label}</label>
                      <input value={calSettings[key]} onChange={e => setCalSettings(s => ({ ...s, [key]:e.target.value }))} placeholder={ph}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                        onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                      />
                    </div>
                  ))}
                  <div style={{ gridColumn:'1 / -1' }}>
                    {([
                      { label:'Sync new appointments to calendar', key:'syncAppointments'  as const },
                      { label:'Remove cancelled appointments',     key:'syncCancellations' as const },
                    ] as { label: string; key: 'syncAppointments' | 'syncCancellations' }[]).map(({ label, key }) => (
                      <label key={key} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:10 }}>
                        <input type="checkbox" checked={calSettings[key]} onChange={e => setCalSettings(s => ({ ...s, [key]:e.target.checked }))}
                          style={{ accentColor:'var(--admin-gold)', cursor:'pointer', width:15, height:15 }} />
                        <span style={{ color:'var(--admin-text)', fontSize:13 }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <SaveButton onClick={handleSave} saved={saved} />
            </div>
          )}

          {/* Admin Account */}
          {tab === 'account' && (
            <div>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:20 }}>Admin Account</h2>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, padding:20, backgroundColor:'var(--admin-elevated)', borderRadius:10 }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg, var(--admin-gold), #5A3E2B)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ color:'#fff', fontWeight:700, fontSize:22 }}>{account.name.charAt(0)}</span>
                </div>
                <div>
                  <div style={{ color:'var(--admin-text)', fontSize:16, fontWeight:600 }}>{account.name}</div>
                  <div style={{ color:'var(--admin-muted)', fontSize:13 }}>{account.email}</div>
                  <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 10px', borderRadius:12, backgroundColor:'rgba(184,149,106,0.12)', color:'var(--admin-gold)', fontSize:12, fontWeight:500, marginTop:4 }}>Administrator</span>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
                <div>
                  <label style={labelStyle}>Display Name</label>
                  <input value={account.name} onChange={e => setAccount(a => ({ ...a, name:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={account.email} onChange={e => setAccount(a => ({ ...a, email:e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                </div>
              </div>

              <div style={{ borderTop:'1px solid var(--admin-border)', paddingTop:20, marginBottom:4 }}>
                <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:14 }}>Change Password</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {([
                    { label:'Current Password', key:'currentPassword' },
                    { label:'New Password',      key:'newPassword'     },
                    { label:'Confirm Password',  key:'confirmPassword' },
                  ] as { label: string; key: 'currentPassword' | 'newPassword' | 'confirmPassword' }[]).map(({ label, key }) => (
                    <div key={key} style={{ gridColumn: key === 'currentPassword' ? '1 / -1' : undefined }}>
                      <label style={labelStyle}>{label}</label>
                      <div style={{ position:'relative' }}>
                        <input type={showPasses[key] ? 'text' : 'password'} value={account[key]} onChange={e => setAccount(a => ({ ...a, [key]:e.target.value }))} placeholder="••••••••"
                          style={{ ...inputStyle, paddingRight:40, borderColor: key === 'confirmPassword' && passwordMismatch ? 'var(--admin-danger)' : undefined }}
                          onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                          onBlur={e  => (e.target.style.borderColor = key === 'confirmPassword' && passwordMismatch ? 'var(--admin-danger)' : 'var(--admin-border)')}
                        />
                        <button onClick={() => setShowPasses(s => ({ ...s, [key]: !s[key] }))} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}>
                          {showPasses[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      {key === 'confirmPassword' && passwordMismatch && (
                        <p style={{ color:'var(--admin-danger)', fontSize:11, marginTop:4 }}>{passwordMismatch}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <SaveButton onClick={handleSave} saved={saved} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
