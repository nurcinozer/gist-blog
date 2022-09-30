const GITHUB_NAME = "nurcinozer";

export interface File {
  [key: string]: {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
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

export const getGists = async () => {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_NAME}/gists`
  ).then((res) => res.json());
  return res;
};

export const getGistById = async (id: string) => {
  const res = await fetch(`https://api.github.com/gists/${id}`).then((res) =>
    res.json()
  );
  return res;
};

export const getGistByFilename = async (filename: string) => {
  const gists = await getGists();
  const gist = gists.find((gist: Gist) => gist.files[filename]);
  return gist;
};
