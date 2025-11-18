"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseTable({
  expenses = [],
  router,
  deleteExpense,
  formatCurrency = (v) => `$${v.toFixed(2)}`,
  formatDate,
}) {
  // Case: No expenses
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg text-center py-16 border border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900">No expenses yet</h3>
        <p className="mt-2 text-gray-500">
          Track your spending by adding your first expense.
        </p>

        <button
          onClick={() => router.push("/expense/add")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
        >
          + Add Expense
        </button>
      </div>
    );
  }

  // ⭐ Group expenses by date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateKey = formatDate(expense.date);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(expense);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        {sortedDates.map((date) => (
          <div key={date} className="border-b border-gray-100">
            {/* Sticky subheader */}
            <div className="backdrop-blur bg-gray-50/70 px-6 py-4 sticky top-0 z-20 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500 shadow" />
                {date}
              </h2>
            </div>

            <table className="min-w-full table-fixed">
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Category", "Amount", "Note", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white">
                {groupedExpenses[date].map((expense) => {
                  const category = expense.category || {};
                  const categoryName = category.name || "Uncategorized";
                  const categoryColor = category.color || "#9ca3af";

                  return (
                    <tr
                      key={expense._id}
                      className="group hover:bg-gray-50 transition-all border-b border-gray-100"
                    >
                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-sm transition-transform group-hover:scale-[1.03]"
                          style={{ backgroundColor: categoryColor }}
                        >
                          {categoryName}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {formatCurrency(expense.amount)}
                      </td>

                      {/* Note */}
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                        {expense.note || "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                        <button
                          onClick={() =>
                            router.push(`/expense/edit/${expense._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-all flex items-center gap-1"
                        >
                          <Pencil size={16} />
                          <span className="hidden md:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="text-red-600 hover:text-red-800 hover:scale-110 transition-all flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
