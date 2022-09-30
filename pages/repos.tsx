import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { Spinner, ReposList } from '../components'
import { getRepos, Repo } from '../utils/services';

type RepoProps = {
  repos: Repo[]
}

const Repo: React.FC<RepoProps> = ({
  repos
}) => {
  const [loading] = useState(true);

  const sortedRepos = useMemo(() => {
    const sortedRepos = repos.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
    return sortedRepos;
  }, [repos])

  if (!repos && loading) {
    return <Spinner />
  }

  return (
    <>
      {
        sortedRepos.length > 0 ? (
          <ReposList data={sortedRepos} />
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <h1 className='text-2xl font-bold text-gray-500'>No Repos Found</h1>
          </div>
        )
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const repos = await getRepos();

    return {
      props: {
        repos
      }

    }
  } catch (error) {
    return {
      props: {}
    }
  }
}


export default Repo
