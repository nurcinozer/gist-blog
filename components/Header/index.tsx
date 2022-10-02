import Link from "next/link"
import { Button, LogoIcon, RightArrow, Toggle } from ".."

type HeaderProps = {
  title: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
}) => {

  return (
    <div className="dark:text-gray-400 text-gray-600 flex flex-wrap flex-col md:flex-row items-center pt-3 pb-20">
      <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <Link href="/" passHref>
          <a className="mr-5 dark:hover:text-white hover:text-gray-900">Home</a>
        </Link>
        <Link href="/about" passHref>
          <a className="mr-5 dark:hover:text-white hover:text-gray-900">About</a>
        </Link>
        <Link href="/repos" passHref>
          <a className="mr-5 dark:hover:text-white hover:text-gray-900">My repos</a>
        </Link>
        <Link href="/how-to-use" passHref>
          <a className="mr-5 dark:hover:text-white hover:text-gray-900">How to use?</a>
        </Link>
      </nav>
      <Link href="/" passHref>
        <div className="text-gray-900 dark:text-white cursor-pointer flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
          <LogoIcon />
          <span className="ml-3 text-xl">{title}</span>
        </div>
      </Link>
      <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 items-center">
        <Button
          variant="secondary"
          onClick={() => window.open("https://github.com/nurcinozer/gist-blog", "_blank")}
        >
          Open in Github
          <RightArrow />
        </Button>
        <Toggle />
      </div>
    </div>
  )
}