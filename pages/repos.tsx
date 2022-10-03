import { GetStaticProps } from "next";
import { ReposList } from "../components";
import { getRepos, Repo } from "../utils/services";

type Props = {
  repos: Repo[];
};

const Repo = ({ repos }: Props) => {
  if (repos.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-500">No Repos Found</h1>
      </div>
    );
  return <ReposList data={repos} />;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const repos = await getRepos();

    return {
      props: {
        repos,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Repo;
