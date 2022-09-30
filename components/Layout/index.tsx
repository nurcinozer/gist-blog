import { Footer, Header, Meta } from ".."

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Meta />
      <section className="body-font">
        <div className="container p-5 mx-auto">
          <Header
            title={title}
          />
          {children}
          <Footer title={title} />
        </div>
      </section>
    </>
  )
}