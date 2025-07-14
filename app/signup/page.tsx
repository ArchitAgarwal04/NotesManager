'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(name, email, password);
      toast.success('Account created successfully!');
      router.push('/notes');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      toast.error(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#191C3A] to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#23272E] rounded-xl shadow-2xl border border-[#2D313A]/80 p-8">
        <div className="text-center mb-8">
          <span className="text-3xl font-extrabold text-white font-mono">Sign Up</span>
          <p className="text-gray-400 mt-2">Create your digital memory account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#181A20] border border-white/10 text-white placeholder:text-gray-400 rounded-md px-4 py-2 text-sm"
              required
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button type="submit" className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full py-3 shadow-lg mt-2">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-green-400 hover:underline font-medium">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}