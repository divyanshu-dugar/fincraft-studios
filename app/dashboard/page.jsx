"use client";

import { useState, useEffect } from "react";
import { getToken } from "@/lib/authenticate";
import ExpenseStats from "@/components/expenses/ExpenseStats";
import ExpenseDistribution from "@/components/expenses/ExpenseDistribution";
import LoadingSpinner from "@/components/expenses/LoadingSpinner";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const loadDashboardData = async () => {
    try {
      const token = getToken();

      // 🟣 Fetch all expenses
      const expenseRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses`,
        {
          headers: { Authorization: `jwt ${token}` },
        }
      );
      if (!expenseRes.ok) throw new Error("Failed to fetch expenses");
      const expensesData = await expenseRes.json();
      setExpenses(expensesData);

      // 🟣 Fetch aggregated stats
      const statsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/stats`,
        {
          headers: { Authorization: `jwt ${token}` },
        }
      );
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // 🧠 Send data to AI analyzer
      if (expensesData.length > 0) {
        const aiRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/analyze`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expenses: expensesData }),
          }
        );
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          setInsight(aiData.insight);
        } else {
          setInsight(null);
        }
      } else {
        setInsight(null);
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setInsight(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg mb-4">
            <span className="text-3xl text-white">📊</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your complete financial overview with intelligent insights and analytics
          </p>
        </div>

        {/* AI Insight Card */}
        {insight && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-white to-blue-50/50 border border-blue-100/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💡</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
                      Smart Insight
                    </h2>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                      AI Powered
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {insight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Stats Section - Takes 2/3 on large screens */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
                  Expense Statistics
                </h2>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 text-lg">📈</span>
                </div>
              </div>
              
              {stats ? (
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <ExpenseStats stats={stats} formatCurrency={formatCurrency} />
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-gray-400">📊</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-600">No Data Available</h3>
                  <p className="text-gray-500 text-lg">Start adding expenses to see your financial statistics</p>
                </div>
              )}
            </div>
          </div>

          {/* Distribution Section - Takes 1/3 on large screens */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                  Distribution
                </h2>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-purple-600 text-lg">🥗</span>
                </div>
              </div>

              {expenses.length > 0 ? (
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <ExpenseDistribution stats={stats} formatCurrency={formatCurrency} />
                </div>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <span className="text-3xl text-purple-400">💸</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-700">No Expenses Yet</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Add your first expense to see the beautiful spending breakdown and distribution charts
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Add First Expense
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">{expenses.length}</div>
              <div className="text-gray-600 text-sm font-medium">Total Expenses</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {stats ? formatCurrency(stats.totalAmount || 0) : '$0.00'}
              </div>
              <div className="text-gray-600 text-sm font-medium">Total Spent</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {stats ? (stats.averageAmount || 0).toFixed(2) : '0.00'}
              </div>
              <div className="text-gray-600 text-sm font-medium">Average per Expense</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}