'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/authenticate';
import ExpenseStats from './ExpenseStats';
import ExpenseDistribution from './ExpenseDistribution';
import ExpenseFilters from './ExpenseFilters';
import ExpenseTable from './ExpenseTable';
import ExpenseSummary from './ExpenseSummary';
import LoadingSpinner from './LoadingSpinner';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const router = useRouter();

  // 🟢 Load all data when filters change
  useEffect(() => {
    fetchCategories();
    fetchExpenses();
    fetchStats();
  }, [selectedCategory, dateRange]);

  // 🟣 Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense-categories`);
      if (!res.ok) throw new Error('Failed to load categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // 🟣 Fetch expenses
  const fetchExpenses = async () => {
    try {
      const token = getToken();
      let url = `${process.env.NEXT_PUBLIC_API_URL}/expenses`;

      if (selectedCategory !== 'all')
        url = `${process.env.NEXT_PUBLIC_API_URL}/expenses/category/${selectedCategory}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `jwt ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🟣 Fetch aggregated stats
  const fetchStats = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/stats`, {
        headers: { Authorization: `jwt ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // 🟣 Delete expense
  const deleteExpense = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try {
      const token = getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `jwt ${token}` },
      });

      if (res.ok) {
        setExpenses(expenses.filter((e) => e._id !== id));
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // 🟣 Utility formatters
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Manage and analyze your expenses</p>
        </header>

        {/* Stats and Distribution */}
        {stats && (
          <>
            <ExpenseStats stats={stats} formatCurrency={formatCurrency} />
            <ExpenseDistribution
              stats={stats}
              formatCurrency={formatCurrency}
            />
          </>
        )}

        {/* Filters */}
        <ExpenseFilters
          stats={stats}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          router={router}
        />

        {/* Table */}
        <ExpenseTable
          expenses={expenses}
          router={router}
          deleteExpense={deleteExpense}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        {/* Summary */}
        {expenses.length > 0 && (
          <ExpenseSummary expenses={expenses} formatCurrency={formatCurrency} />
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
