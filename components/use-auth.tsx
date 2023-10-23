// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { signIn } from '../lib/services/auth';
import { api } from '../lib/api';

export interface UserProps {
  id: number;
  idUser: number
  email: string
  fullName: string
  gender: "M" | "F"
  dateCreated: string
  birthDate: string
  urlImgProfile?: string
  photo?: string
}


interface AuthContextType {
  user: UserProps | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/me');

      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = !!Cookies.get('authToken');

    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const signInResult = await signIn(email, password)

      if (signInResult.token) {
        Cookies.set('authToken', signInResult.token, { expires: new Date(Date.now() + 60 * 60 * 1000) });
        fetchUser();
      }

      return true
    } catch (error) {
      console.error('Error logging in:', error);
      return false
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('authToken');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
