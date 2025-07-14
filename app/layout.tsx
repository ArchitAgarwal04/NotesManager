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
  const showNavbar = pathname !== '/login' && pathname !== '/signup';

  return (
    <html lang="en">
      <body className={inter.className}>
        {showNavbar && <Navbar />}
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}