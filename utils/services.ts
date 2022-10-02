import { slugify } from "./helpers";

const GITHUB_NAME = "bufgix";

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
  tags?: string;
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
  return res.json();
};

export async function getGists(): Promise<Gist[]> {
  return fetch(`https://api.github.com/users/${GITHUB_NAME}/gists`, {
    headers: HEADER,
  }).then((res) => res.json());
}

export const getMarkdownGists = async () => {
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
      const rawUrl = gist.files[file].raw_url;
      return {
        ...gist,
        markdownFileName: slugify(firstFileName),
        rawUrl,
        title: firstFileName,
      };
    });
};

export const getGistById = async (id: string) => {
  return await fetch(`https://api.github.com/gists/${id}`, {
    headers: HEADER,
  }).then((res) => res.json());
};

export const getGistByFilename = async (filename: string) => {
  const gists = await getGists();
  return gists.find((gist: Gist) => gist.files[filename]);
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
