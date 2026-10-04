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
      setIsAdmin(true)
      setShowLogin(false)
      setErro('')
    } else {
      setErro('Email ou senha errados!')
    }
  }

  return(
    <div style={{background:'black', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(0,0,0,0.95)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px'}}>
        <h1 style={{letterSpacing:4, fontSize:18, fontWeight:900}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></h1>
        <div style={{display:'flex', gap:10}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362?text=Quero%20reservar%20MG%20Executive')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 20px', fontSize:12, border:'none', cursor:'pointer'}}>RESERVAR</button>
          <button onClick={()=>setShowLogin(true)} style={{border:'1px solid #333', background:'transparent', color:'#888', padding:'10px 14px', fontSize:11, cursor:'pointer'}}>{isAdmin ? 'DONO ✓' : 'ADMIN'}</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0a0a0a', padding:28, width:'100%', maxWidth:360, border:'1px solid #FFC300'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{color:'#FFC300', fontWeight:900}}>ACESSO DONO</h3><button onClick={()=>setShowLogin(false)} style={{background:'none', border:'none', color:'#666', cursor:'pointer'}}>X</button></div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Seu email" style={{width:'100%', background:'#151515', padding:12, marginTop:20, border:'1px solid #333', color:'white'}} />
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha dioguin012!" style={{width:'100%', background:'#151515', padding:12, marginTop:12, border:'1px solid #333', color:'white'}} />
            {erro && <div style={{marginTop:12, color:'#ff6666', fontSize:12}}>{erro}</div>}
            <button onClick={fazerLogin} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:16, border:'none', cursor:'pointer'}}>ENTRAR</button>
          </div>
        </div>
      )}

      {isAdmin && (
        <div style={{marginTop:70, background:'#111', border:'1px solid #FFC300', padding:12, margin: '70px 20px 0 20px', display:'flex', justifyContent:'space-between'}}>
          <p style={{color:'#FFC300', fontSize:11}}>✓ LOGADO COMO DONO: {email}</p>
          <button onClick={()=>setIsAdmin(false)} style={{background:'#222', color:'white', border:'none', padding:'4px 10px', fontSize:10, cursor:'pointer'}}>SAIR</button>
        </div>
      )}

      <div style={{padding:'120px 24px 30px'}}>
        <p style={{color:'#FFC300', letterSpacing:6, fontSize:11}}>FROTA COROLLA 2024 BRANCO • BH E REGIÃO</p>
        <h2 style={{fontSize:52, fontWeight:900, marginTop:20, lineHeight:0.9}}>PRECISÃO E<br/><span style={{color:'#FFC300'}}>EXCLUSIVIDADE</span><br/>EM CADA TRAJETO.</h2>
        <div style={{marginTop:28, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:250, objectFit:'cover', border:'1px solid #222'}} alt="Corolla 2024 Branco" />
          <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:250, objectFit:'cover', border:'1px solid #222'}} alt="Corolla Branco Lateral" />
        </div>
        <p style={{color:'#FFC300', fontSize:11, marginTop:10, letterSpacing:2, fontWeight:900}}>COROLLA 2024 XEI BRANCO PEROLIZADO - BANCOS COURO BEGE / TETO SOLAR</p>
        <p style={{color:'#666', fontSize:12, marginTop:6}}>A frota mais nova de BH. Limpo, cheiroso, água gelada, WiFi e motorista uniformizado.</p>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Ol%C3%A1%20MG%20Executive,%20quero%20reservar%20o%20Corolla%20Branco')} style={{marginTop:20, background:'#FFC300', color:'black', fontWeight:900, padding:'16px 32px', border:'none', cursor:'pointer'}}>RESERVAR COROLLA BRANCO NO WHATSAPP</button>
      </div>

      <div style={{padding:'30px 24px', background:'#050505', borderTop:'1px solid #111'}}>
        <h3 style={{fontSize:28, fontWeight:900}}>DESTINOS <span style={{color:'#FFC300'}}>MAIS PROCURADOS</span></h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:14, marginTop:20}}>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a'}}><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Confins"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>40 MIN • MAIS PEDIDO</p><p style={{fontWeight:900, marginTop:4}}>CONFINS CNF</p><p style={{color:'#666', fontSize:11}}>Transfer BH x Confins 24h</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a'}}><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Ouro Preto"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H30 • TURISMO</p><p style={{fontWeight:900, marginTop:4}}>OURO PRETO</p><p style={{color:'#666', fontSize:11}}>Cidade histórica UNESCO</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a'}}><img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Inhotim"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H10 • CULTURA</p><p style={{fontWeight:900, marginTop:4}}>INHOTIM</p><p style={{color:'#666', fontSize:11}}>Museu a céu aberto</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a'}}><img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Tiradentes"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>3H • FIM DE SEMANA</p><p style={{fontWeight:900, marginTop:4}}>TIRADENTES</p><p style={{color:'#666', fontSize:11}}>Gastronomia premium</p></div></div>
        </div>
      </div>

      <div style={{padding:'50px 24px', textAlign:'center', borderTop:'1px solid #111'}}>
        <h3 style={{fontSize:32, fontWeight:900}}>COROLLA BRANCO TE ESPERANDO</h3>
        <p style={{color:'#666', marginTop:10}}>WhatsApp (31) 98881-1362 - Atendimento 24h</p>
        <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{marginTop:20, background:'#FFC300', color:'black', fontWeight:900, padding:'18px 40px', border:'none', cursor:'pointer'}}>CHAMAR NO WHATSAPP</button>
        <p style={{color:'#222', fontSize:9, marginTop:30, letterSpacing:3}}>MG EXECUTIVE • BH PRIME TRANSFER • 2025</p>
      </div>
    </div>
  )
}
