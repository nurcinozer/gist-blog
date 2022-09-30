import { useState } from "react";
import { Button, RepoCard } from ".."
import { Repo } from "../../utils/services"

type ReposProps = {
  data: Repo[],
}

const LIMIT = 8;

export const ReposList: React.FC<ReposProps> = ({
  data
}) => {
  const [next, setNext] = useState(LIMIT);
  const fetchMore = () => {
    setNext(next + LIMIT)
  }

  return (
    <>
      <div className='pb-14 overflow-hidden flex flex-wrap'>
        {
          data.slice(0, next).map((repo, index) => {
            return (
              <RepoCard
                key={index}
                name={repo.name}
                description={repo.description}
                html_url={repo.html_url}
              />
            )
          })
        }
      </div>
      <div className='flex justify-center pb-20'>
        {
          next < data.length && (
            <Button size="large" onClick={() => fetchMore()}>Load More</Button>
          )
        }
      </div>
    </>
  )
}