import { useState } from "react"
import { Card } from ".."
import { fetchRawUrl } from "../../utils/functions"
import { Gist } from "../../utils/services"

type ListProps = {
  data: Gist[],
}

export const List: React.FC<ListProps> = ({
  data
}) => {
  const [rawContent, setRawContent] = useState('');

  return (
    <div className='py-5 overflow-hidden'>
      {
        data.map((gist, index) => {
          fetchRawUrl(gist.files[Object.keys(gist.files)[0]].raw_url)
            .then(res => setRawContent(res))
          return (
            <Card
              key={index}
              files={gist.files}
              rawContent={rawContent}
              description={gist.description}
              created_at={gist.created_at}
            />
          )
        })
      }
    </div>
  )
}