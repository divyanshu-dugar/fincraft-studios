'use client';

export default function ExpenseTable({
  expenses = [],
  router,
  deleteExpense,
  formatCurrency = (v) => `$${v.toFixed(2)}`,
  formatDate,
}) {
  // 🟡 Case: No expenses
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow text-center py-12">
        <h3 className="mt-4 text-lg font-medium text-gray-900">No expenses found</h3>
        <p className="mt-2 text-gray-500">Get started by adding your first expense.</p>
        <button
          onClick={() => router.push('/expense/add')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Expense
        </button>
      </div>
    );
  }

  // 🟣 Group expenses by formatted date
  const groupedExpenses = expenses.reduce((acc, expense) => {
    const dateKey = formatDate(expense.date);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(expense);
    return acc;
  }, {});

  // Sort dates descending (newest first)
  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        {sortedDates.map((date) => (
          <div key={date} className="border-b border-gray-200">
            {/* 📅 Sticky Date Subheader */}
            <div className="bg-gray-100 px-6 py-3 sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-800">{date}</h2>
            </div>

            {/* Table for that date */}
            <table
              className="min-w-full table-fixed divide-y divide-gray-200"
              style={{ tableLayout: 'fixed' }}
            >
              <colgroup>
                <col style={{ width: '25%' }} /><col style={{ width: '15%' }} /><col style={{ width: '40%' }} /><col style={{ width: '20%' }} />
              </colgroup>

              <thead className="bg-gray-50">
                <tr>
                  {['Category', 'Amount', 'Note', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {groupedExpenses[date].map((expense) => {
                  const category = expense.category || {};
                  const categoryName = category.name || 'Uncategorized';
                  const categoryColor = category.color || '#9ca3af';

                  return (
                    <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: categoryColor }}
                        >
                          {categoryName}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(expense.amount)}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500 truncate">
                        {expense.note || '—'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button
                          onClick={() => router.push(`/expense/edit/${expense._id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
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
