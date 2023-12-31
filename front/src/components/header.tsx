import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAuth } from '@/authContext';
import axios from 'axios';



const Header: React.FC = () => {

  
  const [cookies ] = useCookies(['isLoggedIn']);
  

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
  

  useEffect(() => {
    setIsLoggedIn(cookies['isLoggedIn']); // Update isLoggedIn whenever the cookie changes
  }, [cookies]);




  const handleLoginClick = () => {
    window.location.href = '/login';
  };


  const handleRegistrarClick = () => {
    window.location.href = '/register';
  };


  const handleLogoutClick = async () => {
    localStorage.removeItem('token');

    try {
      // Chamar a rota de logout no servidor
      await axios.post('http://localhost:5000/api/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao efetuar logout:', error);
    }
    
  };





  return (

    <header id="header" className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        


      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="navbar-brand">
          <img src='imgs/logo2.png'/>
        </a>
      </div>



      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-2">INÍCIO</a></li>
        <li><a href="#" className="nav-link px-2">SOBRE</a></li>
        <li><a href="#" className="nav-link px-2">SEGURANÇA</a></li>
        <li><a href="#" className="nav-link px-2">FAQ</a></li>
        <li><a href="#" className="nav-link px-2">CONTATOS</a></li>
      </ul>



      {isLoggedIn ? (
          <button type="button" className="btn btn-primary" onClick={handleLogoutClick}>Logout</button>
        ) : (
          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleLoginClick}>Login</button>
            <button type="button" className="btn btn-primary" onClick={handleRegistrarClick}>Registrar</button>
            <button type="button" className="btn btn-primary" onClick={handleLogoutClick}>Logout</button>
          </div>  
      )}



    </header>


  );
};


export default Header;









