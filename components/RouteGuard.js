'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/authenticate';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if current route is public
    const publicPaths = ['/login', '/register', '/', '/tax-calculator', '/currency-converter'];
    const path = router.pathname;

    // If accessing public route, allow access
    if (publicPaths.includes(path)) {
      setAuthorized(true);
      return;
    }

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated()) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  return authorized ? children : null;
};

export default RouteGuard;