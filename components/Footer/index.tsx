import Link from "next/link"
import { LinkedinIcon, LogoIcon, TwitterIcon } from ".."

type FooterProps = {
  title: string
}

export const Footer: React.FC<FooterProps> = ({
  title,
}) => {
  return (
    <div className="flex items-center sm:flex-row flex-col">
      <Link href="/" passHref>
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <LogoIcon />
          <span className="ml-3 text-xl">{title}</span>
        </div>
      </Link>
      <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2022 GistBlog —
        <Link href="https://twitter.com/nurcinozer" passHref>
          <a href="https://twitter.com/nurcinozer" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@nurcinozer</a>
        </Link>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <Link href="https://twitter.com/nurcinozer" passHref>
          <a className="ml-3 text-gray-400">
            <TwitterIcon />
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/nurcin/" passHref>
          <a className="ml-3 text-gray-400">
            <LinkedinIcon />
          </a>
        </Link>
      </span>
    </div>
  )
}