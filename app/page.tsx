// app/page.tsx - MG EXECUTIVE COMPLETO + ADMIN
// Login admin: dioguin01267@gmail.com / senha: dioguin012!
'use client'
import { useState } from 'react'

function Site(){
  return (
    <main className="bg-[#0a0a0a] text-white">
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 bg-black">
        <h1 className="text-xl tracking-[0.3em]">MG <span className="text-[#FFC300] font-black">EXECUTIVE</span></h1>
        <h2 className="text-4xl md:text-7xl font-black mt-10 leading-[0.9]">PRECISÃO E<br/><span className="text-[#FFC300]">EXCLUSIVIDADE</span> EM<br/>CADA TRAJETO.</h2>
        <p className="text-gray-400 mt-6 max-w-xl">Transporte executivo premium em Belo Horizonte. Corolla 2024, SUVs premium, atendimento 24h.</p>
        <div className="flex gap-4 mt-8"><a href="#frota" className="bg-[#FFC300] text-black px-8 py-4 font-black">CONHECER A FROTA</a><a href="#reserva" className="border border-[#FFC300] px-8 py-4 text-[#FFC300]">RESERVAR</a></div>
      </section>

      <section className="px-8 md:px-20 py-20">
        <h3 className="text-3xl font-bold">Soluções sob medida</h3>
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {[
            {t:"Transfer Aeroporto",d:"Confins CNF, Pampulha PLU, Guarulhos GRU"},
            {t:"Corporativo",d:"Executivos e empresas com pontualidade"},
            {t:"Eventos & Cerimônias",d:"Casamentos, formaturas, elegância total"},
            {t:"City Tour Executivo",d:"Ouro Preto, Tiradentes, Inhotim, Congonhas"},
          ].map(x=> <div key={x.t} className="bg-[#151515] border border-[#222] p-6"><h4 className="text-[#FFC300] font-bold">{x.t}</h4><p className="text-sm text-gray-400 mt-2">{x.d}</p></div>)}
        </div>
      </section>

      <section id="frota" className="px-8 md:px-20 py-20 bg-[#0f0f0f]">
        <h3 className="text-3xl font-bold">Veículos selecionados para o seu padrão</h3>
        <div className="mt-10 bg-[#151515] border border-[#222] p-8 md:flex items-center">
          <div className="flex-1">
            <span className="bg-[#FFC300] text-black text-xs font-bold px-3 py-1">MAIS RESERVADO - COROLLA 2024</span>
            <h4 className="text-2xl font-bold mt-4">Sedan Premium - Corolla 2024 Preto</h4>
            <p className="text-gray-400 mt-3">Bancos em couro, ar digital, Wi-Fi a bordo, água mineral, motorista uniformizado. O padrão que você merece.</p>
            <ul className="mt-4 text-sm text-gray-300 space-y-1"><li>• 3 passageiros</li><li>• 2 malas grandes + 2 pequenas</li><li>• Motorista bilíngue</li><li>• Rastreamento em tempo real</li></ul>
          </div>
          <div className="flex-1 mt-6 md:mt-0 md:ml-10 bg-[#1a1a1a] h-64 flex items-center justify-center border border-[#333]">FOTO COROLLA 2024 AQUI</div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-20">
        <h3 className="text-3xl font-bold">Para onde você precisa ir</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {["Aeroporto Confins (CNF)","Pampulha (PLU)","Guarulhos (GRU)","Ouro Preto","Tiradentes","Inhotim - Brumadinho","Congonhas","Mariana","Diamantina"].map(d=> <div key={d} className="bg-[#151515] border border-[#222] h-32 flex items-end p-4 hover:border-[#FFC300] cursor-pointer"><span className="font-bold text-sm">{d}</span></div>)}
        </div>
      </section>

      <section id="reserva" className="px-8 md:px-20 py-20 bg-[#0f0f0f]">
        <h3 className="text-3xl font-bold text-[#FFC300]">Solicite sua reserva</h3>
        <form onSubmit={e=>{e.preventDefault(); window.open(`https://wa.me/5531999999999?text=Olá! Quero reservar pela MG Executive`,'_blank')}} className="grid md:grid-cols-2 gap-4 mt-8 max-w-4xl">
          <input required placeholder="Nome completo" className="bg-[#1a1a1a] border border-[#333] p-4 md:col-span-2" />
          <input required placeholder="WhatsApp" className="bg-[#1a1a1a] border border-[#333] p-4" />
          <input required type="datetime-local" className="bg-[#1a1a1a] border border-[#333] p-4" />
          <input required placeholder="Origem" className="bg-[#1a1a1a] border border-[#333] p-4" />
          <input required placeholder="Destino" className="bg-[#1a1a1a] border border-[#333] p-4" />
          <textarea placeholder="Detalhes" className="bg-[#1a1a1a] border border-[#333] p-4 md:col-span-2 h-24"></textarea>
          <button className="bg-[#FFC300] text-black font-black p-4 md:col-span-2">SOLICITAR AGORA VIA WHATSAPP</button>
        </form>
      </section>

      <footer className="px-8 md:px-20 py-10 border-t border-[#222] flex justify-between text-sm text-gray-500"><span>MG Executive © 2026</span><a href="?admin=1" className="text-[#FFC300]">Admin</a></footer>
    </main>
  )
}

function Admin({onSair}:{onSair:()=>void}){
  const [reservas] = useState([{id:1, cliente:"João Silva", origem:"Savassi", destino:"Confins CNF", data:"04/10/2026", status:"Pendente"}])
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="flex justify-between"><h1 className="text-3xl font-black text-[#FFC300]">PAINEL ADMIN - MG EXECUTIVE</h1><button onClick={onSair} className="border border-[#333] px-6 py-2">Sair</button></div>
      <div className="mt-10 grid md:grid-cols-3 gap-4"><div className="bg-[#151515] p-6 border border-[#222]"><p className="text-gray-400 text-sm">Reservas hoje</p><p className="text-3xl font-bold text-[#FFC300]">1</p></div><div className="bg-[#151515] p-6 border border-[#222]"><p className="text-gray-400 text-sm">Faturamento mês</p><p className="text-3xl font-bold">R$ 2.450</p></div><div className="bg-[#151515] p-6 border border-[#222]"><p className="text-gray-400 text-sm">Clientes</p><p className="text-3xl font-bold">12</p></div></div>
      <div className="mt-8 bg-[#151515] border border-[#222] p-6"><h2 className="font-bold">Reservas</h2>{reservas.map(r=> <div key={r.id} className="mt-4 bg-[#1a1a1a] p-4 flex justify-between border border-[#222]"><span>{r.cliente} | {r.origem} → {r.destino} | {r.data}</span><span className="bg-yellow-500/20 text-[#FFC300] px-3 py-1 text-xs">{r.status}</span></div>)}</div>
    </div>
  )
}

export default function Home(){
  const [view, setView] = useState<'site'|'login'|'admin'>('site')
  const [email,setEmail]=useState('')
  const [senha,setSenha]=useState('')

  if(view==='login'){
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#151515] border border-[#222] p-8 w-full max-w-sm">
          <h1 className="text-[#FFC300] text-2xl font-black">MG EXECUTIVE<br/><span className="text-white text-sm font-normal">Painel Administrativo</span></h1>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="dioguin01267@gmail.com" className="w-full bg-[#222] border border-[#333] p-3 mt-6 mb-3 text-white" />
          <input value={senha} onChange={e=>setSenha(e.target.value)} type="password" placeholder="Senha" className="w-full bg-[#222] border border-[#333] p-3 mb-6 text-white" />
          <button onClick={()=>{ if(email==='dioguin01267@gmail.com' && senha==='dioguin012!'){ setView('admin') } else alert('Login inválido! Use dioguin01267@gmail.com / dioguin012!') }} className="w-full bg-[#FFC300] text-black font-black p-3">ENTRAR</button>
          <button onClick={()=>setView('site')} className="w-full mt-3 text-gray-500 text-sm">Voltar ao site</button>
        </div>
      </div>
    )
  }
  if(view==='admin') return <Admin onSair={()=>setView('site')} />

  return (
    <>
      <style>{`@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'); body{margin:0; background:#0a0a0a}`}</style>
      <div className="fixed top-4 right-4 z-50"><button onClick={()=>setView('login')} className="bg-[#FFC300] text-black text-xs font-bold px-4 py-2">ADMIN</button></div>
      <Site />
    </>
  )
}
