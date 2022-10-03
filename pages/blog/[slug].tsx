import { GetStaticPaths, GetStaticProps } from "next";
import { Comment as CommentCard, InnerCard } from "../../components";
import {
  Gist,
  Comment,
  getMarkdownGists,
  getCommentsByGist,
  MetaData,
  getGistPaths,
} from "../../utils/services";

type Props = {
  article: Gist;
  comments: Comment[];
  articleMetadata: MetaData;
};

export const BlogInner = ({ article, comments }: Props) => {
  return (
    <>
      <InnerCard article={article} />
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
    const comments = await getCommentsByGist(article);
    return {
      props: {
        article,
        comments,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownGists = await getGistPaths();
  const paths = markdownGists.map((fileName) => ({
    params: { slug: fileName },
  }));
  return {
    paths,
    fallback: true,
  };
};

export default BlogInner;
