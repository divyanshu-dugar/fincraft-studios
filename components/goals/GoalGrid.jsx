"use client";

import GoalCard from "./GoalCard";

export default function GoalGrid({
  goals,
  onEdit,
  onDelete,
  onChangeSavedAmount,
  onUpdateSavedAmount,
  formatCurrency,
  formatDate,
  getDaysRemaining,
  getPriorityColor,
  getPriorityIcon,
}) {
  if (!goals.length)
    return (
      <div className="bg-white/80 rounded-3xl border border-gray-100/50 shadow-xl p-12 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <span className="text-5xl">🎯</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-700">No Goals Yet</h3>
          <p className="text-gray-500 text-lg">
            Start your financial journey by creating your first savings goal.
          </p>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeSavedAmount={onChangeSavedAmount}
          onUpdateSavedAmount={onUpdateSavedAmount}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          getDaysRemaining={getDaysRemaining}
          getPriorityColor={getPriorityColor}
          getPriorityIcon={getPriorityIcon}
        />
      ))}
    </div>
  );
}
