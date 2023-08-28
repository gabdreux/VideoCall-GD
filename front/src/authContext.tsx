import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
  authenticated: boolean | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);




export function AuthProvider({ children }: { children: ReactNode }) {

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // useEffect(() => {

  //   const token = localStorage.getItem('token');

  //   // console.log("TOKEN NO CONTEXT AUTH", token);

    
  //   if (authenticated === null) {

  //     const headers = {
  //       Authorization: `Bearer ${token}`
  //     };

  //     axios.get<{ authenticated: boolean }>('http://localhost:5000/api/check-auth', {
  //       withCredentials: true,
  //       headers: headers
  //     })
  //       .then(response => {
  //         setAuthenticated(response.data.authenticated);
  //       })
  //       .catch(() => {
  //         setAuthenticated(false);
  //       });
  //   }
  // }, [authenticated]);


  if (typeof window !== 'undefined') { // Verifica se está no contexto de navegador
    const token = localStorage.getItem('token');

    if (authenticated === null) {
      const headers = {
        Authorization: `${token}`
      };

      axios.get<{ authenticated: boolean }>('http://localhost:5000/api/check-auth', {
        withCredentials: true,
        headers: headers
      })
      .then(response => {
        setAuthenticated(response.data.authenticated);
      })
      .catch(() => {
        setAuthenticated(false);
      });
    }
  }



  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );



}





export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
