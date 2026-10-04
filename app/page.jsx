'use client'
import { useState, useEffect } from 'react'

const FOTO_BRACO_AEROPORTO = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
const FOTO_PRETO_EXEC = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop"
const FOTO_INTERIOR = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop"

const DESTINOS = [
  { nome:'AEROPORTO CONFINS CNF', tempo:'40 MIN', desc:'Monitoramento de voo', img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 180'},
  { nome:'OURO PRETO', tempo:'1H30', desc:'Centro histórico MG', img:'https://images.unsplash.com/photo-1593995863951-57ccab18cdba?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 450'},
  { nome:'INHOTIM', tempo:'1H10', desc:'Museu a céu aberto', img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 380'},
  { nome:'TIRADENTES', tempo:'3H', desc:'Gastronomia colonial', img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 750'},
  { nome:'CAPITÓLIO', tempo:'4H30', desc:'Canyons e Furnas', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 900'},
  { nome:'SERRA DO CIPÓ', tempo:'1H30', desc:'Cachoeiras', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 400'},
]

export default function Home(){
  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [corridas, setCorridas] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editando, setEditando] = useState(null)
  const [novo, setNovo] = useState({cliente:'', telefone:'', destino:'AEROPORTO CONFINS CNF', data:'', valor:'', status:'Agendada', obs:''})

  useEffect(()=>{ const s=localStorage.getItem('mg_final_auto'); if(s) setCorridas(JSON.parse(s)) },[])
  useEffect(()=>{ localStorage.setItem('mg_final_auto', JSON.stringify(corridas)) }, [corridas])

  const login = () => {
    const e=email.toLowerCase().trim()
    if((e==='dioguin01267@gmail.com'||e==='diogodungacr7@gmail.com')&&senha.trim()==='dioguin012!'){ setIsAdmin(true); setShowLogin(false) }
    else setErro('Negado!')
  }
  const salvar = () => {
    if(!novo.cliente||!novo.valor) return alert('Nome e valor!')
    if(editando){ setCorridas(corridas.map(c=>c.id===editando?{...c,...novo, valor:Number(novo.valor)}:c)); setEditando(null) }
    else{ setCorridas([{id:Date.now(),...novo, valor:Number(novo.valor)},...corridas]) }
    setNovo({cliente:'', telefone:'', destino:'AEROPORTO CONFINS CNF', data:'', valor:'', status:'Agendada', obs:''}); setShowAdd(false)
  }

  const total = corridas.reduce((a,b)=>a+b.valor,0)
  const agendadas = corridas.filter(c=>c.status==='Agendada')

  if(isAdmin){
    return(
      <div style={{background:'#080808', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:16}}>
        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1a1a1a', paddingBottom:12}}>
          <b>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span> • PAINEL EDITÁVEL</b>
          <button onClick={()=>setIsAdmin(false)} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 16px', borderRadius:8, border:'none', cursor:'pointer', fontSize:11}}>SITE CLIENTE</button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16}}>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>FATURAMENTO</p><p style={{fontSize:20, fontWeight:900, color:'#FFC300'}}>R$ {total}</p></div>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>AGENDADAS</p><p style={{fontSize:20, fontWeight:900}}>{agendadas.length}</p></div>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>CONCLUÍDAS</p><p style={{fontSize:20, fontWeight:900, color:'#4ade80'}}>{corridas.filter(c=>c.status==='Concluída').length}</p></div>
        </div>
        <button onClick={()=>{setShowAdd(!showAdd); setEditando(null)}} style={{width:'100%', marginTop:14, background:showAdd?'#222':'#FFC300', color:showAdd?'#888':'black', fontWeight:900, padding:14, borderRadius:12, border:'none', cursor:'pointer'}}>{showAdd?'FECHAR':'+ NOVO ATENDIMENTO'}</button>
        {showAdd && (
          <div style={{background:'#111', border:'1px solid #FFC300', padding:14, borderRadius:12, marginTop:10}}>
            <input value={novo.cliente} onChange={e=>setNovo({...novo, cliente:e.target.value})} placeholder="Nome cliente *" style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <input value={novo.telefone} onChange={e=>setNovo({...novo, telefone:e.target.value})} placeholder="WhatsApp" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
              <input value={novo.valor} onChange={e=>setNovo({...novo, valor:e.target.value})} type="number" placeholder="Valor R$ *" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <select value={novo.destino} onChange={e=>setNovo({...novo, destino:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}>{DESTINOS.map(d=><option key={d.nome}>{d.nome}</option>)}</select>
              <input type="date" value={novo.data} onChange={e=>setNovo({...novo, data:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            </div>
            <select value={novo.status} onChange={e=>setNovo({...novo, status:e.target.value})} style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white', marginTop:8}}><option>Agendada</option><option>Concluída</option><option>Cancelada</option></select>
            <input value={novo.obs} onChange={e=>setNovo({...novo, obs:e.target.value})} placeholder="Obs: voo, horário..." style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white', marginTop:8}}/>
            <button onClick={salvar} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, borderRadius:8, border:'none', marginTop:10, cursor:'pointer'}}>{editando?'SALVAR EDIÇÃO':'SALVAR E SOMAR'}</button>
          </div>
        )}
        <div style={{marginTop:14, background:'#111', borderRadius:12, border:'1px solid #1a1a1a'}}>
          {corridas.map(c=>(
            <div key={c.id} style={{padding:12, borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between'}}>
              <div><b style={{fontSize:13}}>{c.cliente}</b><p style={{fontSize:11, color:'#666'}}>{c.destino} • R$ {c.valor} • {c.data}</p></div>
              <div style={{display:'flex', flexDirection:'column', gap:4}}>
                <span style={{fontSize:8, fontWeight:900, padding:'4px 8px', borderRadius:10, textAlign:'center', background: c.status==='Concluída'?'#052e16':'#332800', color: c.status==='Concluída'?'#4ade80':'#FFC300'}}>{c.status}</span>
                <button onClick={()=>{setNovo(c); setEditando(c.id); setShowAdd(true)}} style={{background:'#1a1a1a', color:'#888', fontSize:8, padding:'5px 8px', borderRadius:6, border:'1px solid #222', cursor:'pointer'}}>EDITAR</button>
                {c.status==='Agendada'&&<button onClick={()=>setCorridas(corridas.map(x=>x.id===c.id?{...x,status:'Concluída'}:x))} style={{background:'#FFC300', color:'black', fontWeight:900, fontSize:8, padding:'5px 8px', borderRadius:6, border:'none', cursor:'pointer'}}>CONCLUIR</button>}
                <button onClick={()=>setCorridas(corridas.filter(x=>x.id!==c.id))} style={{background:'none', border:'none', color:'#333', fontSize:8, cursor:'pointer'}}>EXCLUIR</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return(
    <div style={{background:'#050505', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px'}}>
        <b style={{letterSpacing:3, fontSize:15}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></b>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362?text=Quero%20agendar%20corrida%20executiva')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'11px 18px', fontSize:11, border:'none', borderRadius:30, cursor:'pointer'}}>AGENDAR CORRIDA</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#555', padding:'10px 12px', fontSize:10, borderRadius:8, cursor:'pointer'}}>ADMIN</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:28, width:'100%', maxWidth:360, border:'1px solid #222', borderRadius:16}}>
            <b>ACESSO <span style={{color:'#FFC300'}}>DONO</span></b>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" style={{width:'100%', background:'#151515', padding:12, marginTop:14, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" style={{width:'100%', background:'#151515', padding:12, marginTop:8, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            {erro&&<p style={{color:'#f55', fontSize:11, marginTop:8}}>{erro}</p>}
            <button onClick={login} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:12, border:'none', borderRadius:8, cursor:'pointer'}}>ENTRAR</button>
          </div>
        </div>
      )}

      <div style={{padding:'90px 20px 24px', maxWidth:1200, margin:'0 auto'}}>
        <p style={{color:'#FFC300', letterSpacing:5, fontSize:9, fontWeight:700}}>EXECUTIVO PREMIUM • SEM TÁXI • FROTA PRÓPRIA • BH • MG</p>
        <h1 style={{fontSize:'clamp(36px, 7vw, 64px)', fontWeight:900, lineHeight:0.9, marginTop:14}}>TRANSFER EXECUTIVO<br/>EM <span style={{color:'#FFC300'}}>MINAS GERAIS.</span></h1>

        <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
          <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
            <img src={FOTO_BRACO_AEROPORTO} style={{width:'100%', height:420, objectFit:'cover'}} alt="Sedan Executivo Branco"/>
            <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.75)', padding:'6px 12px', borderRadius:20, fontSize:9, fontWeight:900}}>SEDAN EXECUTIVO BRANCO • AEROPORTO</div>
          </div>
          <div style={{display:'grid', gridTemplateRows:'1fr 1fr', gap:12}}>
            <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
              <img src={FOTO_PRETO_EXEC} style={{width:'100%', height:204, objectFit:'cover'}} alt="Sedan Preto Executivo"/>
              <div style={{position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.75)', padding:'4px 10px', borderRadius:20, fontSize:8, fontWeight:700}}>SEDAN PRETO • NOTURNO • DISCRETO</div>
            </div>
            <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
              <img src={FOTO_INTERIOR} style={{width:'100%', height:204, objectFit:'cover'}} alt="Interior Executivo"/>
              <div style={{position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.75)', padding:'4px 10px', borderRadius:20, fontSize:8, fontWeight:700}}>INTERIOR PREMIUM • COURO • CONFORTO</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'20px', maxWidth:1200, margin:'0 auto'}}>
        <h2 style={{fontSize:26, fontWeight:900}}>DESTINOS <span style={{color:'#FFC300'}}>POPULARES EM MG</span></h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:12, marginTop:16}}>
          {DESTINOS.map(d=>(
            <div key={d.nome} onClick={()=>window.open(`https://wa.me/5531988811362?text=Quero%20agendar%20para%20${encodeURIComponent(d.nome)}`)} style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:14, overflow:'hidden', cursor:'pointer'}}>
              <img src={d.img} style={{width:'100%', height:180, objectFit:'cover'}} alt={d.nome}/>
              <div style={{padding:14}}>
                <p style={{color:'#FFC300', fontSize:9, fontWeight:700}}>{d.tempo}</p>
                <p style={{fontWeight:900, fontSize:16, marginTop:4}}>{d.nome}</p>
                <p style={{color:'#666', fontSize:11, marginTop:4}}>{d.desc}</p>
                <div style={{marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{color:'#FFC300', fontWeight:900, fontSize:12}}>{d.preco}</span>
                  <span style={{background:'#FFC300', color:'black', fontWeight:900, fontSize:10, padding:'6px 12px', borderRadius:20}}>AGENDAR →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:30, background:'#FFC300', color:'black', padding:'40px 20px', textAlign:'center'}}>
        <h2 style={{fontSize:32, fontWeight:900}}>AGENDE SUA CORRIDA</h2>
        <p style={{marginTop:8, fontSize:13, fontWeight:600}}>Atendimento direto com o dono • Resposta em 2 minutos</p>
        <div style={{marginTop:18, display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap'}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'black', color:'white', fontWeight:900, padding:'16px 32px', borderRadius:30, border:'none', cursor:'pointer', fontSize:13}}>WHATSAPP (31) 98881-1362</button>
          <button onClick={()=>window.open('tel:+5531988811362')} style={{background:'white', color:'black', fontWeight:900, padding:'16px 32px', borderRadius:30, border:'1px solid black', cursor:'pointer', fontSize:13}}>LIGAR (31) 98881-1362</button>
        </div>
      </div>
    </div>
  )
}
