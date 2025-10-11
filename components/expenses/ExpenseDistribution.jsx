'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ExpenseDistribution({ stats, formatCurrency, getCategoryColor }) {
  if (!stats.categoryStats?.length) return null;

  // Prepare chart data
  const chartData = stats.categoryStats.map((category) => ({
    name: category._id,
    value: category.totalAmount,
  }));

  // Generate color array based on your getCategoryColor
  const COLORS = stats.categoryStats.map((c) => {
    const cls = getCategoryColor(c._id);
    // Extract approximate color for Recharts from Tailwind class
    if (cls.includes('green')) return '#22c55e';
    if (cls.includes('blue')) return '#3b82f6';
    if (cls.includes('pink')) return '#ec4899';
    if (cls.includes('red')) return '#ef4444';
    if (cls.includes('yellow')) return '#eab308';
    return '#9ca3af'; // gray fallback
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Expense Distribution by Category
      </h2>

      {/* Chart Section */}
      <div className="w-full h-80 mb-8">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Text Breakdown Section */}
      <div className="space-y-3">
        {stats.categoryStats.map((category) => {
          const percentage =
            (category.totalAmount / stats.totalExpenses) * 100;
          return (
            <div
              key={category._id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${getCategoryColor(
                    category._id
                  )}`}
                ></div>
                <span className="font-medium text-gray-700">
                  {category._id}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 w-24 text-right">
                  {formatCurrency(category.totalAmount)}
                </span>
                <span className="text-sm text-gray-500 w-12 text-right">
                  ({percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
