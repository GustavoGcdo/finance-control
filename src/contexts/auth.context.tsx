import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/auth.service';
import api from '../services/api';
import { LoginDto } from '../models/dtos/login.dto';

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

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      // await new Promise((resolve) => setTimeout(resolve, 900));
      const { storagedUser, storagedToken } = getAuthItemsFromLocalStorage();

      if (storagedUser && storagedToken) {
        setDefaulHeaderToken(storagedToken);
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (loginDto: LoginDto) => {
    const response = await authService.signIn(loginDto);
    console.log(response);

    const { data } = response;
    const { token } = data;

    setUser(loginDto);
    saveInLocalStorage(loginDto.email, token);
    setDefaulHeaderToken(token);
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
    api.defaults.headers['Authorizarion'] = `Bearer ${token}`;
  };

  const saveInLocalStorage = (email: string, token: string) => {
    localStorage.setItem('@RJSAuth:user', JSON.stringify({ email }));
    localStorage.setItem('@RJSAuth:token', JSON.stringify(token));
  };

  const getAuthItemsFromLocalStorage = () => {
    const storagedUser = localStorage.getItem('@RJSAuth:user');
    const storagedToken = localStorage.getItem('@RJSAuth:token');
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
