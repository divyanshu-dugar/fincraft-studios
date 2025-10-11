export default function ExpenseStats({ stats, formatCurrency }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-medium text-gray-600">Total Expenses</p>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalExpenses)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-medium text-gray-600">Total Categories</p>
        <p className="text-2xl font-bold text-gray-900">{stats.categoryStats.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-medium text-gray-600">Transactions</p>
        <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-medium text-gray-600">Avg. Expense</p>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgExpense)}</p>
      </div>
    </div>
  );
}
