type StatisticProps = {
  publicRepos: number
  followers: number
  following: number
  publicGists: number
}

export const Statistic: React.FC<StatisticProps> = ({
  publicRepos,
  followers,
  following,
  publicGists,
}) => {
  return (
    <div className="dark:text-white text-gray-600 flex flex-wrap text-center pb-10">
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl dark:text-white text-gray-900">{publicRepos}</h2>
        <p className="leading-relaxed">Public Repos</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl dark:text-white text-gray-900">{publicGists}</h2>
        <p className="leading-relaxed">Public Gists</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl dark:text-white text-gray-900">{followers}</h2>
        <p className="leading-relaxed">Followers</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl dark:text-white text-gray-900">{following}</h2>
        <p className="leading-relaxed">Following</p>
      </div>
    </div>
  )
}