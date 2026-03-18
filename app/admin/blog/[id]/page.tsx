'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Save, Upload, Eye, Check, Loader2, X, Plus } from 'lucide-react';
import Link from 'next/link';

type PostStatus = 'draft' | 'published';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: PostStatus;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
}

const CATEGORIES = ['Cosmetic', 'Preventive', 'Implants', 'Orthodontics', 'General', 'Wellness', 'Paediatric'];

const EMPTY_POST: BlogPost = {
  id: 'new',
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category: 'General',
  tags: [],
  status: 'draft',
  featuredImage: '',
  seoTitle: '',
  seoDescription: '',
  publishedAt: '',
};

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function BlogEditorPage() {
  const [post,        setPost]        = useState<BlogPost>(EMPTY_POST);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [lastSaved,   setLastSaved]   = useState<Date | null>(null);
  const [tagInput,    setTagInput]    = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const update = (key: keyof BlogPost, val: unknown) => {
    setPost(p => ({ ...p, [key]: val }));
    setSaved(false);
  };

  // Auto-slug from title
  useEffect(() => {
    if (post.title && !post.slug) {
      update('slug', slugify(post.title));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.title]);

  // Auto-save every 30 seconds
  const autoSave = useCallback(() => {
    if (post.title) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        setLastSaved(new Date());
      }, 800);
    }
  }, [post.title]);

  useEffect(() => {
    const t = setInterval(autoSave, 30000);
    return () => clearInterval(t);
  }, [autoSave]);

  const handleSave = (status: PostStatus) => {
    setSaving(true);
    update('status', status);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setLastSaved(new Date());
    }, 600);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !post.tags.includes(t)) {
      update('tags', [...post.tags, t]);
      setTagInput('');
    }
  };
  const removeTag = (tag: string) => update('tags', post.tags.filter(t => t !== tag));

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px', backgroundColor: 'var(--admin-elevated)',
    border: '1px solid var(--admin-border)', borderRadius: 8, color: 'var(--admin-text)',
    fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--admin-muted)', fontSize: 11, fontWeight: 600,
    letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 7,
  };

  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = post.content.length;

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <Link href="/admin/blog" style={{ display:'flex', alignItems:'center', gap:6, color:'var(--admin-muted)', fontSize:13, textDecoration:'none' }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--admin-text)')}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--admin-muted)')}
          ><ArrowLeft size={16} /> Back to Blog</Link>
          <span style={{ color:'var(--admin-border)' }}>|</span>
          <h1 style={{ color:'var(--admin-text)', fontSize:18, fontWeight:600 }}>{post.id === 'new' ? 'New Post' : 'Edit Post'}</h1>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {/* Auto-save indicator */}
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--admin-muted)' }}>
            {saving ? (
              <><Loader2 size={13} style={{ animation:'spin 0.8s linear infinite' }} /> Saving\u2026</>
            ) : saved && lastSaved ? (
              <><Check size={13} color="var(--admin-success)" /> Saved {lastSaved.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })}</>
            ) : null}
          </div>
          <button onClick={() => setShowPreview(s => !s)} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, cursor:'pointer' }}>
            <Eye size={15} /> Preview
          </button>
          <button onClick={() => handleSave('draft')} disabled={saving} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:8, color:'var(--admin-text)', fontSize:13, cursor:'pointer' }}>
            <Save size={15} /> Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 18px', background:'linear-gradient(135deg, var(--admin-gold), #8B6B3D)', border:'none', borderRadius:8, color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
            Publish
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20, alignItems:'start' }}>
        {/* Left column \u2014 editor */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Title */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
            <input
              value={post.title} onChange={e => { update('title', e.target.value); if (!post.slug || post.slug === slugify(post.title)) update('slug', slugify(e.target.value)); }}
              placeholder="Post Title\u2026"
              style={{ width:'100%', backgroundColor:'transparent', border:'none', borderBottom:'1px solid var(--admin-border)', borderRadius:0, padding:'4px 0 12px', color:'var(--admin-text)', fontSize:24, fontFamily:'var(--font-display)', outline:'none', boxSizing:'border-box' }}
            />
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:12 }}>
              <span style={{ color:'var(--admin-muted)', fontSize:12 }}>Slug:</span>
              <input value={post.slug} onChange={e => update('slug', e.target.value)} placeholder="post-url-slug"
                style={{ flex:1, padding:'5px 8px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:6, color:'var(--admin-muted)', fontSize:12, outline:'none' }}
              />
            </div>
          </div>

          {/* Content */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <label style={labelStyle}>Content</label>
              <span style={{ color:'var(--admin-muted)', fontSize:11 }}>{wordCount} words \u00b7 {charCount} chars</span>
            </div>
            <textarea
              value={post.content} onChange={e => update('content', e.target.value)}
              placeholder={"Write your post content here\u2026\n\nUse markdown-style formatting:\n# Heading 1\n## Heading 2\n**Bold text**\n*Italic text*"}
              rows={20}
              style={{ ...inputStyle, resize:'vertical', fontFamily:'var(--font-mono)', fontSize:13, lineHeight:1.7 }}
              onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
            />
          </div>

          {/* Excerpt */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea value={post.excerpt} onChange={e => update('excerpt', e.target.value)} rows={3} placeholder="Brief summary shown in blog listing\u2026"
              style={{ ...inputStyle, resize:'vertical' }}
              onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
            />
          </div>

          {/* SEO */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:24 }}>
            <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:16 }}>SEO</div>
            <div style={{ marginBottom:14 }}>
              <label style={labelStyle}>SEO Title <span style={{ color:'var(--admin-muted)', textTransform:'none', fontSize:11 }}>({(post.seoTitle || post.title).length}/60)</span></label>
              <input value={post.seoTitle} onChange={e => update('seoTitle', e.target.value)} placeholder={post.title || 'SEO Title\u2026'}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Meta Description <span style={{ color:'var(--admin-muted)', textTransform:'none', fontSize:11 }}>({(post.seoDescription || post.excerpt).length}/160)</span></label>
              <textarea value={post.seoDescription} onChange={e => update('seoDescription', e.target.value)} rows={3} placeholder={post.excerpt || 'Meta description\u2026'}
                style={{ ...inputStyle, resize:'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
            </div>
            {/* Google preview */}
            <div style={{ backgroundColor:'var(--admin-elevated)', borderRadius:8, padding:14 }}>
              <div style={{ fontSize:11, color:'var(--admin-muted)', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Google Preview</div>
              <div style={{ color:'var(--admin-info)', fontSize:17, marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{post.seoTitle || post.title || 'Post Title'}</div>
              <div style={{ color:'var(--admin-success)', fontSize:13, marginBottom:4 }}>dentl.co.uk \u203a blog \u203a {post.slug || 'post-slug'}</div>
              <div style={{ color:'var(--admin-muted)', fontSize:13, lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{post.seoDescription || post.excerpt || 'Post description will appear here\u2026'}</div>
            </div>
          </div>
        </div>

        {/* Right column \u2014 metadata */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Featured image */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:20 }}>
            <label style={labelStyle}>Featured Image</label>
            {post.featuredImage ? (
              <div style={{ position:'relative' }}>
                <img src={post.featuredImage} alt="Featured" style={{ width:'100%', height:160, objectFit:'cover', borderRadius:8, display:'block' }} />
                <button onClick={() => update('featuredImage', '')} style={{ position:'absolute', top:6, right:6, backgroundColor:'rgba(0,0,0,0.6)', border:'none', borderRadius:'50%', width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div style={{ border:'2px dashed var(--admin-border)', borderRadius:8, padding:24, textAlign:'center', cursor:'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--admin-gold)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--admin-border)')}
              >
                <Upload size={24} color="var(--admin-muted)" style={{ margin:'0 auto 8px' }} />
                <p style={{ color:'var(--admin-muted)', fontSize:13 }}>Click to upload</p>
                <p style={{ color:'var(--admin-muted)', fontSize:11, marginTop:4 }}>PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>

          {/* Publish settings */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:20 }}>
            <div style={{ color:'var(--admin-text)', fontSize:14, fontWeight:600, marginBottom:14 }}>Publish Settings</div>
            <div style={{ marginBottom:12 }}>
              <label style={labelStyle}>Status</label>
              <select value={post.status} onChange={e => update('status', e.target.value as PostStatus)}
                style={{ ...inputStyle, cursor:'pointer' }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={labelStyle}>Publish Date</label>
              <input type="datetime-local" value={post.publishedAt} onChange={e => update('publishedAt', e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={post.category} onChange={e => update('category', e.target.value)}
                style={{ ...inputStyle, cursor:'pointer' }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:12, padding:20 }}>
            <label style={labelStyle}>Tags</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', backgroundColor:'rgba(184,149,106,0.12)', border:'1px solid rgba(184,149,106,0.3)', borderRadius:20, color:'var(--admin-gold)', fontSize:12 }}>
                  {tag}
                  <button onClick={() => removeTag(tag)} style={{ color:'var(--admin-gold)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:0, lineHeight:1 }}><X size={11} /></button>
                </span>
              ))}
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Add tag\u2026"
                style={{ flex:1, padding:'7px 10px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-text)', fontSize:12, outline:'none' }}
                onFocus={e => (e.target.style.borderColor = 'var(--admin-gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--admin-border)')}
              />
              <button onClick={addTag} style={{ padding:'7px 10px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-border)', borderRadius:7, color:'var(--admin-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <>
          <div onClick={() => setShowPreview(false)} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.7)', zIndex:99 }} />
          <div style={{ position:'fixed', top:'5%', left:'50%', transform:'translateX(-50%)', width:'min(800px, 92vw)', maxHeight:'90vh', backgroundColor:'#fff', borderRadius:16, zIndex:100, overflowY:'auto', padding:48 }}>
            <button onClick={() => setShowPreview(false)} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:'#555', display:'flex', alignItems:'center' }}><X size={20} /></button>
            {post.featuredImage && <img src={post.featuredImage} alt="" style={{ width:'100%', height:240, objectFit:'cover', borderRadius:12, marginBottom:24, display:'block' }} />}
            <div style={{ color:'#888', fontSize:13, marginBottom:8 }}>{post.category} \u00b7 {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</div>
            <h1 style={{ fontSize:32, fontFamily:'Georgia, serif', color:'#0A1628', marginBottom:16, lineHeight:1.2 }}>{post.title || 'Untitled Post'}</h1>
            <p style={{ fontSize:16, color:'#555', lineHeight:1.7, marginBottom:24, fontStyle:'italic' }}>{post.excerpt}</p>
            <div style={{ borderTop:'1px solid #eee', paddingTop:24 }}>
              <pre style={{ fontFamily:'inherit', whiteSpace:'pre-wrap', fontSize:15, color:'#333', lineHeight:1.8 }}>{post.content || 'No content yet.'}</pre>
            </div>
          </div>
        </>
      )}

      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  );
}
