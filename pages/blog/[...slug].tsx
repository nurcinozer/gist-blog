import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { InnerCard, Layout } from "../../components";
import { fetchRawUrl } from "../../utils/functions";
import { getGistByFilename, Gist } from "../../utils/services";

type BlogInnerProps = {
  gist: Gist
}

export const BlogInner: React.FC<BlogInnerProps> = ({
  gist
}) => {
  const [rawContent, setRawContent] = useState('');

  useEffect(() => {
    fetchRawUrl(gist.files[Object.keys(gist.files)[0]].raw_url).then(res => setRawContent(res));
  }, [gist])

  return (
    <Layout>
      <InnerCard
        comments={gist.comments}
        rawContent={rawContent}
        key={gist.id}
        created_at={gist.created_at}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (!context.params?.slug) {
      return {
        notFound: true
      }
    }

    const gist = await getGistByFilename(
      context.params.slug[0] + '.md'
    );

    return {
      props: {
        gist
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}


export default BlogInner