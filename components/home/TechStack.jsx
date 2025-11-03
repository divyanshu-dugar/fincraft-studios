'use client';

export default function TechStackSection() {
  const columns = [
    { title: '🖥 Frontend', items: [
        { name: 'Next.js', description: 'React framework with App Router' },
        { name: 'Tailwind CSS', description: 'Utility-first styling framework' },
        { name: 'Chart.js & react-chartjs-2', description: 'Interactive data visualizations' },
        { name: 'Framer Motion', description: 'Smooth animations and transitions' }
      ], color: 'border-blue-200 bg-blue-50'
    },
    { title: '🗄 Backend', items: [
        { name: 'Node.js', description: 'JavaScript runtime environment' },
        { name: 'Express.js', description: 'Fast and minimalist web framework' },
        { name: 'CORS & Body-Parser', description: 'Middleware for APIs' },
        { name: 'Mongoose', description: 'ODM for MongoDB' }
      ], color: 'border-green-200 bg-green-50'
    },
    { title: '💾 Database', items: [
        { name: 'MongoDB', description: 'NoSQL database for flexible data' },
        { name: 'MongoDB Atlas', description: 'Cloud database service' },
        { name: 'Mongoose ODM', description: 'Elegant MongoDB object modeling' }
      ], color: 'border-purple-200 bg-purple-50'
    },
    { title: '⚙️ Tooling', items: [
        { name: 'ESLint', description: 'Code quality & linting' },
        { name: 'Git & GitHub', description: 'Version control & collaboration' },
        { name: 'Vercel', description: 'Platform deployment' },
        { name: 'NPM Scripts', description: 'Build & deployment automation' }
      ], color: 'border-orange-200 bg-orange-50'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🔧 Tech Stack Overview</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This platform is built with a powerful full-stack architecture designed for performance and scalability.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title} className={`rounded-2xl border-2 ${col.color} p-6 hover:shadow-lg transition-shadow duration-300`}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start">
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
  );
}
