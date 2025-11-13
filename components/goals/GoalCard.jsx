"use client";

export default function GoalCard({
  goal,
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
  const daysRemaining = getDaysRemaining(goal.deadline);
  const progress = Math.min((goal.savedAmount / goal.amount) * 100, 100);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-500 group">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${getPriorityColor(
          goal.priority
        )} p-4 rounded-t-2xl`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getPriorityIcon(goal.priority)}</span>
            <span className="text-white font-semibold capitalize">
              {goal.priority} Priority
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEdit(goal)}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(goal._id)}
              className="text-white/80 hover:text-red-300 cursor-pointer"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
          {goal.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {goal.description || "No description provided"}
        </p>

        {/* Target and Deadline */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Target Amount</span>
            <span className="text-2xl font-bold text-purple-600">
              {formatCurrency(goal.amount)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Deadline</span>
            <div className="text-right">
              <div className="font-semibold text-gray-700">
                {formatDate(goal.deadline)}
              </div>
              <div
                className={`text-sm font-medium ${
                  daysRemaining < 0
                    ? "text-red-500"
                    : daysRemaining < 30
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {daysRemaining < 0
                  ? `${Math.abs(daysRemaining)} days overdue`
                  : `${daysRemaining} days remaining`}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-semibold text-gray-700">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Saved Amount Update */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="number"
            min="0"
            value={goal.savedAmount || ""}
            onChange={(e) => onChangeSavedAmount(goal._id, e.target.value)}
            className="w-24 px-2 py-1 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={() => onUpdateSavedAmount(goal._id, goal.savedAmount)}
            className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
