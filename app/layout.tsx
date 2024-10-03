const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <header className="header">
      <h1>Carmen Cruzado Portfolio</h1>
    </header>
    <main>{children}</main>
    <footer className="footer">© 2024 Carmen Cruzado</footer>
  </div>
)

export default Layout

