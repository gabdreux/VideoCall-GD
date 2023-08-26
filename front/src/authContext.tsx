// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';


interface AuthContextData {
  login: () => void;
  logout: () => void;
}


interface AuthProviderProps {
    children: ReactNode;
}



const AuthContext = createContext<AuthContextData | undefined>(undefined);




export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);



  const login = () => {
    setCookie('isLoggedIn', 'true', { maxAge: 3600 });
  };




  const logout = async () => {

    try {
        // Chamar a rota de logout no servidor
        await axios.post('http://localhost:5000/api/logout');
        removeCookie('isLoggedIn'); 
        window.location.href = '/login';
      } catch (error) {
        console.error('Erro ao efetuar logout:', error);
      }

    
  };





  const authContextValue: AuthContextData = {
    login,
    logout,
  };




  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );


};




export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
