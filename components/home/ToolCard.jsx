'use client';

export default function ToolCard({ tool }) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent">
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
      {!tool.comingSoon && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            Explore tool
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
