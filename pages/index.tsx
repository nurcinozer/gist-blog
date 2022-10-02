import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import { List, Spinner } from "../components";
import { getGists, getMarkdownGists, Gist } from "../utils/services";

type HomeProps = {
  articles: Gist[];
};

const Home = ({ articles }: HomeProps) => {
  return (
    <>
      {articles.length > 0 ? (
        <List data={articles} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold text-gray-500">No Gists Found</h1>
        </div>
      )}
    </>
  );
};

export async function getStaticProps() {
  const markdownGists = await getMarkdownGists();

  return {
    props: {
      articles: markdownGists,
    },
  };
}

export default Home;
