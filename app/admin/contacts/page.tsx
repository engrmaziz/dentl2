'use client';
import React, { useState, useMemo } from 'react';
import {
  Search, Star, Trash2, Mail, MailOpen, Download, Filter,
  Phone, Calendar, MessageSquare, X, Send, ChevronDown,
} from 'lucide-react';

interface Reply {
  body: string;
  sentAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  starred: boolean;
  createdAt: string;
  replies: Reply[];
}

const MOCK_CONTACTS: Contact[] = [
  { id:'1',  name:'Emma Wilson',     email:'emma@example.com',     phone:'07700 900001', subject:'Enquiry about teeth whitening',    message:"Hello, I'm interested in your teeth whitening services. Could you please provide more information about the process, expected results, and pricing? I have a wedding coming up in 3 months and would like to achieve the best possible results.\n\nThank you in advance.", status:'unread',  starred:true,  createdAt:'2025-06-15T09:23:00Z', replies:[] },
  { id:'2',  name:'James Robertson', email:'james@example.com',    phone:'07700 900002', subject:'Dental implant consultation',       message:"I've been considering dental implants for some time. I lost a tooth last year and it's been affecting my confidence. I'd like to schedule a consultation to understand the procedure, timeline, and costs involved.", status:'unread',  starred:false, createdAt:'2025-06-15T08:45:00Z', replies:[] },
  { id:'3',  name:'Priya Sharma',    email:'priya@example.com',    phone:'07700 900003', subject:'Appointment request for check-up',  message:'I would like to book a general check-up and cleaning. I have not visited a dentist in about 18 months and would like to get back on track. Please let me know your available slots.', status:'read',    starred:false, createdAt:'2025-06-14T16:12:00Z', replies:[] },
  { id:'4',  name:'Oliver Chen',     email:'oliver@example.com',   phone:'07700 900004', subject:'Invisalign treatment options',      message:"I've heard a lot about Invisalign and am curious whether it would be suitable for my case. I have mild crowding in my lower teeth. Could a consultation be arranged to assess my suitability?", status:'replied', starred:true,  createdAt:'2025-06-14T11:30:00Z', replies:[{ body:"Dear Oliver, thank you for reaching out. We'd be happy to arrange a consultation. Please call us on 020 7946 0200 or use our online booking system.", sentAt:'2025-06-14T14:00:00Z' }] },
  { id:'5',  name:'Sophie Williams', email:'sophie@example.com',   phone:'07700 900005', subject:'Emergency dental pain',             message:'I am experiencing severe tooth pain in my upper right molar. The pain started yesterday and has been worsening. Could I be seen as soon as possible? I am a new patient.', status:'replied', starred:false, createdAt:'2025-06-13T19:55:00Z', replies:[{ body:"Dear Sophie, we're sorry to hear you're in pain. We have an emergency slot tomorrow at 8:30 AM. Please call 020 7946 0200 to confirm.", sentAt:'2025-06-13T20:30:00Z' }] },
  { id:'6',  name:'Liam Johnson',    email:'liam@example.com',     phone:'07700 900006', subject:'Porcelain veneers pricing',         message:"I've been looking at porcelain veneers to improve my smile. My teeth are healthy but I'd like a more uniform appearance. Can you provide an estimate for a full set of upper veneers?", status:'read',    starred:false, createdAt:'2025-06-13T14:22:00Z', replies:[] },
  { id:'7',  name:'Amelia Davis',    email:'amelia@example.com',   phone:'07700 900007', subject:"Child's first dental appointment",  message:"My daughter is 4 years old and we'd like to arrange her first dental visit. Could you recommend what to expect and how to best prepare her for the experience?", status:'unread',  starred:false, createdAt:'2025-06-12T10:05:00Z', replies:[] },
  { id:'8',  name:'Noah Brown',      email:'noah@example.com',     phone:'07700 900008', subject:'Gum disease treatment enquiry',    message:"My dentist elsewhere mentioned I may have early-stage gum disease. I'm seeking a second opinion and potentially switching to your practice. What does your periodontal assessment involve?", status:'read',    starred:true,  createdAt:'2025-06-11T13:48:00Z', replies:[] },
];

const STATUS_CFG = {
  unread:  { color:'var(--admin-warning)', label:'Unread'  },
  read:    { color:'var(--admin-muted)',   label:'Read'    },
  replied: { color:'var(--admin-success)', label:'Replied' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
}

export default function ContactsPage() {
  const [contacts,   setContacts]   = useState<Contact[]>(MOCK_CONTACTS);
  const [selected,   setSelected]   = useState<Contact | null>(contacts[0]);
  const [search,     setSearch]     = useState('');
  const [filter,     setFilter]     = useState<'all' | 'unread' | 'starred'>('all');
  const [replyText,  setReplyText]  = useState('');
  const [replySent,  setReplySent]  = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => contacts.filter(c => {
    if (filter === 'unread'  && c.status !== 'unread') return false;
    if (filter === 'starred' && !c.starred) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.subject.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [contacts, filter, search]);

  const updateContact = (id: string, patch: Partial<Contact>) =>
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));

  const handleSelect = (c: Contact) => {
    setSelected(c);
    setReplySent(false);
    setReplyText('');
    if (c.status === 'unread') updateContact(c.id, { status: 'read' });
  };

  const handleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const c = contacts.find(x => x.id === id);
    if (c) updateContact(id, { starred: !c.starred });
  };

  const handleDelete = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    if (selected?.id === id) setSelected(filtered.find(c => c.id !== id) ?? null);
  };

  const handleMarkAllRead = () => setContacts(prev => prev.map(c => ({ ...c, status: c.status === 'unread' ? 'read' : c.status })));

  const handleSendReply = () => {
    if (!replyText.trim() || !selected) return;
    const reply: Reply = { body: replyText.trim(), sentAt: new Date().toISOString() };
    updateContact(selected.id, { status: 'replied', replies: [...selected.replies, reply] });
    setSelected(prev => prev ? { ...prev, status:'replied', replies:[...prev.replies, reply] } : null);
    setReplyText('');
    setReplySent(true);
    setTimeout(() => setReplySent(false), 2000);
  };

  const exportCSV = () => {
    const rows = [['Name','Email','Phone','Subject','Status','Date'], ...contacts.map(c => [c.name, c.email, c.phone, c.subject, c.status, c.createdAt])];
    const csv = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'contacts.csv'; a.click();
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Contacts</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{unreadCount} unread · {contacts.length} total</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={handleMarkAllRead} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-muted)', fontSize:13, cursor:'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
          ><MailOpen size={15} /> Mark all read</button>
          <button onClick={exportCSV} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-muted)', fontSize:13, cursor:'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
          ><Download size={15} /> Export CSV</button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'340px 1fr', gap:16, height:'calc(100vh - 220px)', minHeight:500 }}>
        {/* Left panel */}
        <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {/* Toolbar */}
          <div style={{ padding:'12px 14px', borderBottom:'1px solid var(--admin-border)', display:'flex', gap:8 }}>
            <div style={{ position:'relative', flex:1 }}>
              <Search size={14} style={{ position:'absolute', left:8, top:'50%', transform:'translateY(-50%)', color:'var(--admin-muted)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                style={{ width:'100%', padding:'7px 10px 7px 28px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-text)', fontSize:12, outline:'none', boxSizing:'border-box' }}
              />
            </div>
            <div style={{ position:'relative' }}>
              <button onClick={() => setShowFilter(s => !s)}
                style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 10px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-muted)', fontSize:12, cursor:'pointer' }}>
                <Filter size={13} /><ChevronDown size={11} />
              </button>
              {showFilter && (
                <div style={{ position:'absolute', right:0, top:'100%', marginTop:4, backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, zIndex:20, overflow:'hidden', minWidth:120 }}>
                  {(['all','unread','starred'] as const).map(f => (
                    <button key={f} onClick={() => { setFilter(f); setShowFilter(false); }}
                      style={{ display:'block', width:'100%', padding:'8px 14px', backgroundColor: filter === f ? 'var(--admin-border)' : 'transparent', border:'none', color: filter === f ? 'var(--admin-text)' : 'var(--admin-muted)', fontSize:13, cursor:'pointer', textAlign:'left', textTransform:'capitalize' }}>
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div style={{ overflowY:'auto', flex:1 }}>
            {filtered.map(c => (
              <div key={c.id} onClick={() => handleSelect(c)}
                style={{ padding:'14px 16px', borderBottom:'1px solid var(--admin-border)', cursor:'pointer', backgroundColor: selected?.id === c.id ? 'var(--admin-elevated)' : 'transparent', transition:'background 0.15s', position:'relative', borderLeft: c.status === 'unread' ? '3px solid var(--admin-warning)' : '3px solid transparent' }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:4 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg, var(--admin-gold), #5A3E2B)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ color:'#fff', fontWeight:700, fontSize:12 }}>{c.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div style={{ color: c.status === 'unread' ? 'var(--admin-text)' : 'var(--admin-muted)', fontSize:13, fontWeight: c.status === 'unread' ? 600 : 400 }}>{c.name}</div>
                      <div style={{ color:'var(--admin-muted)', fontSize:11 }}>{formatDate(c.createdAt)}</div>
                    </div>
                  </div>
                  <button onClick={e => handleStar(c.id, e)} style={{ background:'none', border:'none', cursor:'pointer', color: c.starred ? 'var(--admin-warning)' : 'var(--admin-border)', display:'flex', alignItems:'center', padding:2 }}>
                    <Star size={14} fill={c.starred ? 'var(--admin-warning)' : 'none'} />
                  </button>
                </div>
                <div style={{ paddingLeft:40 }}>
                  <div style={{ color:'var(--admin-text)', fontSize:12, fontWeight:500, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.subject}</div>
                  <div style={{ color:'var(--admin-muted)', fontSize:11, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.message.slice(0, 70)}…</div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding:40, textAlign:'center', color:'var(--admin-muted)', fontSize:13 }}>No messages found.</div>
            )}
          </div>
        </div>

        {/* Right panel */}
        {selected ? (
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, display:'flex', flexDirection:'column', overflow:'hidden' }}>
            {/* Header */}
            <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--admin-border)', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg, var(--admin-gold), #5A3E2B)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{selected.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div style={{ color:'var(--admin-text)', fontSize:15, fontWeight:600 }}>{selected.name}</div>
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:12, backgroundColor: selected.status === 'unread' ? 'rgba(251,191,36,0.12)' : selected.status === 'replied' ? 'rgba(45,212,191,0.12)' : 'var(--admin-elevated)', color:STATUS_CFG[selected.status].color, fontSize:11, fontWeight:500 }}>
                      {STATUS_CFG[selected.status].label}
                    </span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:16, paddingLeft:48 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5, color:'var(--admin-muted)', fontSize:12 }}><Mail size={12} />{selected.email}</div>
                  {selected.phone && <div style={{ display:'flex', alignItems:'center', gap:5, color:'var(--admin-muted)', fontSize:12 }}><Phone size={12} />{selected.phone}</div>}
                  <div style={{ display:'flex', alignItems:'center', gap:5, color:'var(--admin-muted)', fontSize:12 }}><Calendar size={12} />{formatDate(selected.createdAt)}</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                <button onClick={() => { const c = contacts.find(x => x.id === selected.id); if (c) updateContact(c.id, { starred: !c.starred }); setSelected(prev => prev ? { ...prev, starred: !prev.starred } : null); }}
                  style={{ padding:'7px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', color: selected.starred ? 'var(--admin-warning)' : 'var(--admin-muted)' }}>
                  <Star size={15} fill={selected.starred ? 'var(--admin-warning)' : 'none'} />
                </button>
                <button onClick={() => handleDelete(selected.id)} style={{ padding:'7px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, cursor:'pointer', display:'flex', alignItems:'center', color:'var(--admin-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-danger)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                ><Trash2 size={15} /></button>
              </div>
            </div>

            {/* Message body */}
            <div style={{ flex:1, overflowY:'auto', padding:24 }}>
              <h2 style={{ color:'var(--admin-text)', fontSize:17, fontWeight:600, marginBottom:16 }}>{selected.subject}</h2>
              <div style={{ backgroundColor:'var(--admin-elevated)', borderRadius:10, padding:18, marginBottom:20 }}>
                <p style={{ color:'var(--admin-text)', fontSize:14, lineHeight:1.8, whiteSpace:'pre-wrap' }}>{selected.message}</p>
              </div>

              {/* Existing replies */}
              {selected.replies.map((reply, i) => (
                <div key={i} style={{ backgroundColor:'rgba(184,149,106,0.08)', border:'1px solid rgba(184,149,106,0.2)', borderRadius:10, padding:18, marginBottom:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                    <MessageSquare size={13} color="var(--admin-gold)" />
                    <span style={{ color:'var(--admin-gold)', fontSize:12, fontWeight:500 }}>Your reply</span>
                    <span style={{ color:'var(--admin-muted)', fontSize:11, marginLeft:'auto' }}>{formatDate(reply.sentAt)}</span>
                  </div>
                  <p style={{ color:'var(--admin-text)', fontSize:13, lineHeight:1.7, whiteSpace:'pre-wrap' }}>{reply.body}</p>
                </div>
              ))}
            </div>

            {/* Reply area */}
            <div style={{ padding:'16px 20px', borderTop:'1px solid var(--admin-border)', backgroundColor:'var(--admin-elevated)' }}>
              {replySent ? (
                <div style={{ textAlign:'center', color:'var(--admin-success)', fontSize:13, padding:'8px 0' }}>Reply sent successfully!</div>
              ) : (
                <div>
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                    placeholder="Type your reply…"
                    rows={3}
                    style={{ width:'100%', padding:'10px 12px', backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', resize:'vertical', boxSizing:'border-box', marginBottom:10 }}
                    onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
                  />
                  <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
                    <button onClick={() => setReplyText('')} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'transparent', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-muted)', fontSize:13, cursor:'pointer' }}><X size={14} /> Clear</button>
                    <button onClick={handleSendReply} disabled={!replyText.trim()} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 18px', background: replyText.trim() ? 'linear-gradient(135deg, var(--admin-gold), #8B6B3D)' : 'var(--admin-border)', border:'none', borderRadius:7, color:'#fff', fontSize:13, fontWeight:600, cursor: replyText.trim() ? 'pointer' : 'not-allowed' }}>
                      <Send size={14} /> Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ textAlign:'center', color:'var(--admin-muted)' }}>
              <Mail size={40} style={{ margin:'0 auto 12px', opacity:0.3 }} />
              <p>Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
