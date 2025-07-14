'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookOpen, Bookmark, User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="glass-effect shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">NotesKeeper</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/notes"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50"
            >
              Notes
            </Link>
            <Link
              href="/bookmarks"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50"
            >
              Bookmarks
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-primary-50 hover:text-primary-600">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="btn-gradient">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/notes"
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-lg text-base font-medium hover:bg-primary-50 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Notes
              </Link>
              <Link
                href="/bookmarks"
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-lg text-base font-medium hover:bg-primary-50 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bookmarks
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-lg text-base font-medium w-full text-left hover:bg-primary-50 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-1">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-lg text-base font-medium hover:bg-primary-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-lg text-base font-medium hover:bg-primary-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}