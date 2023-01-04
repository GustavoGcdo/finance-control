import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginDto } from '../models/dtos/login.dto';
import api from '../services/api';
import * as authService from '../services/auth.service';
import AsyncStorage from "@react-native-community/async-storage";

type User = {
  email: string;
};

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(loginDto: LoginDto): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const { storagedUser, storagedToken } = await getAuthItemsFromLocalStorage();

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

    await saveInLocalStorage(loginDto.email, token);
    setDefaulHeaderToken(token);
    setUser(loginDto);
  };

  const signOut = () => {
    cleanAuthItemsFromLocalStorage().then(() => {
      setUser(null);
    });
  };

  const cleanAuthItemsFromLocalStorage = async () => {
    await AsyncStorage.removeItem('@RJSAuth:user');
    await AsyncStorage.removeItem('@RJSAuth:token');
  };

  const setDefaulHeaderToken = (token: string) => {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  };

  const saveInLocalStorage = async (email: string, token: string) => {    
    await AsyncStorage.setItem('@RJSAuth:user', JSON.stringify({ email }));
    await AsyncStorage.setItem('@RJSAuth:token', JSON.stringify(token));
  };

  const getAuthItemsFromLocalStorage = async () => {
    const storagedUser = await AsyncStorage.getItem('@RJSAuth:user') || '';
    const storagedToken = await AsyncStorage.getItem('@RJSAuth:token') || '';

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
