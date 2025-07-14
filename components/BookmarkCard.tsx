'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Edit, Trash2, ExternalLink, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bookmark } from '@/lib/store';
import { motion } from 'framer-motion';

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onEdit, onDelete, onToggleFavorite }: BookmarkCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="h-full card-hover bg-gradient-card border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 text-gray-800">{bookmark.title}</h3>
              <p className="text-sm text-secondary-500 mt-1 font-medium">{getDomain(bookmark.url)}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(bookmark.createdAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(bookmark.id)}
                className="p-1 h-auto hover:bg-pink-50 rounded-full"
              >
                <Heart
                  className={`h-4 w-4 ${
                    bookmark.favorite ? 'text-pink-500 fill-pink-500' : 'text-gray-400 hover:text-pink-400'
                  }`}
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-secondary-50 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect border-0 shadow-xl">
                  <DropdownMenuItem onClick={() => onEdit(bookmark)}>
                    <Edit className="h-4 w-4 mr-2 text-secondary-500" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(bookmark.id)} className="text-error-600 hover:bg-error-50">
                    <Trash2 className="h-4 w-4 mr-2 text-error-500" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
            {bookmark.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {bookmark.tags.map(tag => (
                <Badge key={tag} className="text-xs tag-gradient">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline" 
              size="sm"
              asChild
              className="flex items-center gap-1 hover:bg-secondary-50 hover:border-secondary-300 transition-all duration-200"
            >
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 text-secondary-500" />
                Visit
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}