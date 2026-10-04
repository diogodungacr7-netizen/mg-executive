'use client'
import { useState, useEffect } from 'react'

export default function Home(){
  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [aba, setAba] = useState('agenda')
  const [corridas, setCorridas] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [novo, setNovo] = useState({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada'})

  useEffect(()=>{
    const s = localStorage.getItem('mg_real_final')
    if(s) setCorridas(JSON.parse(s))
  },[])
  useEffect(()=>{ if(corridas.length>=0) localStorage.setItem('mg_real_final', JSON.stringify(corridas)) }, [corridas])

  const login = () => {
    const e=email.toLowerCase().trim(); const s=senha.trim()
    if((e==='dioguin01267@gmail.com'||e==='diogodungacr7@gmail.com')&&s==='dioguin012!'){ setIsAdmin(true); setShowLogin(false) }
    else setErro('Acesso negado!')
  }
  const adicionar = () => {
    if(!novo.cliente||!novo.valor) return alert('Nome e valor obrigatório!')
    setCorridas([{id:Date.now(), cliente:novo.cliente, telefone:novo.telefone, destino:novo.destino, data:novo.data||new Date().toLocaleDateString('pt-BR'), valor:Number(novo.valor), status:novo.status},...corridas])
    setNovo({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada'}); setShowAdd(false)
  }
  const total = corridas.reduce((a,b)=>a+b.valor,0)
  const agendadas = corridas.filter(c=>c.status==='Agendada')
  const concluidas = corridas.filter(c=>c.status==='Concluída')

  if(isAdmin){
    return(
      <div style={{background:'#080808', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:16}}>
        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1a1a1a', paddingBottom:12}}>
          <b>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span> • PAINEL REAL</b>
          <button onClick={()=>setIsAdmin(false)} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'8px 14px', borderRadius:8, border:'none', cursor:'pointer'}}>VER SITE CLIENTE</button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16}}>
          <div style={{background:'#111', padding:12, borderRadius:10, border:'1px solid #1a1a1a'}}><p style={{fontSize:10, color:'#666'}}>FATURAMENTO</p><p style={{fontSize:20, fontWeight:900, color:'#FFC300'}}>R$ {total}</p></div>
          <div style={{background:'#111', padding:12, borderRadius:10, border:'1px solid #1a1a1a'}}><p style={{fontSize:10, color:'#666'}}>CONCLUÍDAS</p><p style={{fontSize:20, fontWeight:900, color:'#4ade80'}}>{concluidas.length}</p></div>
          <div style={{background:'#111', padding:12, borderRadius:10, border:'1px solid #1a1a1a'}}><p style={{fontSize:10, color:'#666'}}>AGENDADAS</p><p style={{fontSize:20, fontWeight:900}}>{agendadas.length}</p></div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{width:'100%', marginTop:14, background:'#FFC300', color:'black', fontWeight:900, padding:12, borderRadius:10, border:'none', cursor:'pointer'}}>+ ADICIONAR ATENDIMENTO</button>
        {showAdd && (
          <div style={{background:'#111', border:'1px solid #FFC300', padding:12, borderRadius:10, marginTop:10}}>
            <input value={novo.cliente} onChange={e=>setNovo({...novo, cliente:e.target.value})} placeholder="Nome cliente *" style={{width:'100%', background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white'}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <input value={novo.telefone} onChange={e=>setNovo({...novo, telefone:e.target.value})} placeholder="WhatsApp" style={{background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white'}}/>
              <input value={novo.valor} onChange={e=>setNovo({...novo, valor:e.target.value})} type="number" placeholder="Valor R$ *" style={{background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white'}}/>
            </div>
            <input value={novo.destino} onChange={e=>setNovo({...novo, destino:e.target.value})} placeholder="Destino" style={{width:'100%', background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white', marginTop:8}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <input type="date" value={novo.data} onChange={e=>setNovo({...novo, data:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white'}}/>
              <select value={novo.status} onChange={e=>setNovo({...novo, status:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:10, borderRadius:8, color:'white'}}><option>Agendada</option><option>Concluída</option></select>
            </div>
            <button onClick={adicionar} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:10, borderRadius:8, border:'none', marginTop:8, cursor:'pointer'}}>SALVAR E SOMAR</button>
          </div>
        )}
        <div style={{marginTop:12, background:'#111', borderRadius:10, border:'1px solid #1a1a1a'}}>
          {(aba==='agenda'?agendadas:corridas).map(c=>(
            <div key={c.id} style={{padding:10, borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between'}}>
              <div><b style={{fontSize:13}}>{c.cliente}</b><p style={{fontSize:11, color:'#666'}}>{c.destino} • R$ {c.valor} • {c.data}</p></div>
              <div><span style={{fontSize:9, background: c.status==='Concluída'?'#052e16':'#332800', color: c.status==='Concluída'?'#4ade80':'#FFC300', padding:'4px 8px', borderRadius:10, fontWeight:900}}>{c.status}</span>{c.status==='Agendada'&&<button onClick={()=>setCorridas(corridas.map(x=>x.id===c.id?{...x,status:'Concluída'}:x))} style={{display:'block', marginTop:4, background:'#FFC300', color:'black', fontSize:8, fontWeight:900, padding:'4px 6px', borderRadius:6, border:'none', cursor:'pointer'}}>CONCLUIR</button>}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return(
    <div style={{background:'#050505', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.9)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', padding:'14px 20px'}}>
        <b style={{letterSpacing:3}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></b>
        <div style={{display:'flex', gap:8}}><button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 18px', borderRadius:8, border:'none', cursor:'pointer', fontSize:11}}>RESERVAR</button><button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#555', padding:'10px', borderRadius:8, fontSize:10, cursor:'pointer'}}>ADMIN</button></div>
      </header>
      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:24, width:'100%', maxWidth:360, borderRadius:16, border:'1px solid #222'}}>
            <b>ACESSO DONO</b>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:'100%', background:'#151515', padding:12, marginTop:12, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" style={{width:'100%', background:'#151515', padding:12, marginTop:8, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            {erro&&<p style={{color:'#f55', fontSize:11, marginTop:8}}>{erro}</p>}
            <button onClick={login} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:10, borderRadius:8, border:'none', cursor:'pointer'}}>ENTRAR</button>
            <button onClick={()=>setShowLogin(false)} style={{width:'100%', background:'none', border:'none', color:'#555', marginTop:6, cursor:'pointer', fontSize:11}}>fechar</button>
          </div>
        </div>
      )}
      <div style={{padding:'90px 20px 20px', maxWidth:1100, margin:'0 auto'}}>
        <p style={{color:'#FFC300', fontSize:9, letterSpacing:5, fontWeight:700}}>SEU COROLLA BRANCO REAL • SEM TÁXI • EXECUTIVO</p>
        <h2 style={{fontSize:'clamp(36px, 7vw, 60px)', fontWeight:900, lineHeight:0.9, marginTop:12}}>O SEU TEMPO<br/><span style={{color:'#FFC300'}}>MERECE RESPEITO.</span></h2>
        <div style={{marginTop:20, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
          <img src="/corolla-branco.jpg" onError={e=>e.target.src='/corolla-interior.jpg'} style={{width:'100%', height:400, objectFit:'cover', borderRadius:16, border:'1px solid #1a1a1a', background:'#111'}} alt="Seu Corolla Branco Executivo MG"/>
          <img src="/corolla-interior.jpg" onError={e=>e.target.src='/corolla-branco.jpg'} style={{width:'100%', height:400, objectFit:'cover', borderRadius:16, border:'1px solid #1a1a1a', background:'#111'}} alt="Interior Corolla Executivo"/>
        </div>
        <p style={{fontSize:10, color:'#FFC300', marginTop:8, fontWeight:900}}>↑ SUAS FOTOS REAIS JÁ SEM O TÁXI - COROLLA 2024 BRANCO PEROLIZADO</p>
      </div>
      <div style={{padding:'30px 20px', textAlign:'center', borderTop:'1px solid #111'}}>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Quero%20reservar%20Corolla%20branco%20executivo')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'16px 36px', borderRadius:30, border:'none', cursor:'pointer'}}>WHATSAPP (31) 98881-1362</button>
      </div>
    </div>
  )
}
