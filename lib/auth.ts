export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const loginApi = async (email: string, password: string): Promise<User> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Invalid credentials');
  }
  const data = await res.json();
  return { id: '', name: '', email, token: data.token };
};

export const signupApi = async (name: string, email: string, password: string): Promise<User> => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Signup failed');
  }
  const data = await res.json();
  return { id: '', name, email, token: data.token };
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const storeUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const clearStoredUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};