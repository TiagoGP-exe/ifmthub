// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { signIn } from '../lib/services/auth';
import { api } from '../lib/api';

export interface UserProps {
  idUser: number
  courses: Course[]
  fullName: string
  gender: string
  dateCreated: string
  birthDate: string
  urlImgProfile: string
  status: boolean
  password: string
  email: string
  roles: Role[]
  enabled: boolean
  accountConfirmed: boolean
  authorities: Authority[]
  username: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}

export interface Course {
  idCourse: number
  description: string
  dateCreated: string
  status: boolean
}

export interface Role {
  id: number
  authority: string
}

export interface Authority {
  authority: string
}


interface AuthContextType {
  user: UserProps | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/user'); // Replace with your API endpoint.
      if (data) {
        const userData = data[0]

        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const isAuthenticated = !!Cookies.get('authToken');

    if (isAuthenticated) {
      fetchUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const signInResult = await signIn(email, password)


      if (signInResult.token) {
        Cookies.set('authToken', signInResult.token, { expires: 7 });
        fetchUser();
      }

      return true
    } catch (error) {
      console.error('Error logging in:', error);
      return false
    }
  };

  const logout = () => {
    Cookies.remove('authToken');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
