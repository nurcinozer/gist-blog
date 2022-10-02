import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Comment as CommentCard, InnerCard, Spinner } from "../../components";
import { fetchRawUrl } from "../../utils/functions";
import { getCommentsByFilename, getGistByFilename, Gist, Comment } from "../../utils/services";

type BlogInnerProps = {
  gist: Gist
  comments: Comment[]
}

export const BlogInner: React.FC<BlogInnerProps> = ({
  gist,
  comments
}) => {
  const [rawContent, setRawContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRawUrl(gist.files[Object.keys(gist.files)[0]].raw_url).then(res => setRawContent(res));
    setLoading(false);
  }, [gist])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <InnerCard
        comments={gist.comments}
        rawContent={rawContent}
        key={gist.id}
        created_at={gist.created_at}
      />
      {
        comments.length > 0 && (
          <h1 className='text-2xl font-bold dark:text-white text-gray-600 text-center'>Comments</h1>
        )
      }
      {
        comments.map(comment => (
          <CommentCard
            avatar_url={`https://github.com/${comment.user.login}.png`}
            comment={comment.body}
            key={comment.id}
            created_at={comment.created_at}
            username={comment.user.login}
          />
        ))
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (!context.params?.slug) {
      return {
        notFound: true
      }
    }

    const fileName = context.params.slug[0] + '.md'

    const [gist, comments] = await Promise.all([
      getGistByFilename(fileName),
      getCommentsByFilename(fileName)
    ])

    return {
      props: {
        gist,
        comments
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}


export default BlogInner