import Link from "next/link"
import { UserDetail } from "../../utils/services"

type TableProps = {
  data: UserDetail
}

export const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <>
      {
        data && (
          <>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Location</span>
              <span className="ml-auto text-white">{data.location || 'No location'}</span>
            </div>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Company</span>
              <span className="ml-auto text-white">{data.company || 'No company'}</span>
            </div>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Hireable</span>
              <span className="ml-auto text-white">{data.hireable === true ? 'Hireable' : 'Not hireable'}</span>
            </div>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Blog</span>
              {
                data.blog ? (
                  <Link href={data.blog}>
                    <a className="ml-auto text-white">{data.blog}</a>
                  </Link>
                ) : (
                  <span className="ml-auto text-white">No blog</span>
                )
              }
            </div>
            <div className="flex border-t border-gray-800 py-2">
              <span className="text-gray-500">Github profile</span>
              {
                <Link href={data.html_url}>
                  <a className="ml-auto text-white">{data.html_url}</a>
                </Link>
              }
            </div>
            <div className="flex border-t border-b mb-6 border-gray-800 py-2">
              <span className="text-gray-500">Twitter username</span>
              {
                data.twitter_username ? (
                  <Link href={`https://twitter.com/${data.twitter_username}`}>
                    <a className="ml-auto text-white">{data.twitter_username}</a>
                  </Link>
                ) : (
                  <span className="ml-auto text-white">No Twitter username</span>
                )
              }
            </div>
          </>
        )}
    </>
  )
}