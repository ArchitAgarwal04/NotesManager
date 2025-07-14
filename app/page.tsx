'use client';

import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Bookmark, Search, Star, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (user) {
      router.push('/notes');
    }
  }, [user, router]);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Smart Notes",
      description: "Create, organize and search through your notes with powerful tagging and filtering."
    },
    {
      icon: <Bookmark className="h-8 w-8 text-green-600" />,
      title: "Bookmark Manager",
      description: "Save and organize your favorite websites with automatic title fetching and descriptions."
    },
    {
      icon: <Search className="h-8 w-8 text-purple-600" />,
      title: "Powerful Search",
      description: "Find anything instantly with full-text search across all your notes and bookmarks."
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Favorites",
      description: "Mark important notes and bookmarks as favorites for quick access."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Secure",
      description: "Your data is protected with modern security practices and encrypted storage."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Lightning Fast",
      description: "Built with performance in mind - everything loads instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Digital
            <span className="text-yellow-300"> Memory</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Capture thoughts, organize ideas, and bookmark the web. 
            NotesKeeper helps you remember everything that matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3 bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-white relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, powerful tools to capture, organize, and find your information when you need it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full card-hover bg-gradient-card border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg">
                      {React.cloneElement(feature.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start organizing your digital life today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of users who trust NotesKeeper to keep their thoughts and bookmarks organized.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3 bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                Create Your Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}