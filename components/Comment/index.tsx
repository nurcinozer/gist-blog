import Image from 'next/image'
import { convertDate } from '../../utils/functions'

type CommentProps = {
  comment: string
  username: string
  created_at: string
  avatar_url: string
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  username,
  created_at,
  avatar_url
}) => {
  return (
    <div className="p-4 lg:w-1/2 md:w-full mx-auto">
      <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 flex-shrink-0">
          <Image src={avatar_url} alt={username} width={50} height={50} className="rounded-full" />
        </div>
        <div className="flex-grow">
          <h2 className="text-white text-lg title-font font-medium mb-3">{username}</h2>
          <p className="leading-relaxed text-base">{comment}</p>
          <p className="mt-3 text-indigo-400 inline-flex items-center">{convertDate(created_at)}</p>
        </div>
      </div>
    </div>
  )
}