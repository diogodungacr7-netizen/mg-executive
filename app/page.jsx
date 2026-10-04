'use client'
import { useState, useEffect } from 'react'

export default function Home(){
  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [aba, setAba] = useState('geral')
  const [corridas, setCorridas] = useState([])

  useEffect(()=>{
    const salvas = localStorage.getItem('mg_corridas')
    if(salvas) setCorridas(JSON.parse(salvas))
    else setCorridas([
      {id:1, cliente:'Dr. Ricardo', destino:'Confins CNF', data:'04/10/2026', valor:180, status:'Concluída'},
      {id:2, cliente:'Ana Paula', destino:'Ouro Preto', data:'05/10/2026', valor:450, status:'Agendada'},
      {id:3, cliente:'Empresa Vale', destino:'Inhotim', data:'06/10/2026', valor:380, status:'Agendada'},
    ])
  },[])

  useEffect(()=>{ localStorage.setItem('mg_corridas', JSON.stringify(corridas)) }, [corridas])

  const fazerLogin = () => {
    const e = email.toLowerCase().trim()
    const s = senha.trim()
    if((e === 'dioguin01267@gmail.com' || e === 'diogodungacr7@gmail.com') && s === 'dioguin012!'){
      setIsAdmin(true); setShowLogin(false); setErro('')
    } else { setErro('Acesso negado!') }
  }

  const faturamentoTotal = corridas.reduce((a,b)=>a+b.valor,0)
  const agendadas = corridas.filter(c=>c.status==='Agendada')

  // SE FOR DONO, MOSTRA PAINEL COMPLETO
  if(isAdmin){
    return (
      <div style={{background:'#080808', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:20}}>
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #1a1a1a', paddingBottom:16}}>
          <h1 style={{fontWeight:900, letterSpacing:3}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span> <span style={{fontSize:10, color:'#666'}}>PAINEL DONO</span></h1>
          <div style={{display:'flex', gap:10}}>
            <button onClick={()=>setIsAdmin(false)} style={{background:'#111', border:'1px solid #333', color:'#aaa', padding:'8px 14px', borderRadius:8, cursor:'pointer'}}>VER SITE CLIENTE</button>
            <button onClick={()=>{setIsAdmin(false); setShowLogin(false)}} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'8px 14px', borderRadius:8, border:'none', cursor:'pointer'}}>SAIR</button>
          </div>
        </header>

        <div style={{display:'flex', gap:8, marginTop:20, flexWrap:'wrap'}}>
          <button onClick={()=>setAba('geral')} style={{background: aba==='geral'?'#FFC300':'#111', color: aba==='geral'?'black':'#888', fontWeight:900, padding:'10px 16px', borderRadius:20, border:'none', cursor:'pointer'}}>GERAL</button>
          <button onClick={()=>setAba('agenda')} style={{background: aba==='agenda'?'#FFC300':'#111', color: aba==='agenda'?'black':'#888', fontWeight:900, padding:'10px 16px', borderRadius:20, border:'none', cursor:'pointer'}}>AGENDAMENTOS ({agendadas.length})</button>
          <button onClick={()=>setAba('historico')} style={{background: aba==='historico'?'#FFC300':'#111', color: aba==='historico'?'black':'#888', fontWeight:900, padding:'10px 16px', borderRadius:20, border:'none', cursor:'pointer'}}>HISTÓRICO</button>
          <button onClick={()=>setAba('fatura')} style={{background: aba==='fatura'?'#FFC300':'#111', color: aba==='fatura'?'black':'#888', fontWeight:900, padding:'10px 16px', borderRadius:20, border:'none', cursor:'pointer'}}>FATURAMENTO</button>
        </div>

        {aba==='geral' && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:14, marginTop:24}}>
            <div style={{background:'#111', border:'1px solid #1a1a1a', padding:20, borderRadius:12}}><p style={{color:'#666', fontSize:11}}>FATURAMENTO TOTAL</p><p style={{fontSize:28, fontWeight:900, color:'#FFC300', marginTop:6}}>R$ {faturamentoTotal}</p></div>
            <div style={{background:'#111', border:'1px solid #1a1a1a', padding:20, borderRadius:12}}><p style={{color:'#666', fontSize:11}}>CORRIDAS AGENDADAS</p><p style={{fontSize:28, fontWeight:900, marginTop:6}}>{agendadas.length}</p></div>
            <div style={{background:'#111', border:'1px solid #1a1a1a', padding:20, borderRadius:12}}><p style={{color:'#666', fontSize:11}}>CORRIDAS CONCLUÍDAS</p><p style={{fontSize:28, fontWeight:900, marginTop:6}}>{corridas.filter(c=>c.status==='Concluída').length}</p></div>
            <div style={{background:'#111', border:'1px solid #1a1a1a', padding:20, borderRadius:12}}><p style={{color:'#666', fontSize:11}}>SEU CARRO</p><p style={{fontSize:14, fontWeight:900, marginTop:6}}>COROLLA 2024 BRANCO • BR 262</p></div>
          </div>
        )}

        {aba==='agenda' && (
          <div style={{marginTop:20, background:'#111', borderRadius:12, overflow:'hidden', border:'1px solid #1a1a1a'}}>
            {agendadas.map(c=>(
              <div key={c.id} style={{display:'flex', justifyContent:'space-between', padding:16, borderBottom:'1px solid #1a1a1a'}}>
                <div><p style={{fontWeight:900}}>{c.cliente} • {c.destino}</p><p style={{color:'#666', fontSize:12}}>{c.data} • R$ {c.valor}</p></div>
                <button onClick={()=>{setCorridas(corridas.map(x=>x.id===c.id?{...x, status:'Concluída'}:x))}} style={{background:'#FFC300', color:'black', border:'none', padding:'8px 12px', borderRadius:8, fontWeight:900, cursor:'pointer', fontSize:11}}>CONCLUIR</button>
              </div>
            ))}
          </div>
        )}

        {aba==='historico' && (
          <div style={{marginTop:20}}>
            <button onClick={()=>{const cli=prompt('Nome cliente?'); const dest=prompt('Destino?'); const val=Number(prompt('Valor R$?')||0); if(cli&&dest) setCorridas([{id:Date.now(), cliente:cli, destino:dest, data:new Date().toLocaleDateString(), valor:val, status:'Agendada'},...corridas])}} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'12px 20px', borderRadius:8, border:'none', cursor:'pointer', marginBottom:12}}>+ NOVA CORRIDA</button>
            <div style={{background:'#111', borderRadius:12, overflow:'hidden', border:'1px solid #1a1a1a'}}>
              {corridas.map(c=>(
                <div key={c.id} style={{display:'flex', justifyContent:'space-between', padding:14, borderBottom:'1px solid #1a1a1a', fontSize:13}}>
                  <span>{c.data} - {c.cliente} - {c.destino}</span><span style={{color: c.status==='Concluída'?'#4ade80':'#FFC300', fontWeight:900}}>{c.status} • R$ {c.valor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {aba==='fatura' && (
          <div style={{marginTop:20, background:'#111', padding:20, borderRadius:12, border:'1px solid #1a1a1a'}}>
            <p style={{fontWeight:900, fontSize:18}}>FATURAMENTO DETALHADO</p>
            <p style={{marginTop:10, color:'#888'}}>Total Bruto: <span style={{color:'#FFC300', fontWeight:900}}>R$ {faturamentoTotal}</span></p>
            <p style={{marginTop:6, color:'#888'}}>Média por corrida: R$ {(faturamentoTotal/(corridas.length||1)).toFixed(0)}</p>
            <div style={{marginTop:16, background:'#080808', padding:12, borderRadius:8}}><p style={{fontSize:12, color:'#555'}}>Dica: Isso aqui salva no seu celular automaticamente. Quando concluir corrida, já soma no faturamento.</p></div>
          </div>
        )}
      </div>
    )
  }

  // PÁGINA DO CLIENTE (SEM DANIFICAR)
  return(
    <div style={{background:'#050505', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.85)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px'}}>
        <h1 style={{letterSpacing:4, fontSize:18, fontWeight:900}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></h1>
        <div style={{display:'flex', gap:10}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'12px 22px', fontSize:12, border:'none', borderRadius:8, cursor:'pointer'}}>RESERVAR</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#666', padding:'12px 16px', fontSize:11, borderRadius:8, cursor:'pointer'}}>ADMIN</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:32, width:'100%', maxWidth:380, border:'1px solid #222', borderRadius:16}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{fontWeight:900, letterSpacing:2}}>ACESSO <span style={{color:'#FFC300'}}>DONO</span></h3><button onClick={()=>setShowLogin(false)} style={{background:'none', border:'none', color:'#666', cursor:'pointer', fontSize:18}}>✕</button></div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email do dono" style={{width:'100%', background:'#151515', padding:14, marginTop:24, border:'1px solid #222', borderRadius:8, color:'white'}} />
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha privada" style={{width:'100%', background:'#151515', padding:14, marginTop:12, border:'1px solid #222', borderRadius:8, color:'white'}} />
            {erro && <div style={{marginTop:12, color:'#ff5555', fontSize:12}}>{erro}</div>}
            <button onClick={fazerLogin} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:14, marginTop:16, border:'none', borderRadius:8, cursor:'pointer'}}>ENTRAR NO PAINEL</button>
          </div>
        </div>
      )}

      <div style={{padding:'130px 24px 40px', maxWidth:1200, margin:'0 auto'}}>
        <p style={{color:'#FFC300', letterSpacing:6, fontSize:10, fontWeight:700}}>FROTA PRÓPRIA • FOTO REAL • COROLLA 2024 BRANCO</p>
        <h2 style={{fontSize:'clamp(40px, 8vw, 68px)', fontWeight:900, marginTop:20, lineHeight:0.9}}>O SEU TEMPO<br/>MERECE <span style={{color:'#FFC300'}}>RESPEITO.</span></h2>
        <div style={{marginTop:28, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:14}}>
          <img src="https://images.unsplash.com/photo-1623869675781-80b90a8d2d8e?q=80&w=1200&auto=format&fit=crop" style={{width:'100%', height:420, objectFit:'cover', borderRadius:16, border:'1px solid #1a1a1a'}} alt="Corolla Branco Executive" />
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:420, objectFit:'cover', borderRadius:16, border:'1px solid #1a1a1a'}} alt="Corolla Detalhe" />
        </div>
        <p style={{color:'#FFC300', fontSize:11, marginTop:10, letterSpacing:2, fontWeight:900}}>SEU COROLLA 2024 BRANCO PEROLIZADO - TROQUE PELAS SUAS FOTOS QUANDO SUBIR NA PASTA PUBLIC</p>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Quero%20reservar%20o%20Corolla%20branco%20MG%20Executive')} style={{marginTop:20, background:'#FFC300', color:'black', fontWeight:900, padding:'16px 32px', border:'none', borderRadius:30, cursor:'pointer'}}>RESERVAR MEU COROLLA BRANCO</button>
      </div>

      <div style={{padding:'30px 24px', maxWidth:1200, margin:'0 auto'}}>
        <h3 style={{fontSize:28, fontWeight:900}}>DESTINOS <span style={{color:'#FFC300'}}>PREMIUM</span></h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:14, marginTop:20}}>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Confins"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>40 MIN • MAIS PEDIDO</p><p style={{fontWeight:900}}>CONFINS CNF</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Ouro Preto"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H30 • TURISMO</p><p style={{fontWeight:900}}>OURO PRETO</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Inhotim"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>1H10 • CULTURA</p><p style={{fontWeight:900}}>INHOTIM</p></div></div>
          <div style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:12, overflow:'hidden'}}><img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" style={{width:'100%', height:160, objectFit:'cover'}} alt="Tiradentes"/><div style={{padding:14}}><p style={{color:'#FFC300', fontSize:10}}>3H • FIM DE SEMANA</p><p style={{fontWeight:900}}>TIRADENTES</p></div></div>
        </div>
      </div>

      <div style={{padding:'60px 24px', textAlign:'center', borderTop:'1px solid #111', marginTop:20}}>
        <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'18px 40px', border:'none', borderRadius:30, cursor:'pointer'}}>WHATSAPP (31) 98881-1362</button>
      </div>
    </div>
  )
}
