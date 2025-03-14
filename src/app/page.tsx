import JokeGenerator from "@/components/joke-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Joke Generator</span>
            <span className="block text-purple-600 dark:text-purple-400">Laugh on Demand</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Customize your joke parameters and get instant humor tailored just for you!
          </p>
        </div>

        <JokeGenerator />
      </div>
    </main>
  )
}

