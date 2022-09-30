const GITHUB_NAME = "nurcinozer";

const HEADER = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
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
}

export interface User {
  login: string;
  avatar_url: string;
}

export interface Comment {
  id: string;
  body: string;
  user: User;
  created_at: string;
}

export const getGists = async () => {
  const res = await fetch(`https://api.github.com/users/${GITHUB_NAME}/gists`, {
    headers: HEADER,
  }).then((res) => res.json());
  return res;
};

export const getGistById = async (id: string) => {
  const res = await fetch(`https://api.github.com/gists/${id}`, {
    headers: HEADER,
  }).then((res) => res.json());
  return res;
};

export const getGistByFilename = async (filename: string) => {
  const gists = await getGists();
  const gist = gists.find((gist: Gist) => gist.files[filename]);
  return gist;
};

export const getCommentsByFilename = async (filename: string) => {
  const gist = await getGistByFilename(filename);
  const comments = await fetch(gist.comments_url, {
    headers: HEADER,
  }).then((res) => res.json());
  return comments;
};
