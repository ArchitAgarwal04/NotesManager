'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Edit, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Note } from '@/lib/store';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="bg-[#23272E] rounded-xl shadow-2xl border border-[#2D313A]/80 p-0 overflow-hidden">
      {/* Editor Top Bar */}
      <div className="h-8 bg-[#1E2127] rounded-t-xl flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#FF5F56] rounded-full mr-1"></span>
          <span className="w-3 h-3 bg-[#FFBD2E] rounded-full mr-1"></span>
          <span className="w-3 h-3 bg-[#27C93F] rounded-full"></span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="p-1 h-7 w-7 text-gray-400 hover:text-white" onClick={() => onToggleFavorite(note.id)}>
            <Heart className={`h-4 w-4 ${note.favorite ? 'fill-current text-pink-500' : ''}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-1 h-7 w-7 text-gray-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(note)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(note.id)} className="text-error-600 hover:bg-error-50">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Title */}
      <div className="font-mono text-white text-base px-4 pt-3 pb-2 truncate">
        {note.title}
      </div>
      {/* Content */}
      <div className="font-mono text-gray-200 text-sm px-4 pb-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? note.content : truncateContent(note.content)}
      </div>
      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 mb-2">
          {note.tags.map(tag => (
            <span key={tag} className="bg-[#2D313A] text-xs text-gray-400 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      )}
      {/* Meta */}
      <div className="text-xs text-gray-500 px-4 pb-2">
        {formatDate(new Date(note.createdAt))}
      </div>
    </div>
  );
}