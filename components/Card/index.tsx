import { RightArrow } from "../Icons";
import matter from "gray-matter";
import Link from "next/link";
import {
  convertDate,
  fetchRawUrl,
  getFileNameWithoutExtension,
  readingTime,
} from "../../utils/functions";
import { Gist, Repo } from "../../utils/services";
import md from "markdown-it";
import { useState, useMemo } from "react";
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";

const MarkdownRenderer = md({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }

    return "";
  },
});

type DataProps = {
  title?: string;
  category?: string;
  date?: string;
};

const Card: React.FC<
  Pick<Gist, "description" | "created_at" | "files"> & {
    rawUrl: string;
  }
> = ({ files, rawUrl, description, created_at }) => {
  const [rawContent, setRawContent] = useState("");

  useMemo(() => {
    fetchRawUrl(rawUrl).then((rawContent) => {
      setRawContent(rawContent);
    });
  }, [rawUrl]);

  const { data } = matter(rawContent);

  const { title, category, date } = data as DataProps;

  const fileName = getFileNameWithoutExtension(
    files[Object.keys(files)[0]].filename
  );

  return (
    <div className="py-8 flex border-t-2 dark:border-gray-800 border-gray-100 flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font dark:text-white text-gray-700">
          {category?.toUpperCase() || "NO CATEGORY"}
        </span>
        <span className="mt-1 text-gray-500 text-sm">
          {convertDate(created_at) || date}
        </span>
      </div>
      <div className="md:flex-grow">
        <Link href={`/blog/${fileName}`}>
          <a className="text-2xl font-medium dark:text-white title-font text-gray-900">
            {title || "No title"}
          </a>
        </Link>
        <p className="leading-relaxed mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <Link href={`/blog/${fileName}`}>
          <a className="text-indigo-400 inline-flex items-center mt-4">
            Learn More
            <RightArrow currentColor="#6366f1" />
          </a>
        </Link>
      </div>
    </div>
  );
};

const InnerCard: React.FC<
  Pick<Gist, "comments" | "created_at"> & {
    rawContent: string;
  }
> = ({ rawContent, comments, created_at }) => {
  const { data, content } = matter(rawContent);

  const { title, category, date } = data as DataProps;

  return (
    <div className="prose lg:prose-xl dark:prose-invert w-full mb-20 dark:bg-gray-800 bg-gray-100 bg-opacity-40 px-8 py-16 rounded-lg mx-auto dark:text-gray-400 text-gray-600">
      <h6 className="tracking-widest text-xs title-font text-center font-medium dark:text-gray-500 text-gray-400 mb-1">
        {category?.toUpperCase() || "NO CATEGORY"} • {readingTime(content)} •{" "}
        {convertDate(created_at) || date}
      </h6>
      <h1 className="text-center mb-2 dark:text-white text-gray-900">{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: MarkdownRenderer.render(content),
        }}
      />
    </div>
  );
};

const RepoCard: React.FC<Pick<Repo, "description" | "html_url" | "name">> = ({
  description,
  html_url,
  name: title,
}) => {
  return (
    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-800 mb-10">
      <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">
        {title}
      </h2>
      <p className="leading-relaxed text-base mb-4 text-gray-600 dark:text-gray-400">{description}</p>
      <Link href={`${html_url}`}>
        <a
          className="text-indigo-400 inline-flex items-center mt-4"
          target="_blank"
        >
          Get Source Code
          <RightArrow currentColor="#6366f1" />
        </a>
      </Link>
    </div>
  );
};

export { Card, InnerCard, RepoCard };
