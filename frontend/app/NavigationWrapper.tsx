// NavigationWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';

export function NavigationWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';
  
  if (isAuthPage) {
    return null;
  }
  
  return <Navigation />;
}