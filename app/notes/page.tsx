'use client';

import { useState, useMemo } from 'react';
import { useNotesStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Heart } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchFilter from '@/components/SearchFilter';
import NoteCard from '@/components/NoteCard';
import NoteModal from '@/components/NoteModal';
import { Note } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function Notes() {
  const {
    notes,
    searchTerm,
    selectedTags,
    addNote,
    updateNote,
    deleteNote,
    setSearchTerm,
    setSelectedTags,
    toggleFavorite,
  } = useNotesStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      );
    }

    // Filter by favorites
    if (showFavorites) {
      filtered = filtered.filter(note => note.favorite);
    }

    return filtered;
  }, [notes, searchTerm, selectedTags, showFavorites]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [notes]);

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast.success('Note deleted successfully');
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    addNote(noteData);
    toast.success('Note created successfully');
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    updateNote(id, updates);
    toast.success('Note updated successfully');
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    const note = notes.find(n => n.id === id);
    if (note) {
      toast.success(note.favorite ? 'Removed from favorites' : 'Added to favorites');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div>
              <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                My Notes
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-4">
                {notes.length} notes • {notes.filter(n => n.favorite).length} favorites
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  showFavorites 
                    ? 'favorite-gradient border-pink-500 shadow-lg' 
                    : 'hover:bg-primary-50 hover:border-primary-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
                Favorites
              </Button>
              <Button onClick={handleAddNote} className="flex items-center gap-2 btn-gradient">
                <Plus className="h-4 w-4" />
                Add Note
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
              placeholder="Search notes..."
            />
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || selectedTags.length > 0 || showFavorites
                  ? 'No notes found'
                  : 'No notes yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedTags.length > 0 || showFavorites
                  ? 'Try adjusting your search or filters'
                  : 'Create your first note to get started'}
              </p>
              {!searchTerm && selectedTags.length === 0 && !showFavorites && (
                <Button onClick={handleAddNote} className="flex items-center gap-2 btn-gradient">
                  <Plus className="h-4 w-4" />
                  Create Note
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <NoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveNote}
            onUpdate={handleUpdateNote}
            editingNote={editingNote}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}