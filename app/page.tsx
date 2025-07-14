"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from '@/lib/store';
import MacCodeEditorBanner from "@/components/MacCodeEditorBanner";

const heroWords = [
  { text: "Create.", color: "text-[#FF6B81]" },
  { text: "Organize.", color: "text-[#5BE9B9]" },
  { text: "Share.", color: "text-[#FFD600]" },
  { text: "Easy.", color: "bg-[#FFD600] text-[#232946] px-2 rounded-md ml-2" },
];

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#191C3A] to-black text-white flex flex-col">
      {/* Navbar - removed, now using global Navbar */}

      {/* Hero Section */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 md:py-0 relative z-10">
        {/* Left: Headline and CTA */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-blue-400">Create.</span>{' '}
              <span className="text-green-400">Organize.</span>{' '}
              <span className="text-yellow-300">Share.</span>{' '}
              <span className="bg-white text-black px-3 py-1 rounded-md ml-2 border-2 border-black font-extrabold">Easy.</span>
            </h1>
            <p className="text-lg md:text-xl bg-gradient-to-r from-blue-300 via-gray-200 to-blue-100 bg-clip-text text-transparent mb-8 max-w-md">
              NoteNest is the best place to jot down quick thoughts or to save longer notes filled with checklists, images, web links, scanned docs, handwriting, and more.
            </p>
            <div className="flex gap-4 mb-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-8 py-3 rounded-full shadow-xl text-lg transition-all duration-200">
                  Try now for free
                </Button>
              </Link>
              <Link href="/notes">
                <Button size="lg" className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 text-white font-bold px-8 py-3 rounded-full text-lg transition-all duration-200">
                  See how it works
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <img src="/user-avatar.png" alt="Team" className="w-10 h-10 rounded-full border-2 border-blue-400" onError={e => (e.currentTarget.style.display = 'none')}/>
              <span className="text-purple-400 text-sm font-semibold">From Team NoteNest</span>
            </div>
            <div className="flex gap-3 mt-6">
              <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xl">✏️</span>
              <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xl">📋</span>
              <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xl">⭐</span>
            </div>
          </motion.div>
        </div>
        {/* Right: Illustration replaced with code editor banner */}
        <div className="flex-1 flex items-center justify-center w-full md:w-auto z-10">
          <MacCodeEditorBanner />
        </div>
        {/* Floating sticky note */}
        <motion.div
          initial={{ opacity: 0, y: -30, x: 30 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-24 right-1/3 bg-[#FFD600] text-[#232946] px-6 py-3 rounded-lg shadow-lg font-semibold text-lg z-0"
        >
          Simple Notes. Planning Tools.
        </motion.div>
      </main>
      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-400 text-sm border-t border-[#232946] bg-[#181C2A]/80 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} NoteNest. All rights reserved.</span>
          <a href="https://github.com/ArchitAgarwal04/NotesManager" target="_blank" rel="noopener noreferrer" className="text-[#5BE9B9] hover:underline flex items-center gap-1 ml-2">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}