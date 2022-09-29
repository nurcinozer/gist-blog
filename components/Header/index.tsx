import Link from "next/link"
import { Button, LogoIcon, RightArrow } from ".."

type HeaderProps = {
  title: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-wrap flex-col md:flex-row items-center pt-3 pb-12">
      <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <Link href="/" passHref>
          <a className="mr-5 hover:text-white">Home</a>
        </Link>
        <Link href="/" passHref>
          <a className="mr-5 hover:text-white">About</a>
        </Link>
        <Link href="/" passHref>
          <a className="mr-5 hover:text-white">Repos</a>
        </Link>
      </nav>
      <Link href="/" passHref>
        <div className="text-white cursor-pointer flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
          <LogoIcon />
          <span className="ml-3 text-xl">{title}</span>
        </div>
      </Link>
      <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <Button
          variant="secondary"
        >
          Open in Github
          <RightArrow />
        </Button>
      </div>
    </div>
  )
}