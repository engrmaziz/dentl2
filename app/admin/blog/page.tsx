'use client';
import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical, X } from 'lucide-react';
import Link from 'next/link';

type PostStatus = 'draft' | 'published';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  status: PostStatus;
  date: string;
  views: number;
  author: string;
  excerpt: string;
}

const CATEGORIES = ['All', 'Cosmetic', 'Preventive', 'Implants', 'Orthodontics', 'General', 'Wellness'];

const MOCK_POSTS: BlogPost[] = [
  { id:'1', title:'The Science Behind a Perfect Smile', category:'Cosmetic',      status:'published', date:'2025-05-15', views:1240, author:'Dr. Harrington', excerpt:'Exploring the principles of cosmetic dentistry and what makes a smile truly beautiful.' },
  { id:'2', title:'Why Preventive Care Saves You Money',category:'Preventive',    status:'published', date:'2025-05-08', views:892,  author:'Dr. Nair',       excerpt:'An economic argument for regular dental check-ups and preventive treatments.' },
  { id:'3', title:'Understanding Dental Implants: A Complete Guide', category:'Implants', status:'published', date:'2025-04-28', views:2105, author:'Dr. Whitfield', excerpt:'Everything you need to know about dental implants, from candidacy to recovery.' },
  { id:'4', title:'Invisalign vs Traditional Braces',   category:'Orthodontics',  status:'published', date:'2025-04-15', views:1567, author:'Dr. Crane',      excerpt:'A comprehensive comparison to help you choose the right orthodontic treatment.' },
  { id:'5', title:'The Link Between Oral and Overall Health', category:'Wellness',status:'draft',     date:'2025-06-01', views:0,    author:'Dr. Forsythe',   excerpt:'How your mouth is a window into your overall health and wellbeing.' },
  { id:'6', title:'Choosing the Right Toothbrush',      category:'General',       status:'published', date:'2025-03-22', views:643,  author:'Dr. Delacroix',  excerpt:'A guide to selecting toothbrush and toothpaste for optimal oral hygiene.' },
  { id:'7', title:'Porcelain Veneers: Are They Right for You?', category:'Cosmetic', status:'draft', date:'2025-06-10', views:0,  author:'Dr. Harrington',  excerpt:'A detailed look at porcelain veneers and who makes an ideal candidate.' },
  { id:'8', title:'Managing Dental Anxiety',            category:'General',       status:'published', date:'2025-03-10', views:987,  author:'Dr. Forsythe',   excerpt:'Practical strategies for patients who experience fear or anxiety at the dentist.' },
];

const STATUS_CFG: Record<PostStatus, { color: string; bg: string }> = {
  published: { color:'var(--admin-success)', bg:'rgba(45,212,191,0.12)' },
  draft:     { color:'var(--admin-warning)', bg:'rgba(251,191,36,0.12)' },
};

export default function BlogAdminPage() {
  const [posts,        setPosts]       = useState<BlogPost[]>(MOCK_POSTS);
  const [statusFilter, setStatusFilter]= useState<PostStatus | 'all'>('all');
  const [catFilter,    setCatFilter]   = useState('All');
  const [search,       setSearch]      = useState('');
  const [menuOpen,     setMenuOpen]    = useState<string | null>(null);

  const filtered = useMemo(() => posts.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (catFilter !== 'All' && p.category !== catFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [posts, statusFilter, catFilter, search]);

  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  const toggleStatus = (id: string) => setPosts(prev => prev.map(p =>
    p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published', views: p.status === 'draft' ? p.views : 0 } : p
  ));

  return (
    <div onClick={() => setMenuOpen(null)}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Blog</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{posts.filter(p => p.status === 'published').length} published · {posts.filter(p => p.status === 'draft').length} drafts</p>
        </div>
        <Link href="/admin/blog/new" style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', backgroundColor:'var(--admin-gold)', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, textDecoration:'none' }}>
          <Plus size={16} /> New Post
        </Link>
      </div>

      {/* Filters */}
      <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:'14px 20px', marginBottom:16, display:'flex', flexWrap:'wrap', gap:12, alignItems:'center' }}>
        {/* Status tabs */}
        <div style={{ display:'flex', gap:4, backgroundColor:'var(--admin-elevated)', borderRadius:8, padding:4 }}>
          {(['all', 'published', 'draft'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ padding:'5px 14px', borderRadius:6, border:'none', fontSize:13, cursor:'pointer', fontWeight: statusFilter === s ? 600 : 400,
                backgroundColor: statusFilter === s ? 'var(--admin-surface)' : 'transparent',
                color: statusFilter === s ? 'var(--admin-text)' : 'var(--admin-muted)',
              }}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ padding:'7px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', cursor:'pointer' }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Search */}
        <div style={{ position:'relative', flex:'1 1 200px' }}>
          <Search size={15} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--admin-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts\u2026"
            style={{ width:'100%', padding:'7px 12px 7px 32px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, outline:'none', boxSizing:'border-box' }}
          />
        </div>

        {(search || statusFilter !== 'all' || catFilter !== 'All') && (
          <button onClick={() => { setSearch(''); setStatusFilter('all'); setCatFilter('All'); }}
            style={{ display:'flex', alignItems:'center', gap:4, padding:'7px 12px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-muted)', fontSize:13, cursor:'pointer' }}>
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ backgroundColor:'var(--admin-elevated)' }}>
            <tr>
              {['Title', 'Category', 'Status', 'Date', 'Views', 'Author', ''].map(col => (
                <th key={col} style={{ padding:'10px 16px', color:'var(--admin-muted)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', textAlign:'left', whiteSpace:'nowrap' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((post, i) => (
              <tr key={post.id} style={{ borderTop: i > 0 ? '1px solid var(--admin-border)' : 'none', transition:'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--admin-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding:'14px 16px', maxWidth:320 }}>
                  <div style={{ color:'var(--admin-text)', fontSize:13, fontWeight:500, marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{post.title}</div>
                  <div style={{ color:'var(--admin-muted)', fontSize:12, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{post.excerpt}</div>
                </td>
                <td style={{ padding:'14px 16px' }}>
                  <span style={{ padding:'3px 10px', borderRadius:20, backgroundColor:'var(--admin-elevated)', color:'var(--admin-muted)', fontSize:12 }}>{post.category}</span>
                </td>
                <td style={{ padding:'14px 16px' }}>
                  <span onClick={() => toggleStatus(post.id)} style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:20, backgroundColor:STATUS_CFG[post.status].bg, color:STATUS_CFG[post.status].color, fontSize:12, fontWeight:500, cursor:'pointer', userSelect:'none' }}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13, whiteSpace:'nowrap' }}>{post.date}</td>
                <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <Eye size={13} />{post.views.toLocaleString()}
                  </div>
                </td>
                <td style={{ padding:'14px 16px', color:'var(--admin-muted)', fontSize:13, whiteSpace:'nowrap' }}>{post.author}</td>
                <td style={{ padding:'14px 16px' }}>
                  <div style={{ position:'relative' }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => setMenuOpen(menuOpen === post.id ? null : post.id)}
                      style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:5, borderRadius:5 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
                    ><MoreVertical size={16} /></button>
                    {menuOpen === post.id && (
                      <div style={{ position:'absolute', right:0, top:'100%', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, boxShadow:'0 8px 24px rgba(0,0,0,0.3)', zIndex:20, minWidth:140, overflow:'hidden' }}>
                        {[
                          { label:'Edit',            icon: Edit2,  action:() => {}, color:'var(--admin-text)'   },
                          { label:'Preview',         icon: Eye,    action:() => {}, color:'var(--admin-text)'   },
                          { label: post.status === 'published' ? 'Unpublish' : 'Publish', icon: MoreVertical, action:() => toggleStatus(post.id), color:'var(--admin-warning)' },
                          { label:'Delete',          icon: Trash2, action:() => deletePost(post.id), color:'var(--admin-danger)'  },
                        ].map(({ label, icon: Icon, action, color }) => (
                          <button key={label} onClick={() => { action(); setMenuOpen(null); }}
                            style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 14px', width:'100%', backgroundColor:'transparent', border:'none', color, fontSize:13, cursor:'pointer', textAlign:'left' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--admin-border)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          ><Icon size={14} />{label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding:40, textAlign:'center', color:'var(--admin-muted)', fontSize:14 }}>No posts match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
