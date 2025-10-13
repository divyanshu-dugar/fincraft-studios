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
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const router = useRouter();

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [selectedCategory, dateRange]);

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

  const getCategoryColor = (category) => {
    const name = category?.name || 'Other';
    const colors = {
      Food: 'bg-red-100 text-red-800',
      Transportation: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-yellow-100 text-yellow-800',
      Bills: 'bg-green-100 text-green-800',
      Healthcare: 'bg-pink-100 text-pink-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[name] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Manage and analyze your expenses</p>
        </header>

        {stats && (
          <>
            <ExpenseStats stats={stats} formatCurrency={formatCurrency} />
            <ExpenseDistribution
              stats={stats}
              formatCurrency={formatCurrency}
              getCategoryColor={getCategoryColor}
            />
          </>
        )}

        <ExpenseFilters
          stats={stats}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          router={router}
        />

        <ExpenseTable
          expenses={expenses}
          router={router}
          deleteExpense={deleteExpense}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          getCategoryColor={getCategoryColor}
        />

        {expenses.length > 0 && (
          <ExpenseSummary expenses={expenses} formatCurrency={formatCurrency} />
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
