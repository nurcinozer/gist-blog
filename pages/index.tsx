import type { NextPage } from 'next'
import { useMemo, useState } from 'react';
import { Card, Layout } from '../components'
import { useGists } from '../hooks/useGists'

const Home: NextPage = () => {
  const { gists } = useGists();
  const [rawContent, setRawContent] = useState('');

  const getMarkDownFiles = useMemo(() => {
    return gists.filter(g => g.files[
      Object.keys(g.files)[0]
    ].language === 'Markdown')
  }, [gists])

  const fetchRawUrl = (url: string) => {
    return fetch(url)
      .then(res => res.text())
  }

  return (
    <Layout>
      <div className='py-5 overflow-hidden'>
        {
          getMarkDownFiles.map((gist, index) => {
            fetchRawUrl(gist.files[Object.keys(gist.files)[0]].raw_url)
              .then(res => setRawContent(res))
            return (
              (
                <Card
                  key={index}
                  files={gist.files}
                  rawContent={rawContent}
                  description={gist.description}
                  created_at={gist.created_at}
                  comments={gist.comments}
                />
              )
            )
          })
        }
      </div>
    </Layout>
  )
}

export default Home
