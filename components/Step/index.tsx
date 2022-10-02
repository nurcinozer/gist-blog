type Step = {
  title: string;
  content: string;
}

type StepProps = {
  steps: Step[];
}

export const Step: React.FC<StepProps> = ({
  steps
}) => {
  return (
    <>
      {
        steps.map((step, index) => {
          return (
            <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto" key={index}>
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-gray-200 dark:bg-gray-800 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">{index + 1}</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 dark:text-white mb-1 text-xl">{step.title}</h2>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{step.content}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}