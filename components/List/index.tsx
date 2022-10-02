import { useState } from "react";
import { Button, Card } from "..";
import { Gist } from "../../utils/services";

type ListProps = {
  data: Gist[];
};

const LIMIT = 5;

export const List = ({ data }: ListProps) => {
  const [next, setNext] = useState(LIMIT);
  const fetchMore = () => {
    setNext(next + LIMIT);
  };

  return (
    <div className="pb-20 overflow-hidden">
      {data.slice(0, next).map((gist, index) => {
        return <Card key={index} {...gist} />;
      })}
      <div className="flex justify-center mt-10">
        {next < data.length && (
          <Button size="large" onClick={() => fetchMore()}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};
