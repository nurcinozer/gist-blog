import { Header, Meta } from ".."

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <section className="body-font">
        <div className="container p-5 mx-auto">
          <Header
            title="Github based blog"
          />
          {children}
        </div>
      </section>
    </>
  )
}