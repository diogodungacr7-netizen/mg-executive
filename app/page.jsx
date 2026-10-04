'use client'
import { useState, useEffect } from 'react'

const FOTO_EXTERNA = "https://images.unsplash.com/photo-1623869675781-80b90a8d2d8e?q=80&w=1200&auto=format&fit=crop"
const FOTO_INTERNA = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"

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
    const salvas = localStorage.getItem('mg_exec_v5')
    if(salvas){ setCorridas(JSON.parse(salvas)) }
    else { setCorridas([{id:1, cliente:'Dr. Ricardo', telefone:'31 99999-0001', destino:'Confins CNF', data:'2026-10-04', valor:180, status:'Concluída'}]) }
  },[])
  useEffect(()=>{ if(corridas.length) localStorage.setItem('mg_exec_v5', JSON.stringify(corridas)) }, [corridas])

  const login = () => {
    const e=email.toLowerCase().trim(); const s=senha.trim()
    if((e==='dioguin01267@gmail.com'||e==='diogodungacr7@gmail.com')&&s==='dioguin012!'){ setIsAdmin(true); setShowLogin(false); setErro('') }
    else setErro('Dados incorretos!')
  }

  const adicionar = () => {
    if(!novo.cliente||!novo.valor) return alert('Preencha cliente e valor!')
    setCorridas([{id:Date.now(), cliente:novo.cliente, telefone:novo.telefone, destino:novo.destino, data:novo.data||new Date().toISOString().split('T')[0], valor:Number(novo.valor), status:novo.status},...corridas])
    setNovo({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada'}); setShowAdd(false)
  }

  const total = corridas.reduce((a,b)=>a+b.valor,0)
  const concluidas = corridas.filter(c=>c.status==='Concluída')
  const agendadas = corridas.filter(c=>c.status==='Agendada')

  // ===== PAINEL ADMIN TOTALMENTE SEPARADO - NÃO AFETA CLIENTE =====
  if(isAdmin){
    return(
      <div style={{background:'#080808', minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
        <div style={{padding:16, borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div><p style={{fontWeight:900, letterSpacing:2}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></p><p style={{fontSize:10, color:'#555'}}>PAINEL DONO • DADOS REAIS • AUTO SAVE</p></div>
          <button onClick={()=>setIsAdmin(false)} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 16px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12}}>VOLTAR AO SITE CLIENTE</button>
        </div>

        <div style={{padding:16, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:14, borderRadius:12}}><p style={{fontSize:9, color:'#666'}}>FATURAMENTO TOTAL</p><p style={{fontSize:22, fontWeight:900, color:'#FFC300', marginTop:4}}>R$ {total}</p></div>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:14, borderRadius:12}}><p style={{fontSize:9, color:'#666'}}>CONCLUÍDAS</p><p style={{fontSize:22, fontWeight:900, color:'#4ade80', marginTop:4}}>{concluidas.length}</p><p style={{fontSize:9, color:'#444'}}>R$ {concluidas.reduce((a,b)=>a+b.valor,0)}</p></div>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:14, borderRadius:12}}><p style={{fontSize:9, color:'#666'}}>AGENDADAS</p><p style={{fontSize:22, fontWeight:900, color:'#FFC300', marginTop:4}}>{agendadas.length}</p><p style={{fontSize:9, color:'#444'}}>R$ {agendadas.reduce((a,b)=>a+b.valor,0)}</p></div>
        </div>

        <div style={{padding:'0 16px', display:'flex', gap:8}}>
          <button onClick={()=>setAba('agenda')} style={{flex:1, background:aba==='agenda'?'#FFC300':'#1a1a1a', color:aba==='agenda'?'black':'#777', fontWeight:900, padding:12, borderRadius:10, border:'none', fontSize:11, cursor:'pointer'}}>AGENDADAS ({agendadas.length})</button>
          <button onClick={()=>setAba('historico')} style={{flex:1, background:aba==='historico'?'#FFC300':'#1a1a1a', color:aba==='historico'?'black':'#777', fontWeight:900, padding:12, borderRadius:10, border:'none', fontSize:11, cursor:'pointer'}}>TODAS ({corridas.length})</button>
        </div>

        <div style={{padding:16}}>
          <button onClick={()=>setShowAdd(!showAdd)} style={{width:'100%', background: showAdd?'#222':'#FFC300', color: showAdd?'#888':'black', fontWeight:900, padding:14, borderRadius:12, border:'none', cursor:'pointer'}}>{showAdd?'FECHAR':' + ADICIONAR ATENDIMENTO REAL'}</button>

          {showAdd && (
            <div style={{marginTop:12, background:'#111', border:'1px solid #FFC300', padding:14, borderRadius:12}}>
              <input value={novo.cliente} onChange={e=>setNovo({...novo, cliente:e.target.value})} placeholder="Nome cliente *" style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
                <input value={novo.telefone} onChange={e=>setNovo({...novo, telefone:e.target.value})} placeholder="WhatsApp" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
                <input value={novo.valor} onChange={e=>setNovo({...novo, valor:e.target.value})} type="number" placeholder="Valor R$ *" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
              </div>
              <select value={novo.destino} onChange={e=>setNovo({...novo, destino:e.target.value})} style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white', marginTop:8}}>
                <option>Confins CNF</option><option>Ouro Preto</option><option>Inhotim</option><option>Tiradentes</option><option>BH Centro</option><option>Outro</option>
              </select>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
                <input value={novo.data} onChange={e=>setNovo({...novo, data:e.target.value})} type="date" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
                <select value={novo.status} onChange={e=>setNovo({...novo, status:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}><option>Agendada</option><option>Concluída</option></select>
              </div>
              <button onClick={adicionar} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, borderRadius:8, border:'none', marginTop:10, cursor:'pointer'}}>SALVAR • JÁ SOMA NO FATURAMENTO</button>
              <p style={{fontSize:9, color:'#555', marginTop:8, textAlign:'center'}}>Ao concluir, o valor soma automático em Faturamento Real</p>
            </div>
          )}

          <div style={{marginTop:14, background:'#111', borderRadius:12, border:'1px solid #1a1a1a', overflow:'hidden'}}>
            {(aba==='agenda'?agendadas:corridas).map(c=>(
              <div key={c.id} style={{padding:12, borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><p style={{fontWeight:900, fontSize:13}}>{c.cliente} <span style={{fontWeight:400, color:'#666', fontSize:11}}>{c.telefone}</span></p><p style={{fontSize:11, color:'#666'}}>{c.destino} • {c.data} • R$ {c.valor}</p></div>
                <div style={{display:'flex', flexDirection:'column', gap:4, alignItems:'flex-end'}}>
                  <span style={{fontSize:8, fontWeight:900, padding:'4px 8px', borderRadius:10, background: c.status==='Concluída'?'#052e16':'#332800', color: c.status==='Concluída'?'#4ade80':'#FFC300'}}>{c.status}</span>
                  {c.status==='Agendada' && <button onClick={()=>setCorridas(corridas.map(x=>x.id===c.id?{...x, status:'Concluída'}:x))} style={{background:'#FFC300', color:'black', fontWeight:900, fontSize:9, padding:'6px 10px', borderRadius:6, border:'none', cursor:'pointer'}}>CONCLUIR E SOMAR</button>}
                  <button onClick={()=>setCorridas(corridas.filter(x=>x.id!==c.id))} style={{background:'none', border:'none', color:'#333', fontSize:9, cursor:'pointer'}}>apagar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ===== SITE CLIENTE - NUNCA É ALTERADO PELO PAINEL =====
  return(
    <div style={{background:'#050505', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.85)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px'}}>
        <h1 style={{letterSpacing:3, fontSize:16, fontWeight:900}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></h1>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 18px', fontSize:11, border:'none', borderRadius:8, cursor:'pointer'}}>RESERVAR AGORA</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#555', padding:'10px 12px', fontSize:10, borderRadius:8, cursor:'pointer'}}>ADMIN</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:28, width:'100%', maxWidth:360, border:'1px solid #222', borderRadius:16}}>
            <h3 style={{fontWeight:900, letterSpacing:1}}>ACESSO <span style={{color:'#FFC300'}}>DONO</span></h3>
            <p style={{fontSize:11, color:'#555', marginTop:4}}>Painel separado • Não afeta o site do cliente</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email dono" style={{width:'100%', background:'#151515', padding:12, marginTop:16, border:'1px solid #222', borderRadius:8, color:'white'}} />
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha privada" style={{width:'100%', background:'#151515', padding:12, marginTop:8, border:'1px solid #222', borderRadius:8, color:'white'}} />
            {erro && <p style={{color:'#ff5555', fontSize:11, marginTop:8}}>{erro}</p>}
            <button onClick={login} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:12, border:'none', borderRadius:8, cursor:'pointer'}}>ENTRAR NO PAINEL REAL</button>
            <button onClick={()=>setShowLogin(false)} style={{width:'100%', background:'transparent', color:'#444', padding:8, marginTop:6, border:'none', cursor:'pointer', fontSize:11}}>Voltar ao site</button>
          </div>
        </div>
      )}

      <div style={{padding:'100px 20px 20px', maxWidth:1100, margin:'0 auto'}}>
        <p style={{color:'#FFC300', letterSpacing:5, fontSize:9, fontWeight:700}}>COROLLA 2024 BRANCO PEROLIZADO • FROTA PRÓPRIA • EXECUTIVO REAL</p>
        <h2 style={{fontSize:'clamp(36px, 7vw, 62px)', fontWeight:900, marginTop:14, lineHeight:0.9, letterSpacing:-1}}>O SEU TEMPO<br/>MERECE <span style={{color:'#FFC300'}}>RESPEITO.</span></h2>

        <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
          <div style={{position:'relative', borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a'}}>
            <img src={FOTO_EXTERNA} style={{width:'100%', height:400, objectFit:'cover'}} alt="Corolla 2024 Branco Executivo MG" />
            <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.7)', padding:'6px 12px', borderRadius:20, fontSize:9, letterSpacing:1}}>COROLLA 2024 BRANCO • AEROPORTO • FROTA PRÓPRIA</div>
          </div>
          <div style={{position:'relative', borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a'}}>
            <img src={FOTO_INTERNA} style={{width:'100%', height:400, objectFit:'cover'}} alt="Interior Couro Bege Executivo" />
            <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.7)', padding:'6px 12px', borderRadius:20, fontSize:9, letterSpacing:1}}>COURO BEGE • ÁGUA • WIFI • PREMIUM</div>
          </div>
        </div>

        <div style={{marginTop:16, display:'flex', gap:8, flexWrap:'wrap'}}>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:'10px 16px', borderRadius:30, fontSize:10, fontWeight:700}}>✓ MOTORISTA UNIFORMIZADO</div>
          <div style={{background:'#111', border:'1px solid #1a1a1a', padding:'10px 16px', borderRadius:30, fontSize:10, fontWeight:700}}>✓ SEM TAXI • 100% EXECUTIVO</div>
          <div style={{background:'#FFC300', color:'black', padding:'10px 16px', borderRadius:30, fontSize:10, fontWeight:900}}>COROLLA 2024 XEI</div>
        </div>
      </div>

      <div style={{padding:'20px 20px 60px', textAlign:'center', borderTop:'1px solid #111', marginTop:20}}>
        <h3 style={{fontSize:28, fontWeight:900}}>VAMOS RODAR?</h3>
        <button onClick={()=>window.open('https://wa.me/5531988811362?text=Ol%C3%A1%20MG%20Executive,%20vi%20o%20Corolla%20branco%20no%20site%20e%20quero%20reservar')} style={{marginTop:16, background:'#FFC300', color:'black', fontWeight:900, padding:'16px 36px', border:'none', borderRadius:30, cursor:'pointer'}}>WHATSAPP (31) 98881-1362</button>
        <p style={{color:'#222', fontSize:9, marginTop:24, letterSpacing:3}}>MG EXECUTIVE • BH • SITE CLIENTE SEPARADO DO PAINEL DONO</p>
      </div>
    </div>
  )
}
