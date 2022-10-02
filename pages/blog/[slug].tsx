import { GetStaticPaths, GetStaticProps } from "next";
import { Comment as CommentCard, InnerCard } from "../../components";
import { fetchRawUrl } from "../../utils/functions";
import {
  Gist,
  Comment,
  getMarkdownGists,
  getCommentsByGist,
  MetaData,
} from "../../utils/services";
import matter from "gray-matter";

type BlogInnerProps = {
  article: Gist;
  comments: Comment[];
  articleMetadata: MetaData;
};

export const BlogInner = ({
  article,
  comments,
  articleMetadata,
}: BlogInnerProps) => {
  return (
    <>
      <InnerCard
        key={article.id}
        article={article}
        articleMetadata={articleMetadata}
      />
      {comments.length > 0 && (
        <h1 className="text-2xl font-bold dark:text-white text-gray-600 text-center">
          Comments
        </h1>
      )}
      {comments.map((comment) => (
        <CommentCard
          avatar_url={`https://github.com/${comment.user.login}.png`}
          comment={comment.body}
          key={comment.id}
          created_at={comment.created_at}
          username={comment.user.login}
        />
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const markdownGists = await getMarkdownGists();
  const article = markdownGists.find((gist) => gist.markdownFileName === slug);
  if (article) {
    const rawContent = await fetchRawUrl(article?.rawUrl);
    const comments = await getCommentsByGist(article);
    const { data: articleMetadata, content } = matter(rawContent);

    return {
      props: {
        article: { ...article, rawContent: content },
        comments,
        articleMetadata,
      },
    };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownGists = await getMarkdownGists();
  const paths = markdownGists.map((gist) => ({
    params: { slug: gist.markdownFileName },
  }));
  return {
    paths,
    fallback: true,
  };
};

export default BlogInner;
