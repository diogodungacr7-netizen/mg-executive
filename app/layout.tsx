export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{margin:0, background:'#0a0a0a'}}>{children}</body>
    </html>
  )
}
