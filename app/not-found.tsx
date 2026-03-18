import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'0 24px' }}>
      <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(80px,15vw,160px)', color:'var(--gold)', opacity:0.15, lineHeight:1, marginBottom:'-0.2em' }}>404</p>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem,4vw,3rem)', color:'var(--ink)', fontWeight:400, marginBottom:'1rem' }}>Page Not Found</h1>
      <p style={{ color:'var(--ash)', fontSize:'1rem', maxWidth:400, lineHeight:1.7, marginBottom:'2.5rem' }}>The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', backgroundColor:'var(--gold)', color:'var(--ivory)', borderRadius:6, fontWeight:500, fontSize:14, letterSpacing:'0.04em', textDecoration:'none' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
