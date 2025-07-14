'use client';

import { useState, useMemo } from 'react';
import { useBookmarksStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus, Bookmark, Heart } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchFilter from '@/components/SearchFilter';
import BookmarkCard from '@/components/BookmarkCard';
import BookmarkModal from '@/components/BookmarkModal';
import { Bookmark as BookmarkType } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function Bookmarks() {
  const {
    bookmarks,
    searchTerm,
    selectedTags,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    setSearchTerm,
    setSelectedTags,
    toggleFavorite,
  } = useBookmarksStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<BookmarkType | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredBookmarks = useMemo(() => {
    let filtered = bookmarks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(bookmark =>
        selectedTags.every(tag => bookmark.tags.includes(tag))
      );
    }

    // Filter by favorites
    if (showFavorites) {
      filtered = filtered.filter(bookmark => bookmark.favorite);
    }

    return filtered;
  }, [bookmarks, searchTerm, selectedTags, showFavorites]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    bookmarks.forEach(bookmark => {
      bookmark.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [bookmarks]);

  const handleAddBookmark = () => {
    setEditingBookmark(null);
    setIsModalOpen(true);
  };

  const handleEditBookmark = (bookmark: BookmarkType) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleDeleteBookmark = (id: string) => {
    deleteBookmark(id);
    toast.success('Bookmark deleted successfully');
  };

  const handleSaveBookmark = (bookmarkData: Omit<BookmarkType, 'id' | 'createdAt' | 'updatedAt'>) => {
    addBookmark(bookmarkData);
    toast.success('Bookmark added successfully');
  };

  const handleUpdateBookmark = (id: string, updates: Partial<BookmarkType>) => {
    updateBookmark(id, updates);
    toast.success('Bookmark updated successfully');
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    const bookmark = bookmarks.find(b => b.id === id);
    if (bookmark) {
      toast.success(bookmark.favorite ? 'Removed from favorites' : 'Added to favorites');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div>
              <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl">
                  <Bookmark className="h-6 w-6 text-white" />
                </div>
                My Bookmarks
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-4">
                {bookmarks.length} bookmarks • {bookmarks.filter(b => b.favorite).length} favorites
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  showFavorites 
                    ? 'favorite-gradient border-pink-500 shadow-lg' 
                    : 'hover:bg-secondary-50 hover:border-secondary-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
                Favorites
              </Button>
              <Button onClick={handleAddBookmark} className="flex items-center gap-2 btn-gradient-accent">
                <Plus className="h-4 w-4" />
                Add Bookmark
              </Button>
            </div>
          </div>

          <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={allTags}
              placeholder="Search bookmarks..."
            />
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-4 bg-gradient-to-r from-secondary-100 to-accent-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Bookmark className="h-10 w-10 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || selectedTags.length > 0 || showFavorites
                  ? 'No bookmarks found'
                  : 'No bookmarks yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedTags.length > 0 || showFavorites
                  ? 'Try adjusting your search or filters'
                  : 'Add your first bookmark to get started'}
              </p>
              {!searchTerm && selectedTags.length === 0 && !showFavorites && (
                <Button onClick={handleAddBookmark} className="flex items-center gap-2 btn-gradient-accent">
                  <Plus className="h-4 w-4" />
                  Add Bookmark
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredBookmarks.map(bookmark => (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onEdit={handleEditBookmark}
                    onDelete={handleDeleteBookmark}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <BookmarkModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveBookmark}
            onUpdate={handleUpdateBookmark}
            editingBookmark={editingBookmark}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}