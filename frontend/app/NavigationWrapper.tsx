// components/NavigationWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';

export function NavigationWrapper() {
  const pathname = usePathname();

  // Array of paths where navigation should be hidden
  const hiddenNavigationPaths = [
    '/auth',
    '/doctor/auth',
    '/doctor/dashboard',
    '/doctor/transactions'
  ];

  // Check if current pathname matches any of the hidden paths
  const shouldHideNavigation = hiddenNavigationPaths.some(path => 
    pathname.startsWith(path)
  );

  if (shouldHideNavigation) {
    return null;
  }

  return <Navigation />;
}