import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted for registration");

    try {
      const response = await axios.post('http://localhost:5000/register', { userName, email, pwd });

      if (response.status === 201) {
        console.log('Registro bem-sucedido', response.data);

        // Faça o redirecionamento para a página de usuário ou realize outras ações
        window.location.href = '/user-area';
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Erro ao realizar o registro');
      }
    }
  };



  return (
    <div className="containerDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className='containerDiv'>
          <a href="/" className="navbar-brand">
            <img className='loginLogo' src='imgs/logo4.png' alt="Logo" />
          </a>
        </div>

        <div className='containerDiv'>
          <h1 className="h3 mb-3 fw-normal">Registro</h1>
        </div>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingUsername" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="floatingUsername">Username</label>
        </div>


        <div className="form-floating">
          <input type="email" className="form-control" id="floatingEmail" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="floatingEmail">Email</label>
        </div>
     

        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
      </form>
    </div>
  );
};

export default Register;
