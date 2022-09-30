import { RightArrow } from "../Icons"
import matter from "gray-matter"
import Link from "next/link"
import { convertDate, fetchRawUrl, getFileNameWithoutExtension, readingTime } from "../../utils/functions"
import { Gist } from "../../utils/services"
import { CommentIcon } from "../Icons/CommentIcon"
import md from 'markdown-it';
import { useState, useEffect, useMemo } from "react"

type DataProps = {
  title?: string
  category?: string
  date?: string
}

const Card: React.FC<
  Pick<Gist, "description" | "created_at" | "files"> & {
    rawUrl: string
  }
> = ({
  files,
  rawUrl,
  description,
  created_at,
}) => {
    const [rawContent, setRawContent] = useState('');

    useMemo(() => {
      fetchRawUrl(rawUrl).then((rawContent) => {
        setRawContent(rawContent)
      })
    }, [rawUrl])

    const { data } = matter(rawContent);

    const { title, category, date } = data as DataProps;

    const fileName = getFileNameWithoutExtension(files[Object.keys(files)[0]].filename);

    return (
      <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-white">
            {category?.toUpperCase() || "NO CATEGORY"}
          </span>
          <span className="mt-1 text-gray-500 text-sm">{convertDate(created_at) || date}</span>
        </div>
        <div className="md:flex-grow">
          <Link href={`/blog/${fileName}`}>
            <a className="text-2xl font-medium text-white title-font">{title || "No title"}</a>
          </Link>
          <p className="leading-relaxed mt-2">{description}</p>
          <Link href={`/blog/${fileName}`}>
            <a className="text-indigo-400 inline-flex items-center mt-4">
              Learn More
              <RightArrow currentColor="#6366f1" />
            </a>
          </Link>
        </div>
      </div>
    )
  }

const InnerCard: React.FC<
  Pick<Gist, "comments" | "created_at"> & {
    rawContent: string
  }
> = ({
  rawContent,
  comments,
  created_at,
}) => {
    const { data, content } = matter(rawContent);

    const { title, category, date } = data as DataProps;

    return (
      <div className="w-full">
        <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden relative">
          <h2 className="tracking-widest text-xs title-font text-center font-medium text-gray-500 mb-1">
            {category?.toUpperCase() || "NO CATEGORY"} • {readingTime(content)} • {convertDate(created_at) || date}
          </h2>
          <h1 className="title-font text-center text-4xl font-medium text-white mb-3">{title || "No title"}</h1>
          <p className="leading-relaxed p-5">
            <div
              dangerouslySetInnerHTML={{
                __html: md().render(content),
              }}
            />
          </p>
          <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
            <span className="text-gray-500 inline-flex items-center leading-none text-sm">
              <CommentIcon />
              {comments}
            </span>
          </div>
        </div>
      </div>
    )
  }


export { Card, InnerCard }