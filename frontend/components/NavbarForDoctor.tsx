'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Menu, X, User, LogOut, CreditCard, Calendar, Bell } from 'lucide-react'

interface Doctor {
  name: string
  email: string
  avatar?: string
}

export default function NavBarForDoctor() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    const doctorData = localStorage.getItem('doctorData')
    if (doctorData) {
      setDoctor(JSON.parse(doctorData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('doctorToken')
    localStorage.removeItem('doctorData')
    setDoctor(null)
    router.push('/doctor/auth')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  const navItems = [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: Calendar },
    { href: '/doctor/transactions', label: 'Transactions', icon: CreditCard },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo/Brand */}
            <Link href="/doctor/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-primary">HealthConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center space-x-2 ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {doctor ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 ml-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(doctor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                       {doctor.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default"
                onClick={() => router.push('/auth/doctor')}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {doctor ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(doctor.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Dr. {doctor.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {doctor.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2">
                <Button 
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    router.push('/auth/doctor')
                    setIsMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

