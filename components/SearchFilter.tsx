'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Tag, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  placeholder?: string;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagsChange,
  availableTags,
  placeholder = "Search...",
}: SearchFilterProps) {
  const [showTags, setShowTags] = useState(false);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onSearchChange('');
    onTagsChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 input-focus border-primary-200 bg-white/80"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowTags(!showTags)}
            className="flex items-center gap-2 hover:bg-primary-50 hover:border-primary-300 bg-white/80"
          >
            <Tag className="h-4 w-4 text-primary-500" />
            Tags
          </Button>
          {(searchTerm || selectedTags.length > 0) && (
            <Button variant="outline" onClick={clearFilters} className="hover:bg-error-50 hover:border-error-300 bg-white/80">
              <X className="h-4 w-4 text-error-500" />
            </Button>
          )}
        </div>
      </div>

      {showTags && (
        <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
          {availableTags.map(tag => (
            <Badge
              key={tag}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag) 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md' 
                  : 'bg-white hover:bg-primary-100 border-primary-200 text-primary-700'
              }`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Filtered by:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} className="flex items-center gap-1 bg-gradient-to-r from-accent-100 to-primary-100 text-accent-700 border border-accent-200">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-error-500 transition-colors" 
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}