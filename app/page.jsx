'use client'
import { useState } from 'react'

export default function Home(){
  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const fazerLogin = () => {
    const e = email.toLowerCase().trim()
    const s = senha.trim()
    if((e === 'dioguin01267@gmail.com' || e === 'diogodungacr7@gmail.com') && s === 'dioguin012!'){
      setIsAdmin(true); setShowLogin(false); setErro('')
    } else { setErro('Acesso negado! Verifique email e senha.') }
  }

  return(
    <div style={{background:'#050505', color:'white', fontFamily:'Inter, sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.8)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px'}}>
        <h1 style={{letterSpacing:4, fontSize:18, fontWeight:900}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></h1>
        <div style={{display:'flex', gap:10}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'12px 22px', fontSize:12, border:'none', borderRadius:8, cursor:'pointer'}}>RESERVAR AGORA</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#666', padding:'12px 16px', fontSize:11, borderRadius:8, cursor:'pointer'}}>{isAdmin ? 'DONO ✓' : 'ADMIN'}</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:32, width:'100%', maxWidth:380, border:'1px solid #222', borderRadius:16}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{fontWeight:900, letterSpacing:2}}>ACESSO <span style={{color:'#FFC300'}}>DONO</span></h3><button onClick={()=>setShowLogin(false)} style={{background:'none', border:'none', color:'#666', cursor:'pointer', fontSize:18}}>✕</button></div>
            <p style={{color:'#555', fontSize:12, marginTop:6}}>Área restrita do proprietário</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Seu email de dono" style={{width:'100%', background:'#151515', padding:14, marginTop:24, border:'1px solid #222', borderRadius:8, color:'white', outline:'none'}} />
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Sua senha privada" style={{width:'100%', background:'#151515', padding:14, marginTop:12, border:'1px solid #222', borderRadius:8, color:'white', outline:'none'}} />
            {erro && <div style={{marginTop:12, color:'#ff5555', fontSize:12, background:'#1a0a0a', padding:10, borderRadius:6}}>{erro}</div>}
            <button onClick={fazerLogin} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:14, marginTop:16, border:'none', borderRadius:8, cursor:'pointer'}}>ENTRAR NO PAINEL</button>
          </div>
        </div>
      )}

      <div style={{padding:'130px 24px 40px', maxWidth:1200, margin:'0 auto'}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}><div style={{width:40, height:1, background:'#FFC300'}}></div><p style={{color:'#FFC300', letterSpacing:6, fontSize:10, fontWeight:700}}>FROTA PRÓPRIA • FOTOS REAIS • 2024</p></div>
        <h2 style={{fontSize:'clamp(40px, 8vw, 72px)', fontWeight:900, marginTop:20, lineHeight:0.9, letterSpacing:-2}}>O SEU TEMPO<br/>MERECE <span style={{color:'#FFC300'}}>RESPEITO.</span></h2>
        <p style={{color:'#777', fontSize:15, marginTop:16, maxWidth:520}}>Corolla 2024 Branco Perolizado. Sem adesivos, sem taxi. Transporte executivo premium em BH, Confins e todo o Brasil.</p>
        
        <div style={{marginTop:32, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:14}}>
          <div style={{position:'relative', overflow:'hidden', borderRadius:16, border:'1px solid #1a1a1a'}}><img src="/corolla1.jpg" style={{width:'100%', height:420, objectFit:'cover'}} alt="Corolla Branco MG Executive BR 262"/><div style={{position:'absolute', bottom:12, left:12, background:'rgba(0,0,0,0.7)', padding:'8px 12px', borderRadius:20, fontSize:10, letterSpacing:2}}>BR 262 • MILHÃO • FOTO REAL</div></div>
          <div style={{position:'relative', overflow:'hidden', borderRadius:16, border:'1px solid #1a1a1a'}}><img src="/corolla2.jpg" style={{width:'100%', height:420, objectFit:'cover'}} alt="Corolla Branco Mirante"/><div style={{position:'absolute', bottom:12, left:12, background:'rgba(0,0,0,0.7)', padding:'8px 12px', borderRadius:20, fontSize:10, letterSpacing:2}}>MINAS GERAIS • EXECUTIVO</div></div>
        </div>

        <div style={{marginTop:14, display:'flex', gap:12, flexWrap:'wrap'}}>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:'12px 18px', borderRadius:30, fontSize:11, display:'flex', gap:8}}><span style={{color:'#FFC300'}}>✓</span> COURO BEGE</div>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:'12px 18px', borderRadius:30, fontSize:11, display:'flex', gap:8}}><span style={{color:'#FFC300'}}>✓</span> ÁGUA + WIFI</div>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:'12px 18px', borderRadius:30, fontSize:11, display:'flex', gap:8}}><span style={{color:'#FFC300'}}>✓</span> MOTORISTA UNIFORMIZADO</div>
        </div>
      </div>

      <div style={{padding:'40px 24px', maxWidth:1200, margin:'0 auto'}}>
        <h3 style={{fontSize:28, fontWeight:900, letterSpacing:-1}}>DESTINOS <span style={{color:'#FFC300'}}>PREMIUM</span></h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:14, marginTop:20}}>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Confins"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>40 MIN • 24H</p><p style={{fontWeight:900, marginTop:4}}>CONFINS CNF</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Ouro Preto"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H30 • TURISMO</p><p style={{fontWeight:900, marginTop:4}}>OURO PRETO</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Inhotim"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H10 • CULTURA</p><p style={{fontWeight:900, marginTop:4}}>INHOTIM</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Tiradentes"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>3H • GASTRONOMIA</p><p style={{fontWeight:900, marginTop:4}}>TIRADENTES</p></div></div>
        </div>
      </div>

      <div style={{padding:'60px 24px', textAlign:'center', borderTop:'1px solid #111', marginTop:20}}>
        <h3 style={{fontSize:36, fontWeight:900}}>VAMOS RODAR?</h3>
        <p style={{color:'#666', marginTop:8}}>Resposta em menos de 2 minutos no WhatsApp</p>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Vi%20seu%20Corolla%20branco%20no%20site%20e%20quero%20reservar')} style={{marginTop:24, background:'#FFC300', color:'black', fontWeight:900, padding:'18px 40px', border:'none', borderRadius:30, cursor:'pointer', fontSize:14}}>WHATSAPP (31) 98881-1362</button>
        <p style={{color:'#222', fontSize:9, marginTop:30, letterSpacing:3}}>MG EXECUTIVE • BH PRIME TRANSFER • SITE OFICIAL</p>
      </div>
    </div>
  )
}
