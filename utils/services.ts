import { slugify } from "./helpers";
import { calculateReadingTime, convertDate, fetchRawUrl } from "./functions";
import matter from "gray-matter";

const GITHUB_NAME = process.env.GITHUB_NAME;

const HEADER = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
};

export interface Repo {
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
}

export type MetaData = {
  title?: string;
  category?: string;
  date?: string;
  tags?: string[];
};

export interface File {
  [key: string]: {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
    content: string;
  };
}

export interface Gist {
  id: string;
  description: string;
  html_url: string;
  files: File;
  created_at: string;
  comments: number;
  comments_url: string;
  markdownFileName: string;
  rawContent: string;
  rawUrl: string;
  title: string;
  metaData: MetaData;
  readingTime: string;
  articleDate: string;
  markdownContent: string;
}

export interface User {
  login: string;
  avatar_url: string;
}

export interface UserDetail {
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  hireable: boolean;
  twitter_username: string;
}

export interface Comment {
  id: string;
  body: string;
  user: User;
  created_at: string;
}

export const getRepos = async () => {
  const res = await fetch(`https://api.github.com/users/${GITHUB_NAME}/repos`, {
    headers: HEADER,
  });
  const repos = (await res.json()) as Repo[];
  return repos.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
};

export async function getGists(): Promise<Gist[]> {
  return fetch(`https://api.github.com/users/${GITHUB_NAME}/gists`, {
    headers: HEADER,
  }).then((res) => res.json());
}

// For getStaticPaths
export const getGistPaths = async () => {
  const gists = await getGists();
  return gists
    .filter((gist) => {
      return Object.keys(gist.files).some((key) => {
        return gist.files[key].type === "text/markdown";
      });
    })
    .map((gist) => {
      const file = Object.keys(gist.files)[0];
      const firstFileName = file.split(".")[0];

      return slugify(firstFileName);
    });
};

export const getMarkdownGists = async () => {
  const gists = await getGists();
  return Promise.all(
    gists
      .filter((gist) => {
        return Object.keys(gist.files).some((key) => {
          return gist.files[key].type === "text/markdown";
        });
      })
      .map(async (gist) => {
        const file = Object.keys(gist.files)[0];
        const firstFileName = file.split(".")[0];
        const rawUrl = gist.files[file].raw_url;
        const articleDate = convertDate(gist.created_at);
        const rawContent = await fetchRawUrl(rawUrl);
        const { data: metaData, content: markdownContent } = await matter(
          rawContent
        );
        const readingTime = await calculateReadingTime(markdownContent);
        return {
          ...gist,
          markdownFileName: slugify(firstFileName),
          rawUrl,
          title: firstFileName,
          articleDate,
          rawContent: rawContent,
          metaData: { ...metaData, tags: metaData.tags?.split(",") || [] },
          markdownContent,
          readingTime,
        };
      })
  );
};

export const getCommentsByGist = async (gist: Gist): Promise<Comment[]> => {
  return await fetch(gist.comments_url, {
    headers: HEADER,
  }).then((res) => res.json());
};

export const getGithubUser = async () => {
  return await fetch(`https://api.github.com/users/${GITHUB_NAME}`, {
    headers: HEADER,
  }).then((res) => res.json());
};

export const getUserAvatar = async () => {
  return `https://github.com/${GITHUB_NAME}.png`;
};
