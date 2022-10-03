import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { Button, Spinner, Statistic, Table } from "../components";
import { getGithubUser, getUserAvatar, UserDetail } from "../utils/services";

const About: React.FC<{ data: UserDetail; avatar: string }> = ({
  data,
  avatar,
}) => {
  const [loading] = useState(true);

  const mailTo = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (!data && loading) {
    return <Spinner />;
  }

  return (
    <>
      {data ? (
        <>
          <Statistic
            publicRepos={data.public_repos}
            followers={data.followers}
            following={data.following}
            publicGists={data.public_gists}
          />
          <div className="lg:w-4/5 pb-20 flex flex-wrap mx-auto">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 lg:mr-24">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                ABOUT
              </h2>
              <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-4">
                {data.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-400 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Biography
                </a>
              </div>
              <p className="leading-relaxed mb-4 text-gray-600 dark:text-gray-400">
                {data.bio || "No bio"}
              </p>
              <Table data={data} />
              <div className="flex">
                <Button size="large" onClick={() => mailTo(data.email)}>
                  Get in touch
                </Button>
              </div>
            </div>
            <Image
              src={avatar}
              alt={data.name}
              width={400}
              height={400}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold text-gray-500">No Data Found</h1>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [data, avatar] = await Promise.all([
      getGithubUser(),
      getUserAvatar(),
    ]);

    return {
      props: {
        data,
        avatar,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
        statusCode: 302,
      },
      props: {},
    };
  }
};

export default About;
