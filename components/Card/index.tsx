import Link from "next/link";
import md from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { RightArrow } from "../Icons";
import { Gist, Repo } from "../../utils/services";

const MarkdownRenderer = md({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
});

const Card = ({
  markdownFileName,
  description,
  articleDate,
  title,
  metaData,
}: Gist) => {
  const { category, date } = metaData;

  return (
    <div className="py-8 flex border-t-2 dark:border-gray-800 border-gray-100 flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font dark:text-white text-gray-700">
          {category?.toUpperCase() || "NO CATEGORY"}
        </span>
        <span className="mt-1 text-gray-500 text-sm">
          {articleDate || date}
        </span>
      </div>
      <div className="md:flex-grow">
        <Link href={`/blog/${markdownFileName}`}>
          <a className="text-2xl font-medium dark:text-white title-font text-gray-900">
            {title || "No title"}
          </a>
        </Link>
        <p className="leading-relaxed mt-2 text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <Link href={`/blog/${markdownFileName}`}>
          <a className="text-indigo-400 inline-flex items-center mt-4">
            Learn More
            <RightArrow currentColor="#6366f1" />
          </a>
        </Link>
      </div>
    </div>
  );
};

const InnerCard = ({
  article: { articleDate, markdownContent, title, metaData, readingTime },
}: {
  article: Gist;
}) => {
  const { category, date, tags } = metaData;

  return (
    <div className="prose lg:prose-xl dark:prose-invert w-full mb-20 dark:bg-gray-800 bg-gray-100 bg-opacity-40 px-8 py-16 rounded-lg mx-auto dark:text-gray-400 text-gray-600">
      <h6 className="tracking-widest text-xs title-font text-center font-medium dark:text-gray-500 text-gray-400 mb-1">
        {category?.toUpperCase() || "NO CATEGORY"} • {readingTime} •{" "}
        {articleDate || date}
      </h6>
      <h1 className="text-center mb-2 dark:text-white text-gray-900">
        {title}
      </h1>
      <div className="flex justify-center mt-5 flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <div
            className={
              "text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full  bg-white text-gray-700  border"
            }
            key={index}
          >
            # {tag}
          </div>
        ))}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: MarkdownRenderer.render(markdownContent),
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
      <p className="leading-relaxed text-base mb-4 text-gray-600 dark:text-gray-400">
        {description}
      </p>
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
