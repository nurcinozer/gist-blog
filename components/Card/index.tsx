import ReactMarkdown from "react-markdown"
import { Gist } from "../../hooks/useGists"
import { RightArrow } from "../Icons"

export const Card: React.FC<
  Pick<Gist, "description" | "created_at" | "comments" | "files"> & {
    rawContent: string
  }
> = ({
  files,
  rawContent,
  description,
  created_at,
}) => {

    return (
      <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-white">
            {/* <ReactMarkdown>
              {rawContent}
            </ReactMarkdown> */}
          </span>
          <span className="mt-1 text-gray-500 text-sm">{created_at}</span>
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-white title-font mb-2">{files[Object.keys(files)[0]].filename}</h2>
          <p className="leading-relaxed">{description}</p>
          <a className="text-indigo-400 inline-flex items-center mt-4">
            Learn More
            <RightArrow currentColor="#6366f1" />
          </a>
        </div>
      </div>
    )
  }