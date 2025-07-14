import { create } from 'zustand';
import { User, mockLogin, mockSignup, getStoredUser, storeUser, clearStoredUser } from './auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const user = await mockLogin(email, password);
      storeUser(user);
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    try {
      const user = await mockSignup(name, email, password);
      storeUser(user);
      set({ user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: () => {
    clearStoredUser();
    set({ user: null });
  },
  initializeAuth: () => {
    const user = getStoredUser();
    set({ user });
  },
}));

// Notes store
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesState {
  notes: Note[];
  searchTerm: string;
  selectedTags: string[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleFavorite: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [
    {
      id: '1',
      title: 'Welcome to Notes',
      content: 'This is your first note. You can edit or delete it anytime.',
      tags: ['welcome', 'demo'],
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Important points from today\'s meeting:\n- Project deadline: Next Friday\n- Need to review design mockups\n- Schedule follow-up meeting',
      tags: ['work', 'meeting'],
      favorite: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  searchTerm: '',
  selectedTags: [],
  addNote: (note) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ notes: [newNote, ...state.notes] }));
  },
  updateNote: (id, updates) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
      ),
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  toggleFavorite: (id) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      ),
    }));
  },
}));

// Bookmarks store
export interface Bookmark {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  searchTerm: string;
  selectedTags: string[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleFavorite: (id: string) => void;
}

export const useBookmarksStore = create<BookmarksState>((set) => ({
  bookmarks: [
    {
      id: '1',
      url: 'https://tailwindcss.com',
      title: 'Tailwind CSS',
      description: 'A utility-first CSS framework for rapidly building custom designs.',
      tags: ['css', 'framework', 'development'],
      favorite: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      url: 'https://nextjs.org',
      title: 'Next.js',
      description: 'The React framework for production applications.',
      tags: ['react', 'framework', 'development'],
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  searchTerm: '',
  selectedTags: [],
  addBookmark: (bookmark) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ bookmarks: [newBookmark, ...state.bookmarks] }));
  },
  updateBookmark: (id, updates) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates, updatedAt: new Date() } : bookmark
      ),
    }));
  },
  deleteBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    }));
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  toggleFavorite: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, favorite: !bookmark.favorite } : bookmark
      ),
    }));
  },
}));