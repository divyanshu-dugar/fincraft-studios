'use client';
import Link from "next/link";

export default function ToolCard({ tool }) {
  return (
    <div className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-transparent overflow-hidden">
      
      {/* Top-right Badge */}
      {tool.comingSoon && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <span className="px-3 py-1 bg-yellow-400 text-white text-xs font-semibold rounded-full shadow-md">
            Coming Soon
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${tool.color} text-white text-3xl mx-auto mt-6 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {tool.icon}
      </div>

      {/* Name & Description */}
      <div className="px-6 pb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{tool.description}</p>

        {/* Explore Tool Link */}
        {!tool.comingSoon && (
          <Link
            href="/expense/list"
            className="mt-6 inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
          >
            Explore Tool
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
