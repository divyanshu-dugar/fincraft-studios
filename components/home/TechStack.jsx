"use client";

import { motion } from "framer-motion";

export default function TechStackSection() {
  const columns = [
    {
      title: "🖥 Frontend",
      items: [
        { name: "Next.js", description: "React framework with App Router" },
        { name: "Tailwind CSS", description: "Utility-first styling framework" },
        { name: "Chart.js & react-chartjs-2", description: "Interactive data visualizations" },
        { name: "Framer Motion", description: "Smooth animations and transitions" },
      ],
      gradient: "from-blue-500/10 to-blue-200/10 border-blue-300/30",
    },
    {
      title: "🗄 Backend",
      items: [
        { name: "Node.js", description: "JavaScript runtime environment" },
        { name: "Express.js", description: "Fast and minimalist web framework" },
        { name: "CORS & Body-Parser", description: "Middleware for APIs" },
        { name: "Mongoose", description: "ODM for MongoDB" },
      ],
      gradient: "from-green-500/10 to-green-200/10 border-green-300/30",
    },
    {
      title: "💾 Database",
      items: [
        { name: "MongoDB", description: "NoSQL database for flexible data" },
        { name: "MongoDB Atlas", description: "Cloud database service" },
        { name: "Mongoose ODM", description: "Elegant MongoDB object modeling" },
      ],
      gradient: "from-purple-500/10 to-purple-200/10 border-purple-300/30",
    },
    {
      title: "⚙️ Tooling",
      items: [
        { name: "ESLint", description: "Code quality & linting" },
        { name: "Git & GitHub", description: "Version control & collaboration" },
        { name: "Vercel", description: "Platform deployment" },
        { name: "NPM Scripts", description: "Build & deployment automation" },
      ],
      gradient: "from-orange-500/10 to-orange-200/10 border-orange-300/30",
    },
  ];

  return (
    <section className="relative py-24 px-6 sm:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Decorative background gradient blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 to-indigo-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 to-pink-400/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Tech Stack Overview
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Built with a powerful full-stack architecture - modern, scalable, and performance-focused.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {columns.map((col, index) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 bg-gradient-to-br ${col.gradient} shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-lg`}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
