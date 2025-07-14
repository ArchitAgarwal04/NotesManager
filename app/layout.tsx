'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { initializeAuth } = useAuthStore();
  
  const hideNavbar = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {!hideNavbar && <Navbar />}
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}