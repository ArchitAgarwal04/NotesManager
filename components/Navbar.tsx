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
import { BookOpen, Bookmark, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16">
        {/* Brand */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center select-none">
            <span className="text-2xl font-extrabold tracking-tight flex items-center">
              <span className="text-white">NoteNest</span>
              <span className="text-white text-3xl ml-1">.</span>
            </span>
          </Link>
        </div>
        {/* Menu */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-x-8 items-center">
            <li>
              <Link href="/notes" className="text-white font-medium text-base hover:text-gray-300 transition-colors">
                Notes
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="text-white font-medium text-base hover:text-gray-300 transition-colors">
                Bookmarks
              </Link>
            </li>
          </ul>
        </div>
        {/* Login/Profile */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20">
                  <span className="text-white font-bold text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-4 py-2 text-center font-semibold text-white border-b border-white/10 mb-1">
                  {user.name}
                </div>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button className="bg-white text-black font-semibold px-7 py-2 rounded-full shadow border border-white/20 transition-all text-base">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}