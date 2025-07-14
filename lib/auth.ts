export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock API functions - replace with real API calls
export const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  if (email === 'test@example.com' && password === 'password') {
    return { id: '1', name: 'John Doe', email: 'test@example.com' };
  }
  throw new Error('Invalid credentials');
};

export const mockSignup = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: '1', name, email };
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