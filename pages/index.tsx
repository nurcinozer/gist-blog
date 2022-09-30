import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { Layout, List, Spinner } from '../components'
import { getGists, Gist } from '../utils/services';

type HomeProps = {
  gists: Gist[]
}

const Home: React.FC<HomeProps> = ({
  gists
}) => {
  const [loading, setLoading] = useState(true);

  const getMarkDownFiles = useMemo(() => {
    const filteredGists = gists.filter(gist => gist.files[Object.keys(gist.files)[0]].language === 'Markdown');
    setLoading(false);
    return filteredGists;
  }, [gists])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {
        getMarkDownFiles.length > 0 ? (
          <List data={getMarkDownFiles} />
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <h1 className='text-2xl font-bold text-gray-500'>No Gists Found</h1>
          </div>
        )
      }
    </>
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
      props: {}
    }
  }
}


export default Home
