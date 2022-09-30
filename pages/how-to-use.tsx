import { Step } from "../components"

const stepList = [
  {
    title: 'Clone the repo',
    content: 'First, clone the repo to your local machine. You can do this by running the following command in your terminal: git clone https://github.com/nurcinozer/gist-blog.git'
  },
  {
    title: 'Install dependencies',
    content: 'Next, install the dependencies by running the following command in your terminal: npm install'
  },
  {
    title: 'Add your GitHub token',
    content: 'Then, add your GitHub token to the .env file. You can get your GitHub token from here: https://github.com/settings/tokens You need to add required scopes to your token.'
  },
  {
    title: 'Change github username',
    content: 'Change github username in the utils/service.ts file.'
  },
  {
    title: 'Run the app',
    content: 'Run the app by running the following command in your terminal: npm run dev'
  },
  {
    title: 'Open the app',
    content: 'Open the app by running the following command in your terminal: http://localhost:3000'
  },
  {
    title: 'Add your blog posts',
    content: 'You can add your blog posts by creating a new gist. You can add metadata to your gist by adding YAML front matter to your gist. You can see the example gist here: https://gist.github.com/nurcinozer/d819cdf7004a17c1a18bc20e0781e299'
  },
  {
    title: 'Yay! Your blog posts are ready to go! 🥳',
    content: ''
  }
]

const HowToUse = () => {
  return (
    <div className="flex flex-wrap pb-20">
      <div className="flex flex-col text-center w-full mb-10">
        <h2 className="text-xs text-indigo-400 tracking-widest font-medium title-font mb-1">
          HOW TO USE
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
          How to use GitHub Gist Blog?
        </h1>
      </div>
      <Step
        steps={stepList}
      />
    </div>
  )
}

export default HowToUse