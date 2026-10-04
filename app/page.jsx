'use client'
import { useState } from 'react'

export default function Home(){
  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showReservas, setShowReservas] = useState(false)

  const fazerLogin = () => {
    setErro('')
    const emailLimpo = email.toLowerCase().trim()
    const senhaLimpa = senha.trim()
    
    if(emailLimpo === 'dioguin01267@gmail.com' && senhaLimpa === 'dioguin012!'){
      setLogado(true)
    } else {
      setErro('Email ou senha incorretos! Tente: dioguin01267@gmail.com / dioguin012!')
    }
  }

  // TELA DE LOGIN OBRIGATÓRIA
  if(!logado){
    return(
      <div style={{minHeight:'100vh', background:'black', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'sans-serif', padding:20}}>
        <div style={{background:'#0a0a0a', padding:40, width:'100%', maxWidth:400, border:'1px solid #FFC300', boxShadow:'0 0 30px rgba(255,195,0,0.2)'}}>
          <h1 style={{color:'#FFC300', fontSize:28, fontWeight:900, letterSpacing:4, textAlign:'center'}}>MG <span style={{color:'white'}}>EXECUTIVE</span></h1>
          <p style={{textAlign:'center', color:'#666', fontSize:12, marginTop:8, letterSpacing:2}}>ACESSO RESTRITO</p>
          
          <div style={{marginTop:32}}>
            <label style={{fontSize:10, color:'#FFC300', letterSpacing:2}}>EMAIL</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="dioguin01267@gmail.com" style={{width:'100%', background:'#151515', padding:14, marginTop:8, border:'1px solid #333', color:'white', outline:'none'}} />
          </div>
          
          <div style={{marginTop:16}}>
            <label style={{fontSize:10, color:'#FFC300', letterSpacing:2}}>SENHA</label>
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="••••••••" style={{width:'100%', background:'#151515', padding:14, marginTop:8, border:'1px solid #333', color:'white', outline:'none'}} />
          </div>

          {erro && <div style={{marginTop:16, background:'rgba(255,0,0,0.1)', border:'1px solid red', padding:12, color:'#ff6666', fontSize:12}}>{erro}</div>}

          <button onClick={fazerLogin} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:16, marginTop:24, letterSpacing:2, cursor:'pointer'}}>ENTRAR NO SISTEMA</button>
          
          <p style={{marginTop:16, color:'#444', fontSize:10, textAlign:'center'}}>Transporte Executivo Premium - BH e Região</p>
        </div>
      </div>
    )
  }

  // SITE COMPLETO PRETO E DOURADO
  return(
    <div style={{background:'black', color:'white', fontFamily:'sans-serif'}}>
      {/* HEADER */}
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(0,0,0,0.95)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 40px'}}>
        <h1 style={{letterSpacing:4, fontSize:18}}>MG <span style={{color:'#FFC300', fontWeight:900}}>EXECUTIVE</span></h1>
        <div style={{display:'flex', gap:12}}>
          <button onClick={()=>setShowReservas(!showReservas)} style={{border:'1px solid #FFC300', color:'#FFC300', padding:'8px 16px', fontSize:11, letterSpacing:1}}>RESERVAS</button>
          <button onClick={()=>setLogado(false)} style={{background:'#222', color:'#666', padding:'8px 16px', fontSize:11}}>SAIR</button>
        </div>
      </header>

      {showReservas && (
        <div style={{position:'fixed', top:70, right:20, background:'#0a0a0a', border:'1px solid #FFC300', padding:20, zIndex:60, width:320}}>
          <h3 style={{color:'#FFC300', fontSize:14}}>Painel Admin</h3>
          <p style={{color:'#666', fontSize:12, marginTop:8}}>Logado como dioguin01267@gmail.com</p>
          <div style={{marginTop:16, background:'#151515', padding:12, border:'1px solid #222', fontSize:12, color:'#888'}}>Nenhuma reserva ainda. Quando cliente solicitar pelo WhatsApp, você gerencia aqui.</div>
        </div>
      )}

      {/* HERO */}
      <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'100px 40px 40px', background:'linear-gradient(180deg, black 0%, #0a0a0a 100%)'}}>
        <p style={{color:'#FFC300', letterSpacing:6, fontSize:11}}>BELO HORIZONTE • CONFINS • BRASIL</p>
        <h2 style={{fontSize:72, fontWeight:900, marginTop:24, lineHeight:0.9, letterSpacing:-2}}>PRECISÃO E<br/><span style={{color:'#FFC300'}}>EXCLUSIVIDADE</span><br/>EM CADA TRAJETO.</h2>
        <p style={{color:'#666', marginTop:24, maxWidth:600, lineHeight:1.6}}>Transporte executivo premium. Frota Corolla 2024 preto, SUVs de luxo, motorista bilíngue, atendimento 24h. O padrão que executivos de BH confiam.</p>
        <div style={{marginTop:32, display:'flex', gap:16, flexWrap:'wrap'}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362?text=Ol%C3%A1%20MG%20Executive%2C%20quero%20solicitar%20uma%20reserva%20executiva')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'18px 36px', letterSpacing:1}}>RESERVAR AGORA - WHATSAPP</button>
          <div style={{display:'flex', alignItems:'center', gap:12, border:'1px solid #222', padding:'0 20px'}}>
            <span style={{color:'#FFC300'}}>●</span><span style={{fontSize:12, color:'#888'}}>DISPONÍVEL 24H</span>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070" style={{marginTop:60, width:'100%', height:400, objectFit:'cover', opacity:0.6, border:'1px solid #222'}} alt="Carro luxo" />
      </div>

      {/* VEICULOS */}
      <div style={{padding:80, borderTop:'1px solid #111'}}>
        <h3 style={{color:'#FFC300', letterSpacing:4, fontSize:12}}>NOSSA FROTA</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:20, marginTop:32}}>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', padding:24}}>
            <img src="https://images.unsplash.com/photo-1623869675781-80b17a6d2a8d?q=80&w=1000" style={{width:'100%', height:200, objectFit:'cover'}} alt="Corolla" />
            <h4 style={{marginTop:16, fontWeight:900}}>SEDAN PREMIUM</h4>
            <p style={{color:'#FFC300', fontSize:12, marginTop:4}}>Corolla 2024 Preto • Couro • WiFi • Água</p>
            <p style={{color:'#666', fontSize:12, marginTop:8}}>Ideal para executivo, aeroporto, reuniões.</p>
          </div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', padding:24}}>
            <img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1000" style={{width:'100%', height:200, objectFit:'cover'}} alt="SUV" />
            <h4 style={{marginTop:16, fontWeight:900}}>SUV EXECUTIVO</h4>
            <p style={{color:'#FFC300', fontSize:12, marginTop:4}}>SW4 / Compass • 4x4 • Porta-malas amplo</p>
            <p style={{color:'#666', fontSize:12, marginTop:8}}>Família, bagagem grande, Inhotim, estrada.</p>
          </div>
        </div>
      </div>

      {/* DESTINOS */}
      <div style={{padding:80, background:'#050505', borderTop:'1px solid #111', borderBottom:'1px solid #111'}}>
        <h3 style={{fontSize:36, fontWeight:900}}>DESTINOS <span style={{color:'#FFC300'}}>PREMIUM</span></h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16, marginTop:32}}>
          {[
            {nome:'CONFINS CNF', tempo:'40min', desc:'Aeroporto Internacional'},
            {nome:'PAMPULHA PLU', tempo:'20min', desc:'Aeroporto Pampulha'},
            {nome:'GUARULHOS GRU', tempo:'6h', desc:'São Paulo'},
            {nome:'OURO PRETO', tempo:'1h30', desc:'Cidade histórica'},
            {nome:'TIRADENTES', tempo:'3h', desc:'Destino turístico'},
            {nome:'INHOTIM', tempo:'1h10', desc:'Museu a céu aberto'},
          ].map(d=>(
            <div key={d.nome} style={{border:'1px solid #222', padding:20, background:'black'}}>
              <p style={{color:'#FFC300', fontSize:11, letterSpacing:2}}>{d.tempo}</p>
              <p style={{fontWeight:900, marginTop:8}}>{d.nome}</p>
              <p style={{color:'#555', fontSize:11, marginTop:4}}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{padding:'80px 40px', textAlign:'center'}}>
        <h3 style={{fontSize:42, fontWeight:900}}>PRONTO PARA<br/><span style={{color:'#FFC300'}}>RODAR COM EXCELÊNCIA?</span></h3>
        <p style={{color:'#666', marginTop:16}}>Atendimento via WhatsApp 24h - (31) 98881-1362</p>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Ol%C3%A1%20MG%20Executive%2C%20quero%20solicitar%20uma%20reserva')} style={{marginTop:32, background:'#FFC300', color:'black', fontWeight:900, padding:'20px 48px', fontSize:16, letterSpacing:2}}>FALAR NO WHATSAPP AGORA</button>
        <p style={{color:'#333', fontSize:10, marginTop:40, letterSpacing:3}}>MG EXECUTIVE © 2025 • BELO HORIZONTE • TRANSPORTE DE LUXO</p>
      </div>
    </div>
  )
}
