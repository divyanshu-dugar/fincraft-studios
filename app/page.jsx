import Link from "next/link";

export default function Home() {
  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            {/* <Image src="/logo.png" height="200" width="200" alt="fincraft studios" className="rounded-full m-auto"/> */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Fin-Craft Studios
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your all-in-one financial companion for smarter money decisions.
            </p>
          </div>
          <Link 
            href="/expense/list"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Financial Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive suite of tools to manage every aspect of your financial life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Ledgerify',
                description: 'Track your income and expenses seamlessly with Income & Expense Trackers.',
                icon: '📊',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                name: 'Savify',
                description: 'Set, track, and conquer your savings goals—one step at a time.',
                icon: '💰',
                color: 'from-green-500 to-emerald-500'
              },
              {
                name: 'Budgetify',
                description: 'Manage your budget and plan better every month (Coming Soon!).',
                icon: '📈',
                color: 'from-purple-500 to-pink-500',
                comingSoon: true
              },
              {
                name: 'Investify',
                description: 'Learn to invest smartly and grow your wealth (Coming Soon!).',
                icon: '🚀',
                color: 'from-orange-500 to-red-500',
                comingSoon: true
              },
              {
                name: 'Other Tools',
                description: 'Tax Calculator, Currency Converter, and more utility tools.',
                icon: '🛠️',
                color: 'from-gray-500 to-slate-600'
              }
            ].map((tool, index) => (
              <div 
                key={tool.name}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
              >
                {tool.comingSoon && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    Explore tool
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔧 Tech Stack Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This platform is built with a powerful full-stack architecture designed for performance and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              {
                title: '🖥 Frontend',
                items: [
                  { name: 'Next.js', description: 'React framework with App Router' },
                  { name: 'Tailwind CSS', description: 'Utility-first styling framework' },
                  { name: 'Chart.js & react-chartjs-2', description: 'Interactive data visualizations' },
                  { name: 'Framer Motion', description: 'Smooth animations and transitions' }
                ],
                color: 'border-blue-200 bg-blue-50'
              },
              {
                title: '🗄 Backend',
                items: [
                  { name: 'Node.js', description: 'JavaScript runtime environment' },
                  { name: 'Express.js', description: 'Fast and minimalist web framework' },
                  { name: 'CORS & Body-Parser', description: 'Middleware for APIs' },
                  { name: 'Mongoose', description: 'ODM for MongoDB' }
                ],
                color: 'border-green-200 bg-green-50'
              },
              {
                title: '💾 Database',
                items: [
                  { name: 'MongoDB', description: 'NoSQL database for flexible data' },
                  { name: 'MongoDB Atlas', description: 'Cloud database service' },
                  { name: 'Mongoose ODM', description: 'Elegant MongoDB object modeling' }
                ],
                color: 'border-purple-200 bg-purple-50'
              },
              {
                title: '⚙️ Tooling',
                items: [
                  { name: 'ESLint', description: 'Code quality & linting' },
                  { name: 'Git & GitHub', description: 'Version control & collaboration' },
                  { name: 'Vercel', description: 'Platform deployment' },
                  { name: 'NPM Scripts', description: 'Build & deployment automation' }
                ],
                color: 'border-orange-200 bg-orange-50'
              }
            ].map((column, index) => (
              <div 
                key={column.title}
                className={`rounded-2xl border-2 ${column.color} p-6 hover:shadow-lg transition-shadow duration-300`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <div>
                        <strong className="text-gray-900 font-semibold">{item.name}</strong>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-8">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            📂 Source Code
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out our project on GitHub and feel free to fork, star, or contribute to make financial management better for everyone.
          </p>
          <a 
            href="https://github.com/divyanshu-dugar/Fin-Craft-Studios" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-xl hover:scale-105 transform transition-all duration-200 border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </div>      
    </>
  );
}
