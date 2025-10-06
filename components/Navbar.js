'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, readToken, removeToken } from '../lib/authenticate';

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const authenticated = isAuthenticated();
  const user = readToken();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    removeToken();
    setActiveDropdown(null);
    router.push('/');
    router.refresh(); // Refresh to update the UI
  };

  // Menu items for authenticated users
  const authenticatedMenuItems = [
    {
      name: 'Ledgerify',
      items: [
        {
          title: 'Income Tracker',
          items: [
            { name: 'Income List', href: '/income-list' },
            { name: 'Add Income', href: '/add-income' },
            { name: 'Add Category', href: '/add-income-category' },
          ],
        },
        {
          title: 'Expenses Tracker',
          items: [
            { name: 'Expense List', href: '/expense/list' },
            { name: 'Add Expense', href: '/expense/add' },
            { name: 'Add Category', href: '/add-category' },
          ],
        },
      ],
    },
    {
      name: 'Budgetify',
      items: [
        { name: 'Coming Soon!🔒', href: '/' },
        { name: 'Coming Soon!🔒', href: '/' },
      ],
    },
    {
      name: 'Investify',
      items: [
        { name: 'Coming Soon!🔒', href: '/' },
        { name: 'Coming Soon!🔒', href: '/' },
      ],
    },
    {
      name: 'Savify',
      items: [
        { name: 'Savings Goal List', href: '/savings-goal-list' },
        { name: 'Add Savings Goal', href: '/add-savings-goal' },
      ],
    },
    {
      name: 'Other Tools',
      items: [
        { name: 'Tax Calculator', href: '/tax-calculator' },
        { name: 'Currency Converter', href: '/currency-converter' },
      ],
    },
  ];

  // Public menu items (always visible)
  const publicMenuItems = [
    {
      name: 'Tools',
      items: [
        { name: 'Tax Calculator', href: '/tax-calculator' },
        { name: 'Currency Converter', href: '/currency-converter' },
      ],
    },
  ];

  const menuItems = authenticated ? authenticatedMenuItems : publicMenuItems;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-2xl">💸</span>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Fin-Craft Studios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                pathname === '/' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Home
            </Link>

            {menuItems.map((item) => (
              <li
                key={item.name}
                ref={dropdownRef}
                className="relative list-none"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium flex items-center space-x-1"
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    {/* Multi-level dropdown */}
                    {item.items[0]?.items ? (
                      item.items.map((group, groupIndex) => (
                        <div key={groupIndex} className="border-b border-gray-100 last:border-b-0">
                          <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">
                            {group.title}
                          </div>
                          {group.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      // Simple dropdown
                      item.items.map((menuItem, index) => (
                        <Link
                          key={index}
                          href={menuItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {menuItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </li>
            ))}

            {/* Authentication Links */}
            {authenticated ? (
              <li ref={dropdownRef} className="relative list-none">
                <button
                  onClick={() => toggleDropdown('user')}
                  className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
                >
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                    {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                  <span>Account</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === 'user' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === 'user' && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                      Signed in as <strong>{user?.userName}</strong>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    pathname === '/login'
                      ? 'bg-white/20 text-white'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'mobile' ? null : 'mobile')}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {activeDropdown === 'mobile' && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 py-2 border border-gray-200">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100"
              onClick={() => setActiveDropdown(null)}
            >
              Home
            </Link>

            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => toggleDropdown(`mobile-${item.name}`)}
                  className="w-full flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === `mobile-${item.name}` ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === `mobile-${item.name}` && (
                  <div className="bg-gray-50 py-2">
                    {item.items[0]?.items ? (
                      item.items.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          <div className="px-6 py-2 text-sm font-semibold text-gray-600">
                            {group.title}
                          </div>
                          {group.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-8 py-2 text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      item.items.map((menuItem, index) => (
                        <Link
                          key={index}
                          href={menuItem.href}
                          className="block px-6 py-2 text-sm text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {menuItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Authentication Links */}
            <div className="border-t border-gray-100 pt-2">
              {authenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 border-b border-gray-100">
                    Signed in as <strong>{user?.userName}</strong>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 border-b border-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-3 text-blue-600 hover:bg-blue-50 border-b border-gray-100"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;