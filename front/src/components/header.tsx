import React, { useEffect } from 'react';





const Header: React.FC = () => {


  useEffect(() => {
    if (window.location.pathname === '/videocall') {
      console.log('videocall page');
      const header = document.getElementById('header');
  
      if (header) {
        header.classList.add('hidden');
        console.log("classe adicioanda!");
      }
    }
  }, []);




  const handleLoginClick = () => {
    window.location.href = '/login';
  };


  const handleRegistrarClick = () => {
    window.location.href = '/user-area';
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


      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2" onClick={handleLoginClick}>Login</button>
        <button type="button" className="btn btn-primary" onClick={handleRegistrarClick}>Registrar</button>
      </div>

    </header>


  );
};

export default Header;









