import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import { Layout, List } from '../components'
import { getGistByFilename, getGists, Gist } from '../utils/services';

type HomeProps = {
  gists: Gist[]
}

const Home: React.FC<HomeProps> = ({
  gists
}) => {

  const getMarkDownFiles = useMemo(() => {
    if (!gists) return [];
    return gists.filter(g => g.files[
      Object.keys(g.files)[0]
    ].language === 'Markdown')
  }, [gists])

  return (
    <Layout>
      {
        <List data={getMarkDownFiles} />
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const gists = await getGists();

    return {
      props: {
        gists
      }
    }
  } catch (error) {
    return {
      props: {

      }
    }
  }
}


export default Home
