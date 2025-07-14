import { create } from 'zustand';
import { User, loginApi, signupApi, getStoredUser, storeUser, clearStoredUser } from './auth';

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
      const user = await loginApi(email, password);
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
      const user = await signupApi(name, email, password);
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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Note {
  id: string;
  _id?: string;
  title: string;
  content: string;
  tags: string[];
  favorite: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface NotesState {
  notes: Note[];
  searchTerm: string;
  selectedTags: string[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleFavorite: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  searchTerm: '',
  selectedTags: [],
  fetchNotes: async () => {
    const user = getStoredUser();
    if (!user) return;
    let url = `${BASE_URL}/notes`;
    const { searchTerm, selectedTags } = get();
    const params = [];
    if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
    if (selectedTags.length > 0) params.push(`tags=${selectedTags.join(',')}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    set({ notes: data.map((n: any) => ({ ...n, id: n._id })) });
  },
  addNote: async (note) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error('Failed to add note');
    await get().fetchNotes();
  },
  updateNote: async (id, updates) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update note');
    await get().fetchNotes();
  },
  deleteNote: async (id) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) throw new Error('Failed to delete note');
    await get().fetchNotes();
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  toggleFavorite: async (id) => {
    const note = get().notes.find((n) => n.id === id);
    if (!note) return;
    await get().updateNote(id, { favorite: !note.favorite });
  },
}));

export interface Bookmark {
  id: string;
  _id?: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  favorite: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface BookmarksState {
  bookmarks: Bookmark[];
  searchTerm: string;
  selectedTags: string[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleFavorite: (id: string) => Promise<void>;
  fetchBookmarks: () => Promise<void>;
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [],
  searchTerm: '',
  selectedTags: [],
  fetchBookmarks: async () => {
    const user = getStoredUser();
    if (!user) return;
    let url = `${BASE_URL}/bookmarks`;
    const { searchTerm, selectedTags } = get();
    const params = [];
    if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
    if (selectedTags.length > 0) params.push(`tags=${selectedTags.join(',')}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    set({ bookmarks: data.map((b: any) => ({ ...b, id: b._id })) });
  },
  addBookmark: async (bookmark) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(bookmark),
    });
    if (!res.ok) throw new Error('Failed to add bookmark');
    await get().fetchBookmarks();
  },
  updateBookmark: async (id, updates) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update bookmark');
    await get().fetchBookmarks();
  },
  deleteBookmark: async (id) => {
    const user = getStoredUser();
    if (!user) return;
    const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) throw new Error('Failed to delete bookmark');
    await get().fetchBookmarks();
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  toggleFavorite: async (id) => {
    const bookmark = get().bookmarks.find((b) => b.id === id);
    if (!bookmark) return;
    await get().updateBookmark(id, { favorite: !bookmark.favorite });
  },
}));