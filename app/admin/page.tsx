'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('admin@dentl.co.uk');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid credentials'); return; }
      localStorage.setItem('admin_token', data.token);
      router.push('/admin/dashboard');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--admin-bg)', fontFamily: 'var(--font-body)', cursor: 'default',
      backgroundImage: 'radial-gradient(ellipse at 60% 30%, rgba(184,149,106,0.08) 0%, transparent 60%)',
    }}>
      <div style={{ width: 400, maxWidth: '90vw' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width:60, height:60, borderRadius:16, background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <span style={{ color:'#fff', fontWeight:700, fontSize:28, fontFamily:'var(--font-display)' }}>D</span>
          </div>
          <h1 style={{ color:'var(--admin-text)', fontFamily:'var(--font-display)', fontSize:28, fontWeight:400, marginBottom:6 }}>Admin Portal</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:14 }}>Dentl Clinic Management</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:16, padding:36 }}>
          {error && (
            <div style={{ backgroundColor:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:8, padding:'10px 14px', marginBottom:20, color:'var(--admin-danger)', fontSize:13 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ width:'100%', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, padding:'11px 14px', color:'var(--admin-text)', fontSize:14, outline:'none', transition:'border-color 0.2s', boxSizing:'border-box' }}
              onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
            />
          </div>

          <div style={{ marginBottom:28 }}>
            <label style={{ display:'block', color:'var(--admin-muted)', fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Password</label>
            <div style={{ position:'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width:'100%', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, padding:'11px 40px 11px 14px', color:'var(--admin-text)', fontSize:14, outline:'none', transition:'border-color 0.2s', boxSizing:'border-box' }}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} aria-busy={loading} style={{
            width:'100%', padding:'13px', borderRadius:10, border:'none', cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'var(--admin-border)' : 'linear-gradient(135deg, var(--admin-gold), #8B6B3D)',
            color:'#fff', fontSize:15, fontWeight:600, letterSpacing:'0.02em',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'opacity 0.2s',
          }}>
            {loading ? <><Loader2 size={18} style={{ animation:'spin 0.8s linear infinite' }} /> Signing in…</> : 'Sign In'}
          </button>

          {process.env.NODE_ENV === 'development' && (
            <p style={{ color:'var(--admin-muted)', fontSize:12, textAlign:'center', marginTop:20 }}>
              Demo: admin@dentl.co.uk / admin123
            </p>
          )}
        </form>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
