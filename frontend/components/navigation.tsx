'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar, Wallet, BarChart3, LogIn, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NAVIGATION_ITEMS = [
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
] as const;

function NavigationItem({
  name,
  href,
  icon: Icon,
  isActive
}: {
  name: string;
  href: string;
  icon: typeof Calendar;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105',
        isActive 
          ? 'bg-primary text-primary-foreground shadow-lg' 
          : 'hover:bg-muted hover:shadow-md'
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className="font-medium">{name}</span>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if( token ){
      setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="w-full border-b bg-white/50 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-primary">
            HealthConnect
          </Link>

          {/* Navigation Items */}
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                {/* Main Navigation */}
                <div className="flex space-x-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <NavigationItem
                      key={item.name}
                      {...item}
                      isActive={pathname === item.href}
                    />
                  ))}
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem('token');
                        setIsAuthenticated(false);
                        window.location.href = '/auth';
                      }}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link
                href="/auth"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:scale-105 duration-200"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;