'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Calendar, Users, FileText, Image,
  Mail, Settings, LogOut, Menu, X, ChevronRight, Bell, Search
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const NAV_ITEMS = [
  { href: '/admin/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/admin/appointments',  label: 'Appointments',  icon: Calendar        },
  { href: '/admin/doctors',       label: 'Doctors',       icon: Users           },
  { href: '/admin/blog',          label: 'Blog',          icon: FileText        },
  { href: '/admin/gallery',       label: 'Gallery',       icon: Image           },
  { href: '/admin/contacts',      label: 'Contacts',      icon: Mail            },
  { href: '/admin/settings',      label: 'Settings',      icon: Settings        },
];

function getBreadcrumb(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean);
  if (seg.length <= 1) return 'Admin';
  return seg.slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' › ');
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const [user,      setUser]      = useState<AdminUser | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [search,    setSearch]    = useState('');

  const checkAuth = useCallback(async () => {
    if (pathname === '/admin') { setLoading(false); return; }
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      if (!token) { router.push('/admin'); return; }
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { router.push('/admin'); return; }
      const data = await res.json();
      setUser(data.user);
    } catch {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  if (pathname === '/admin') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'var(--admin-bg)', cursor:'default' }}>
        <div style={{ width:40, height:40, border:'3px solid var(--admin-border)', borderTopColor:'var(--admin-gold)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const SIDEBAR_W = collapsed ? 60 : 260;

  return (
    <div style={{ display:'flex', minHeight:'100vh', backgroundColor:'var(--admin-bg)', color:'var(--admin-text)', fontFamily:'var(--font-body)', cursor:'default' }}>
      {/* Sidebar */}
      <aside style={{
        width: SIDEBAR_W,
        flexShrink: 0,
        backgroundColor: 'var(--admin-surface)',
        borderRight: '1px solid var(--admin-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 0' : '24px 20px', borderBottom: '1px solid var(--admin-border)', display:'flex', alignItems:'center', gap:12, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ color:'#fff', fontWeight:700, fontSize:16, fontFamily:'var(--font-display)' }}>D</span>
          </div>
          {!collapsed && (
            <div>
              <div style={{ color:'var(--admin-gold)', fontFamily:'var(--font-display)', fontSize:17, fontWeight:600, lineHeight:1.2 }}>Dentl</div>
              <div style={{ color:'var(--admin-muted)', fontSize:11 }}>Admin Portal</div>
            </div>
          )}
        </div>

        {/* User info */}
        {!collapsed && user && (
          <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--admin-border)', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg, var(--admin-gold), #5A3E2B)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ color:'#fff', fontWeight:600, fontSize:14 }}>{user.name.charAt(0)}</span>
            </div>
            <div style={{ overflow:'hidden' }}>
              <div style={{ color:'var(--admin-text)', fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
              <div style={{ color:'var(--admin-muted)', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.role}</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex:1, overflowY:'auto', padding:'12px 8px' }}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                display:'flex', alignItems:'center', gap:12,
                padding: collapsed ? '12px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius:8, marginBottom:2,
                backgroundColor: active ? 'var(--admin-elevated)' : 'transparent',
                color: active ? 'var(--admin-gold)' : 'var(--admin-muted)',
                borderLeft: active ? '3px solid var(--admin-gold)' : '3px solid transparent',
                transition:'all 0.18s ease',
                textDecoration:'none',
                fontSize:13,
                fontWeight: active ? 600 : 400,
              }}>
                <Icon size={18} strokeWidth={active ? 2 : 1.5} style={{ flexShrink:0 }} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && active && <ChevronRight size={14} style={{ marginLeft:'auto', opacity:0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding:'12px 8px', borderTop:'1px solid var(--admin-border)' }}>
          <button onClick={handleLogout} style={{
            display:'flex', alignItems:'center', gap:12,
            padding: collapsed ? '12px 0' : '10px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            width:'100%', borderRadius:8,
            color:'var(--admin-danger)', cursor:'pointer',
            backgroundColor:'transparent', border:'none',
            fontSize:13, transition:'background 0.18s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <LogOut size={18} style={{ flexShrink:0 }} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', marginLeft:SIDEBAR_W, transition:'margin-left 0.25s ease', minWidth:0 }}>
        {/* Topbar */}
        <header style={{
          height: 64, backgroundColor:'var(--admin-surface)', borderBottom:'1px solid var(--admin-border)',
          display:'flex', alignItems:'center', padding:'0 24px', gap:16,
          position:'sticky', top:0, zIndex:40,
        }}>
          <button onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ color:'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center', background:'none', border:'none', padding:4, borderRadius:6 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          <span style={{ color:'var(--admin-muted)', fontSize:13 }}>{getBreadcrumb(pathname)}</span>
          <div style={{ flex:1 }} />
          <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
            <Search size={15} style={{ position:'absolute', left:10, color:'var(--admin-muted)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Quick search…"
              aria-label="Quick search"
              style={{ backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, padding:'7px 12px 7px 32px', color:'var(--admin-text)', fontSize:13, width:200, outline:'none' }}
            />
          </div>
          <button
            aria-label="Notifications"
            style={{ position:'relative', color:'var(--admin-muted)', cursor:'pointer', background:'none', border:'none', display:'flex', alignItems:'center', padding:6, borderRadius:8 }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
          >
            <Bell size={18} />
            <span style={{ position:'absolute', top:4, right:4, width:8, height:8, borderRadius:'50%', backgroundColor:'var(--admin-danger)', border:'2px solid var(--admin-surface)' }} />
          </button>
          {user && (
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg, var(--admin-gold), #5A3E2B)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
              <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{user.name.charAt(0)}</span>
            </div>
          )}
        </header>

        {/* Page content */}
        <main style={{ flex:1, overflowY:'auto', padding:'28px 28px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
