// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
const jwt = require('jsonwebtoken');
import { useCookies } from 'react-cookie';
import axios from 'axios';

interface AuthContextData {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}


interface AuthProviderProps {
    children: ReactNode;
}





const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};






export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [token, setToken] = useState(null);




  useEffect(() => {
    const storaedToken = cookies.token; // Lê o token do cookie
    if (storaedToken) {
      try {
        const decodedToken = jwt.verify(storaedToken, 'seu_segredo_aqui');
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          setToken(storaedToken);
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
      }
    }
  }, [cookies]);







  const login = () => {
    // Lógica de login (defina o estado para true)
    setIsLoggedIn(true);
    setCookie('token', 'seu_token_aqui', { path: '/' }); // Substitua 'seu_token_aqui' pelo token recebido do servidor
  };







  const logout = async () => {

    try {
        // Chamar a rota de logout no servidor
        await axios.post('/api/logout');
        // Lógica de logout (defina o estado para false)
        setIsLoggedIn(false);
        removeCookie('token', { path: '/' });
        window.location.href = '/login';
      } catch (error) {
        console.error('Erro ao efetuar logout:', error);
      }

    
  };





  const authContextValue: AuthContextData = {
    isLoggedIn,
    login,
    logout,
  };


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );


};
