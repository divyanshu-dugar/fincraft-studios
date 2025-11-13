"use client";

export default function GoalsHeader({ onNewGoal }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl text-white">🎯</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Savings Goals
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Track your financial dreams and achievements
          </p>
        </div>
      </div>

      <button
        onClick={onNewGoal}
        className="mt-6 lg:mt-0 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
      >
        <span className="text-xl">+</span>
        <span>New Goal</span>
      </button>
    </div>
  );
}
