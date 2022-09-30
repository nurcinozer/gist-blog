import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Button, Layout, List, Spinner, Statistic, Table } from '../components'
import { getGists, getGithubUser, Gist, User, UserDetail } from '../utils/services';


const About: React.FC<{ data: UserDetail, user: User }> = ({
  data,
  user,
}) => {
  const [loading] = useState(true);

  const mailTo = (email: string) => {
    window.location.href = `mailto:${email}`;
  }

  if (!data && loading) {
    return <Spinner />
  }

  return (
    <>
      {
        data ? (
          <>
            <div className="lg:w-4/5 pb-20 flex md:flex-wrap mx-auto">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 lg:mr-24">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">ABOUT</h2>
                <h1 className="text-white text-3xl title-font font-medium mb-4">{data.name}</h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-indigo-400 border-b-2 border-indigo-500 py-2 text-lg px-1">Biography</a>
                </div>
                <p className="leading-relaxed mb-4">
                  {data.bio || 'No bio'}
                </p>
                <Table data={data} />
                <div className="flex">
                  <Button size='large' onClick={() => mailTo(data.email)}>
                    Get in touch
                  </Button>
                </div>
              </div>
              <Image src={`https://github.com/nurcinozer.png`} alt={data.name} width={400} height={400} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" />
            </div>
            <Statistic
              publicRepos={data.public_repos}
              followers={data.followers}
              following={data.following}
              publicGists={data.public_gists}
            />
          </>
        ) : (
          <div className='flex justify-center items-center h-screen'>
            <h1 className='text-2xl font-bold text-gray-500'>No Data Found</h1>
          </div>
        )
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getGithubUser();

    return {
      props: {
        data
      }

    }
  } catch (error) {
    return {
      props: {}
    }
  }
}


export default About
