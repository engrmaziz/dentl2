'use client';
import React, { useState, useRef } from 'react';
import { Upload, X, Edit2, Check, Trash2, Image as ImageIcon, Plus } from 'lucide-react';

const CATEGORIES = ['All', 'Before & After', 'Clinic', 'Team', 'Results', 'Events'];

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  alt: string;
}

const MOCK_IMAGES: GalleryImage[] = [
  { id:'1',  url:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400', caption:'Modern treatment room', category:'Clinic',        alt:'Treatment room' },
  { id:'2',  url:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400', caption:'Teeth whitening result', category:'Results',       alt:'Whitening result' },
  { id:'3',  url:'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400', caption:'Dr. Harrington in consultation', category:'Team', alt:'Doctor consultation' },
  { id:'4',  url:'https://images.unsplash.com/photo-1570612861542-284f4c12e75f?w=400', caption:'Smile transformation', category:'Before & After',  alt:'Smile before and after' },
  { id:'5',  url:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400', caption:'Reception area',     category:'Clinic',             alt:'Reception' },
  { id:'6',  url:'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', caption:'Patient consultation', category:'Team',            alt:'Consultation' },
  { id:'7',  url:'https://images.unsplash.com/photo-1578774204375-826dc5d996ed?w=400', caption:'Implant procedure result', category:'Results',    alt:'Implant result' },
  { id:'8',  url:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', caption:'Annual clinic event', category:'Events',           alt:'Clinic event' },
  { id:'9',  url:'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', caption:'Dental equipment', category:'Clinic',              alt:'Equipment' },
  { id:'10', url:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400', caption:'Orthodontic treatment', category:'Results',        alt:'Ortho result' },
  { id:'11', url:'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400', caption:'Team photo 2025', category:'Team',                alt:'Team photo' },
  { id:'12', url:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', caption:'Before & After: veneers', category:'Before & After', alt:'Veneers result' },
];

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  'Before & After': { bg:'rgba(184,149,106,0.15)', color:'var(--admin-gold)'    },
  'Clinic':         { bg:'rgba(96,165,250,0.15)',  color:'var(--admin-info)'    },
  'Team':           { bg:'rgba(45,212,191,0.15)',  color:'var(--admin-success)' },
  'Results':        { bg:'rgba(251,191,36,0.15)',  color:'var(--admin-warning)' },
  'Events':         { bg:'rgba(167,139,250,0.15)', color:'#A78BFA'              },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? { bg:'rgba(136,146,164,0.15)', color:'var(--admin-muted)' };
}

function ImageCard({ img, onDelete, onCaptionSave }: { img: GalleryImage; onDelete: (id: string) => void; onCaptionSave: (id: string, caption: string) => void }) {
  const [editing,    setEditing]    = useState(false);
  const [caption,    setCaption]    = useState(img.caption);
  const [imgError,   setImgError]   = useState(false);
  const catStyle = getCategoryStyle(img.category);

  return (
    <div style={{ backgroundColor:'var(--admin-surface)', border:'1px solid var(--admin-border)', borderRadius:10, overflow:'hidden', breakInside:'avoid', marginBottom:16 }}>
      <div style={{ position:'relative' }}>
        {imgError ? (
          <div style={{ height:180, backgroundColor:'var(--admin-elevated)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ImageIcon size={32} color="var(--admin-border)" />
          </div>
        ) : (
          <img src={img.url} alt={img.alt} onError={() => setImgError(true)}
            style={{ width:'100%', display:'block', objectFit:'cover', maxHeight:240 }}
          />
        )}
        <button onClick={() => onDelete(img.id)}
          style={{ position:'absolute', top:6, right:6, width:26, height:26, borderRadius:'50%', backgroundColor:'rgba(15,17,23,0.75)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff', opacity:0, transition:'opacity 0.2s' }}
          className="delete-btn"
        ><Trash2 size={12} /></button>
        <span style={{ position:'absolute', top:6, left:6, padding:'2px 8px', borderRadius:12, backgroundColor:catStyle.bg, color:catStyle.color, fontSize:11, fontWeight:500, backdropFilter:'blur(4px)' }}>
          {img.category}
        </span>
      </div>
      <div style={{ padding:'10px 12px' }}>
        {editing ? (
          <div style={{ display:'flex', gap:6 }}>
            <input value={caption} onChange={e => setCaption(e.target.value)} autoFocus
              onKeyDown={e => { if (e.key === 'Enter') { onCaptionSave(img.id, caption); setEditing(false); } if (e.key === 'Escape') { setCaption(img.caption); setEditing(false); } }}
              style={{ flex:1, padding:'4px 8px', backgroundColor:'var(--admin-elevated)', border:'1px solid var(--admin-gold)', borderRadius:6, color:'var(--admin-text)', fontSize:12, outline:'none' }}
            />
            <button onClick={() => { onCaptionSave(img.id, caption); setEditing(false); }} style={{ color:'var(--admin-success)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}><Check size={14} /></button>
            <button onClick={() => { setCaption(img.caption); setEditing(false); }} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center' }}><X size={14} /></button>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <p style={{ flex:1, color:'var(--admin-muted)', fontSize:12, lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{img.caption}</p>
            <button onClick={() => setEditing(true)} style={{ color:'var(--admin-muted)', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', flexShrink:0 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--admin-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--admin-muted)')}
            ><Edit2 size={12} /></button>
          </div>
        )}
      </div>
      <style>{`.delete-btn:hover{opacity:1!important}`}</style>
    </div>
  );
}

export default function GalleryAdminPage() {
  const [images,      setImages]      = useState<GalleryImage[]>(MOCK_IMAGES);
  const [activeTab,   setActiveTab]   = useState('All');
  const [dragOver,    setDragOver]    = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayed = activeTab === 'All' ? images : images.filter(i => i.category === activeTab);

  const handleDelete = (id: string) => setImages(prev => {
    const img = prev.find(i => i.id === id);
    if (img?.url.startsWith('blob:')) URL.revokeObjectURL(img.url);
    return prev.filter(i => i.id !== id);
  });
  const handleCaptionSave = (id: string, caption: string) => setImages(prev => prev.map(i => i.id === id ? { ...i, caption } : i));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const url = URL.createObjectURL(file);
      const newImg: GalleryImage = {
        id: String(Date.now() + Math.random()),
        url,
        caption: file.name.replace(/\.[^.]+$/, ''),
        category: 'Clinic',
        alt: file.name,
      };
      setImages(prev => [newImg, ...prev]);
    });
  };

  const cats = CATEGORIES.slice(1);
  const counts: Record<string, number> = { All: images.length };
  cats.forEach(c => { counts[c] = images.filter(i => i.category === c).length; });

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ color:'var(--admin-text)', fontSize:24, fontWeight:600, fontFamily:'var(--font-display)' }}>Gallery</h1>
          <p style={{ color:'var(--admin-muted)', fontSize:13 }}>{images.length} images across {cats.length} categories</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', backgroundColor:'var(--admin-gold)', color:'#fff', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer' }}>
          <Plus size={16} /> Upload Images
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} style={{ display:'none' }} />
      </div>

      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--admin-gold)' : 'var(--admin-border)'}`,
          borderRadius: 12, padding: '28px 24px', textAlign: 'center',
          backgroundColor: dragOver ? 'rgba(184,149,106,0.06)' : 'transparent',
          cursor: 'pointer', marginBottom: 24, transition: 'all 0.2s',
        }}
      >
        <Upload size={28} color={dragOver ? 'var(--admin-gold)' : 'var(--admin-muted)'} style={{ margin:'0 auto 10px' }} />
        <p style={{ color: dragOver ? 'var(--admin-gold)' : 'var(--admin-muted)', fontSize:14, fontWeight:500 }}>
          {dragOver ? 'Drop images here!' : 'Drag & drop images here, or click to select'}
        </p>
        <p style={{ color:'var(--admin-muted)', fontSize:12, marginTop:4 }}>PNG, JPG, WebP · Max 10MB each</p>
      </div>

      {/* Category tabs */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            style={{
              padding:'6px 16px', borderRadius:20,
              backgroundColor: activeTab === cat ? 'var(--admin-gold)' : 'var(--admin-elevated)',
              border: `1px solid ${activeTab === cat ? 'var(--admin-gold)' : 'var(--admin-border)'}`,
              color: activeTab === cat ? '#fff' : 'var(--admin-muted)',
              fontSize:13, cursor:'pointer', fontWeight: activeTab === cat ? 600 : 400, display:'flex', alignItems:'center', gap:6,
            }}>
            {cat}
            <span style={{ backgroundColor: activeTab === cat ? 'rgba(255,255,255,0.25)' : 'var(--admin-border)', borderRadius:10, padding:'0 6px', fontSize:11 }}>
              {counts[cat] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {displayed.length === 0 ? (
        <div style={{ textAlign:'center', padding:60, color:'var(--admin-muted)' }}>
          <ImageIcon size={40} style={{ margin:'0 auto 12px', opacity:0.3 }} />
          <p>No images in this category yet.</p>
        </div>
      ) : (
        <div style={{ columns: 'auto 260px', columnGap:16 }}>
          {displayed.map(img => (
            <ImageCard key={img.id} img={img} onDelete={handleDelete} onCaptionSave={handleCaptionSave} />
          ))}
        </div>
      )}
    </div>
  );
}
