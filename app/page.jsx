'use client'
import { useState, useEffect } from 'react'

const DESTINOS_MG = [
  { nome:'AEROPORTO CONFINS CNF', tempo:'40 MIN • MAIS PEDIDO', desc:'Monitoramento de voo • Embarque e desembarque', img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 180'},
  { nome:'OURO PRETO', tempo:'1H30 • HISTÓRICO', desc:'Centro histórico • Igrejas barrocas', img:'https://images.unsplash.com/photo-1593995863951-57ccab18cdba?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 450'},
  { nome:'INHOTIM', tempo:'1H10 • CULTURA', desc:'Maior museu a céu aberto do mundo', img:'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 380'},
  { nome:'TIRADENTES', tempo:'3H • CHARME', desc:'Gastronomia e arquitetura colonial', img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 750'},
  { nome:'CAPITÓLIO', tempo:'4H30 • AVENTURA', desc:'Canyons e Lago de Furnas', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 900'},
  { nome:'SERRA DO CIPÓ', tempo:'1H30 • NATUREZA', desc:'Cachoeiras e trilhas', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop', preco:'A partir de R$ 400'},
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
  const [novo, setNovo] = useState({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada', obs:''})

  useEffect(()=>{ const s=localStorage.getItem('mg_final_v6'); if(s) setCorridas(JSON.parse(s)) },[])
  useEffect(()=>{ localStorage.setItem('mg_final_v6', JSON.stringify(corridas)) }, [corridas])

  const login = () => {
    const e=email.toLowerCase().trim()
    if((e==='dioguin01267@gmail.com'||e==='diogodungacr7@gmail.com')&&senha.trim()==='dioguin012!'){ setIsAdmin(true); setShowLogin(false); setErro('') }
    else setErro('Acesso negado!')
  }

  const salvar = () => {
    if(!novo.cliente||!novo.valor) return alert('Nome e valor obrigatório!')
    if(editando){
      setCorridas(corridas.map(c=>c.id===editando?{...c,...novo, valor:Number(novo.valor)}:c))
      setEditando(null)
    }else{
      setCorridas([{id:Date.now(),...novo, valor:Number(novo.valor)},...corridas])
    }
    setNovo({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada', obs:''}); setShowAdd(false)
  }

  const iniciarEdicao = (c) => { setNovo(c); setEditando(c.id); setShowAdd(true) }

  const total = corridas.reduce((a,b)=>a+b.valor,0)
  const agendadas = corridas.filter(c=>c.status==='Agendada')

  if(isAdmin){
    return(
      <div style={{background:'#080808', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:16}}>
        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #1a1a1a', paddingBottom:12, alignItems:'center'}}>
          <div><b>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></b><p style={{fontSize:9, color:'#555'}}>PAINEL DONO • EDITÁVEL • SALVA AUTOMÁTICO</p></div>
          <button onClick={()=>setIsAdmin(false)} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'10px 16px', borderRadius:8, border:'none', cursor:'pointer', fontSize:11}}>SITE CLIENTE</button>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16}}>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>FATURAMENTO REAL</p><p style={{fontSize:20, fontWeight:900, color:'#FFC300'}}>R$ {total}</p><p style={{fontSize:8, color:'#444'}}>{corridas.length} corridas</p></div>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>AGENDADAS</p><p style={{fontSize:20, fontWeight:900}}>{agendadas.length}</p><p style={{fontSize:8, color:'#444'}}>R$ {agendadas.reduce((a,b)=>a+b.valor,0)}</p></div>
          <div style={{background:'#111', padding:14, borderRadius:12, border:'1px solid #1a1a1a'}}><p style={{fontSize:9, color:'#666'}}>CONCLUÍDAS</p><p style={{fontSize:20, fontWeight:900, color:'#4ade80'}}>{corridas.filter(c=>c.status==='Concluída').length}</p></div>
        </div>

        <button onClick={()=>{setShowAdd(!showAdd); setEditando(null); setNovo({cliente:'', telefone:'', destino:'Confins CNF', data:'', valor:'', status:'Agendada', obs:''})}} style={{width:'100%', marginTop:14, background:showAdd?'#222':'#FFC300', color:showAdd?'#888':'black', fontWeight:900, padding:14, borderRadius:12, border:'none', cursor:'pointer'}}>{showAdd?'FECHAR':' + NOVO ATENDIMENTO'}</button>

        {showAdd && (
          <div style={{background:'#111', border:'1px solid #FFC300', padding:14, borderRadius:12, marginTop:10}}>
            <p style={{fontWeight:900, fontSize:12, color:'#FFC300', marginBottom:8}}>{editando?'EDITAR ATENDIMENTO':'NOVO ATENDIMENTO REAL'}</p>
            <input value={novo.cliente} onChange={e=>setNovo({...novo, cliente:e.target.value})} placeholder="Nome cliente *" style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <input value={novo.telefone} onChange={e=>setNovo({...novo, telefone:e.target.value})} placeholder="WhatsApp (31) 9..." style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
              <input value={novo.valor} onChange={e=>setNovo({...novo, valor:e.target.value})} type="number" placeholder="Valor R$ *" style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8}}>
              <select value={novo.destino} onChange={e=>setNovo({...novo, destino:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}>{DESTINOS_MG.map(d=><option key={d.nome}>{d.nome}</option>)}<option>Outro</option></select>
              <input type="date" value={novo.data} onChange={e=>setNovo({...novo, data:e.target.value})} style={{background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white'}}/>
            </div>
            <select value={novo.status} onChange={e=>setNovo({...novo, status:e.target.value})} style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white', marginTop:8}}><option>Agendada</option><option>Concluída</option><option>Cancelada</option></select>
            <input value={novo.obs} onChange={e=>setNovo({...novo, obs:e.target.value})} placeholder="Observação (ex: voo LA 4672)" style={{width:'100%', background:'#000', border:'1px solid #222', padding:12, borderRadius:8, color:'white', marginTop:8}}/>
            <button onClick={salvar} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, borderRadius:8, border:'none', marginTop:10, cursor:'pointer'}}>{editando?'SALVAR EDIÇÃO':'SALVAR E SOMAR NO FATURAMENTO'}</button>
          </div>
        )}

        <div style={{marginTop:14, background:'#111', borderRadius:12, border:'1px solid #1a1a1a', overflow:'hidden'}}>
          {corridas.map(c=>(
            <div key={c.id} style={{padding:12, borderBottom:'1px solid #1a1a1a', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{flex:1}}><p style={{fontWeight:900, fontSize:13}}>{c.cliente} <span style={{color:'#666', fontWeight:400, fontSize:11}}>{c.telefone}</span></p><p style={{fontSize:11, color:'#666'}}>{c.destino} • {c.data} • R$ {c.valor} {c.obs?`• ${c.obs}`:''}</p></div>
              <div style={{display:'flex', flexDirection:'column', gap:4, marginLeft:10}}>
                <span style={{fontSize:8, fontWeight:900, padding:'4px 8px', borderRadius:10, textAlign:'center', background: c.status==='Concluída'?'#052e16': c.status==='Agendada'?'#332800':'#2a0a0a', color: c.status==='Concluída'?'#4ade80': c.status==='Agendada'?'#FFC300':'#ff5555'}}>{c.status}</span>
                {c.status==='Agendada'&&<button onClick={()=>setCorridas(corridas.map(x=>x.id===c.id?{...x,status:'Concluída'}:x))} style={{background:'#FFC300', color:'black', fontWeight:900, fontSize:8, padding:'5px 8px', borderRadius:6, border:'none', cursor:'pointer'}}>CONCLUIR</button>}
                <button onClick={()=>iniciarEdicao(c)} style={{background:'#1a1a1a', color:'#888', fontSize:8, padding:'5px 8px', borderRadius:6, border:'1px solid #222', cursor:'pointer'}}>EDITAR</button>
                <button onClick={()=>setCorridas(corridas.filter(x=>x.id!==c.id))} style={{background:'none', border:'none', color:'#333', fontSize:8, cursor:'pointer'}}>EXCLUIR</button>
              </div>
            </div>
          ))}
          {corridas.length===0&&<p style={{padding:20, textAlign:'center', color:'#444', fontSize:12}}>Nenhum atendimento ainda. Clique em + NOVO ATENDIMENTO</p>}
        </div>
      </div>
    )
  }

  return(
    <div style={{background:'#050505', color:'white', fontFamily:'sans-serif'}}>
      <header style={{position:'fixed', top:0, width:'100%', background:'rgba(5,5,5,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid #1a1a1a', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px'}}>
        <b style={{letterSpacing:3, fontSize:15}}>MG <span style={{color:'#FFC300'}}>EXECUTIVE</span></b>
        <div style={{display:'flex', gap:8}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362?text=Ol%C3%A1%20MG%20Executive,%20quero%20agendar%20uma%20corrida')} style={{background:'#FFC300', color:'black', fontWeight:900, padding:'11px 18px', fontSize:11, border:'none', borderRadius:30, cursor:'pointer'}}>AGENDAR CORRIDA</button>
          <button onClick={()=>setShowLogin(true)} style={{background:'#111', border:'1px solid #222', color:'#555', padding:'10px 12px', fontSize:10, borderRadius:8, cursor:'pointer'}}>ADMIN</button>
        </div>
      </header>

      {showLogin && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'#0f0f0f', padding:28, width:'100%', maxWidth:360, border:'1px solid #222', borderRadius:16}}>
            <b>ACESSO <span style={{color:'#FFC300'}}>DONO</span></b><p style={{fontSize:10, color:'#555', marginTop:4}}>Painel separado • Não altera site cliente</p>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email dono" style={{width:'100%', background:'#151515', padding:12, marginTop:14, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" style={{width:'100%', background:'#151515', padding:12, marginTop:8, border:'1px solid #222', borderRadius:8, color:'white'}}/>
            {erro&&<p style={{color:'#f55', fontSize:11, marginTop:8}}>{erro}</p>}
            <button onClick={login} style={{width:'100%', background:'#FFC300', color:'black', fontWeight:900, padding:12, marginTop:12, border:'none', borderRadius:8, cursor:'pointer'}}>ENTRAR NO PAINEL</button>
          </div>
        </div>
      )}

      <div style={{padding:'90px 20px 24px', maxWidth:1200, margin:'0 auto'}}>
        <p style={{color:'#FFC300', letterSpacing:5, fontSize:9, fontWeight:700}}>FROTA EXECUTIVA • COROLLA 2024 • SEM TÁXI • 100% PARTICULAR</p>
        <h1 style={{fontSize:'clamp(36px, 7vw, 64px)', fontWeight:900, lineHeight:0.9, marginTop:14, letterSpacing:-1}}>TRANSFER EXECUTIVO<br/>EM <span style={{color:'#FFC300'}}>MINAS GERAIS.</span></h1>

        <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
          <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
            <img src="/corolla-branco-aeroporto.jpg" onError={e=>e.target.src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop'} style={{width:'100%', height:420, objectFit:'cover'}} alt="Corolla Branco Executivo Aeroporto"/>
            <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.75)', padding:'6px 12px', borderRadius:20, fontSize:9, fontWeight:900, letterSpacing:1}}>COROLLA BRANCO 2024 • AEROPORTO CONFINS</div>
          </div>
          <div style={{display:'grid', gridTemplateRows:'1fr 1fr', gap:12}}>
            <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
              <img src="/corolla-branco.jpg" onError={e=>e.target.src='https://images.unsplash.com/photo-1623869675781-80b90a8d2d8e?q=80&w=800&auto=format&fit=crop'} style={{width:'100%', height:204, objectFit:'cover'}} alt="Seu Corolla Branco"/>
              <div style={{position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.75)', padding:'4px 10px', borderRadius:20, fontSize:8, fontWeight:700}}>FROTA PRÓPRIA • SEU CARRO REAL</div>
            </div>
            <div style={{borderRadius:16, overflow:'hidden', border:'1px solid #1a1a1a', position:'relative'}}>
              <img src="/corolla-preto.jpg" onError={e=>e.target.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop'} style={{width:'100%', height:204, objectFit:'cover'}} alt="Corolla Preto Executivo"/>
              <div style={{position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.75)', padding:'4px 10px', borderRadius:20, fontSize:8, fontWeight:700}}>EXECUTIVO NOTURNO • DISCRETO</div>
            </div>
          </div>
        </div>

        <div style={{marginTop:14, display:'flex', gap:8, flexWrap:'wrap'}}>
          <span style={{background:'#111', border:'1px solid #1a1a1a', padding:'9px 16px', borderRadius:30, fontSize:10, fontWeight:700}}>✓ COURO BEGE • ÁGUA • WIFI</span>
          <span style={{background:'#111', border:'1px solid #1a1a1a', padding:'9px 16px', borderRadius:30, fontSize:10, fontWeight:700}}>✓ MOTORISTA UNIFORMIZADO</span>
          <span style={{background:'#FFC300', color:'black', padding:'9px 16px', borderRadius:30, fontSize:10, fontWeight:900}}>✓ SEM TAXI • 100% EXECUTIVO</span>
        </div>
      </div>

      <div style={{padding:'20px 20px 10px', maxWidth:1200, margin:'0 auto'}}>
        <h2 style={{fontSize:26, fontWeight:900}}>DESTINOS <span style={{color:'#FFC300'}}>MAIS PEDIDOS EM MG</span></h2>
        <p style={{color:'#555', fontSize:12, marginTop:6}}>Toque para agendar no WhatsApp • Fotos reais dos destinos</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:12, marginTop:16}}>
          {DESTINOS_MG.map(d=>(
            <div key={d.nome} onClick={()=>window.open(`https://wa.me/5531988811362?text=Quero%20agendar%20para%20${encodeURIComponent(d.nome)}%20-%20${d.preco}`)} style={{background:'#0a0a0a', border:'1px solid #1a1a1a', borderRadius:14, overflow:'hidden', cursor:'pointer'}}>
              <img src={d.img} style={{width:'100%', height:180, objectFit:'cover'}} alt={d.nome}/>
              <div style={{padding:14}}>
                <p style={{color:'#FFC300', fontSize:9, letterSpacing:1, fontWeight:700}}>{d.tempo}</p>
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
        <h2 style={{fontSize:32, fontWeight:900, letterSpacing:-1}}>PRONTO PARA RODAR?</h2>
        <p style={{marginTop:8, fontSize:13, fontWeight:600, opacity:0.8}}>Atendimento direto com o dono • Sem intermediário • Resposta em 2 minutos</p>
        <div style={{marginTop:18, display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap'}}>
          <button onClick={()=>window.open('https://wa.me/5531988811362')} style={{background:'black', color:'white', fontWeight:900, padding:'16px 32px', borderRadius:30, border:'none', cursor:'pointer', fontSize:13}}>WHATSAPP (31) 98881-1362</button>
          <button onClick={()=>window.open('tel:+5531988811362')} style={{background:'white', color:'black', fontWeight:900, padding:'16px 32px', borderRadius:30, border:'1px solid black', cursor:'pointer', fontSize:13}}>LIGAR AGORA</button>
        </div>
        <p style={{marginTop:14, fontSize:10, fontWeight:700, letterSpacing:2, opacity:0.6}}>MG EXECUTIVE • BELO HORIZONTE • MINAS GERAIS • 24H</p>
      </div>
    </div>
  )
}
