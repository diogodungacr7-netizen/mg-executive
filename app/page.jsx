'use client'
import { useState } from 'react'

export default function Home(){
  const [showAdmin, setShowAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)

  if(showAdmin && !logado){
    return(
      <div style={{minHeight:'100vh', background:'black', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>
        <div style={{background:'#151515', padding:32, width:360, border:'1px solid #222'}}>
          <h1 style={{color:'#FFC300', fontSize:24, fontWeight:900}}>MG EXECUTIVE<br/><span style={{color:'white', fontSize:12, fontWeight:400}}>Admin</span></h1>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:'100%', background:'#222', padding:12, marginTop:24, border:'1px solid #333', color:'white'}} />
          <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" style={{width:'100%', background:'#222', padding:12, marginTop:12, border:'1px solid #333', color:'white'}} />
          <button onClick={()=>{ if(email==='dioguin01267@gmail.com' && senha==='dioguin012!') setLogado(true); else alert('Login errado!') }} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:16}}>ENTRAR</button>
          <button onClick={()=>setShowAdmin(false)} style={{width:'100%', marginTop:8, color:'#666', fontSize:12}}>Voltar ao site</button>
        </div>
      </div>
    )
  }

  if(logado){
    return <div style={{minHeight:'100vh', background:'#0a0a0a', color:'white', padding:32}}><h1 style={{fontSize:32, color:'#FFC300'}}>Painel Admin - MG Executive</h1><p style={{marginTop:16}}>Logado como dioguin01267@gmail.com</p><div style={{marginTop:24, background:'#151515', padding:16, border:'1px solid #222'}}>Nenhuma reserva ainda. Quando cliente reservar, aparece aqui.</div><button onClick={()=>{setLogado(false); setShowAdmin(false)}} style={{marginTop:16, border:'1px solid #333', padding:'8px 16px'}}>Sair</button></div>
  }

  return(
    <div style={{background:'#0a0a0a', color:'white', fontFamily:'sans-serif'}}>
      <button onClick={()=>setShowAdmin(true)} style={{position:'fixed', top:16, right:16, background:'#FFC300', color:'black', fontWeight:900, padding:'8px 16px', fontSize:12}}>ADMIN</button>
      <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:40, background:'black'}}>
        <h1 style={{letterSpacing:4}}>MG <span style={{color:'#FFC300', fontWeight:900}}>EXECUTIVE</span></h1>
        <h2 style={{fontSize:48, fontWeight:900, marginTop:40, lineHeight:0.9}}>PRECISÃO E<br/><span style={{color:'#FFC300'}}>EXCLUSIVIDADE</span> EM<br/>CADA TRAJETO.</h2>
        <p style={{color:'#888', marginTop:16, maxWidth:500}}>Transporte executivo premium em BH. Corolla 2024, SUVs premium, atendimento 24h. Confins, Pampulha, Guarulhos, Ouro Preto, Tiradentes, Inhotim.</p>
      </div>
      <div style={{padding:40}}><h3 style={{fontSize:24}}>Veículos: Sedan Premium - Corolla 2024 Preto</h3><p style={{color:'#888', marginTop:8}}>Bancos couro, wifi, água, motorista bilíngue</p></div>
      <div style={{padding:40, background:'#0f0f0f'}}><h3 style={{fontSize:24, color:'#FFC300'}}>Destinos</h3><p style={{marginTop:8}}>Confins CNF, Pampulha PLU, Guarulhos GRU, Ouro Preto, Tiradentes, Inhotim, Congonhas, Mariana, Diamantina</p></div>
      <div style={{padding:40}}><h3 style={{fontSize:24}}>Solicite sua reserva</h3><button onClick={()=>window.open('https://wa.me/5531999999999?text=Quero%20reservar%20MG%20Executive')} style={{marginTop:16, background:'#FFC300', color:'black', fontWeight:900, padding:'16px 32px'}}>SOLICITAR NO WHATSAPP</button></div>
    </div>
  )
}
