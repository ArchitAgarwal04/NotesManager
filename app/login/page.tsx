'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/notes');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#191C3A] to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#23272E] rounded-xl shadow-2xl border border-[#2D313A]/80 p-8">
        <div className="text-center mb-8">
          <span className="text-3xl font-extrabold text-white font-mono">Sign In</span>
          <p className="text-gray-400 mt-2">Welcome back to your digital memory</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#181A20] border border-white/10 text-white placeholder:text-gray-400 rounded-md px-4 py-2 text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#181A20] border border-white/10 text-white placeholder:text-gray-400 rounded-md px-4 py-2 text-sm"
              required
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-full py-3 shadow-lg mt-2">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:underline font-medium">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}