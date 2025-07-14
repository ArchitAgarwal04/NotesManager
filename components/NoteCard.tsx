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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="h-full card-hover cursor-pointer bg-gradient-card border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 text-gray-800">{note.title}</h3>
              <p className="text-sm text-primary-500 mt-1 font-medium">{formatDate(note.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(note.id)}
                className="p-1 h-auto hover:bg-pink-50 rounded-full"
              >
                <Heart
                  className={`h-4 w-4 ${
                    note.favorite ? 'text-pink-500 fill-pink-500' : 'text-gray-400 hover:text-pink-400'
                  }`}
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-primary-50 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect border-0 shadow-xl">
                  <DropdownMenuItem onClick={() => onEdit(note)}>
                    <Edit className="h-4 w-4 mr-2 text-primary-500" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(note.id)} className="text-error-600 hover:bg-error-50">
                    <Trash2 className="h-4 w-4 mr-2 text-error-500" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div 
            className="text-gray-700 text-sm leading-relaxed mb-3 hover:text-gray-900 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? note.content : truncateContent(note.content)}
          </div>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <Badge key={tag} className="text-xs tag-gradient">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}