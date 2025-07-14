import React from "react";
import { motion } from "framer-motion";

const codeLines = [
  <span key="1"><span className="text-green-400">// Welcome to NoteNest 🚀</span></span>,
  <span key="2"><span className="text-blue-400">import</span> <span className="text-pink-400">Notes</span> <span className="text-blue-400">from</span> <span className="text-yellow-300">"@notemanager/core"</span>;</span>,
  <span key="3"><span className="text-purple-400">const</span> <span className="text-pink-400">note</span> = <span className="text-yellow-300">"Your ideas, organized."</span>;</span>,
  <span key="4"><span className="text-blue-400">function</span> <span className="text-pink-400">addNote</span>(<span className="text-cyan-400">content</span>) {'{'}</span>,
  <span key="5">  <span className="text-blue-400">return</span> <span className="text-cyan-400">Notes</span>.<span className="text-pink-400">create</span>(<span className="text-cyan-400">content</span>);</span>,
  <span key="6">{'}'}</span>,
  <span key="7"><span className="text-green-400">// Try it now and boost your productivity!</span></span>,
];

const MacCodeEditorBanner = () => (
  <motion.div
    className="bg-[#23272E] rounded-2xl shadow-2xl border border-[#2D313A]/80 w-full max-w-2xl mx-auto mt-12 overflow-hidden"
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, type: "spring" }}
    whileHover={{ scale: 1.02, boxShadow: "0 12px 40px 0 rgba(0,0,0,0.7)" }}
  >
    {/* Top bar */}
    <div className="h-8 bg-[#1E2127] rounded-t-2xl flex items-center px-4">
      <span className="w-3 h-3 bg-[#FF5F56] rounded-full mr-2"></span>
      <span className="w-3 h-3 bg-[#FFBD2E] rounded-full mr-2"></span>
      <span className="w-3 h-3 bg-[#27C93F] rounded-full"></span>
    </div>
    {/* Code area */}
    <div className="bg-[#262B33] font-mono text-base text-gray-200 px-8 py-8 min-h-[260px]">
      {codeLines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  </motion.div>
);

export default MacCodeEditorBanner; 