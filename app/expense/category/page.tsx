"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { getToken } from '@/lib/authenticate';

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name.trim()) {
    toast.error("Please enter a category name.");
    return;
  }

  setLoading(true);
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expense-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${token}`, // ✅ Correct prefix
      },
      body: JSON.stringify({ name, color }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("✅ Category added successfully!");
      router.push("/expense/list");
    } else {
      toast.error(data?.message || "Failed to add category.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Expense Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Food, Travel, Bills..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border"
              />
              <span
                className="text-sm text-gray-600"
                style={{ color: color }}
              >
                {color.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 transition duration-200 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
