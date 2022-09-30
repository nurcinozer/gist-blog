export const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.split(".")[0];
};

export const fetchRawUrl = (url: string) => {
  return fetch(url).then((res) => res.text());
};

export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
};

export const readingTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime > 1 ? `${readTime} mins read` : `${readTime} min read`;
};
