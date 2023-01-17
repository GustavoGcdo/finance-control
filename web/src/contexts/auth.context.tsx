import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginDto } from '../models/dtos/login.dto';
import api from '../services/api';
import * as authService from '../services/auth.service';

type User = {
  email: string;
};

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(loginDto: any): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children?: React.ReactNode
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      // await new Promise((resolve) => setTimeout(resolve, 900));
      const { storagedUser, storagedToken } = getAuthItemsFromLocalStorage();

      if (storagedUser && storagedToken) {
        setDefaulHeaderToken(JSON.parse(storagedToken));
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (loginDto: LoginDto) => {
    const response = await authService.signIn(loginDto);
    const { data } = response;
    const { token } = data;

    saveInLocalStorage(loginDto.email, token);
    setDefaulHeaderToken(token);
    setUser(loginDto);
  };

  const signOut = () => {
    setUser(null);
    cleanAuthItemsFromLocalStorage();
  };

  const cleanAuthItemsFromLocalStorage = () => {
    localStorage.removeItem('@RJSAuth:user');
    localStorage.removeItem('@RJSAuth:token');
  };

  const setDefaulHeaderToken = (token: string) => {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  };

  const saveInLocalStorage = (email: string, token: string) => {
    localStorage.setItem('@RJSAuth:user', JSON.stringify({ email }));
    localStorage.setItem('@RJSAuth:token', JSON.stringify(token));
  };

  const getAuthItemsFromLocalStorage = () => {
    const storagedUser = localStorage.getItem('@RJSAuth:user') || '';
    const storagedToken = localStorage.getItem('@RJSAuth:token') || '';

    return { storagedUser, storagedToken };
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
