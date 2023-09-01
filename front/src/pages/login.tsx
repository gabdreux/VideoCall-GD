import React, { useState, useContext } from 'react';
import axios from 'axios';


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); 

    try {
      
      console.log('Sending login request:', email, senha);
      const response = await axios.post('http://localhost:5000/api/login', { email, senha });
      if (response.status === 200) {
        const token = response.data.token;
        // console.log('Token received:', token);
        localStorage.setItem('token', token);
        // document.cookie = `token=${token}; max-age=3600; path=/`;
        console.log('Login bem-sucedido', response.data);

        window.location.href = '/connect';

      }

    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro ao realizar o login');
      }
    }
    
  };





  return (


    < div className="containerDiv">
      <form className="loginForm" data-bitwarden-watching="1" onSubmit={handleSubmit}>

          
          <div className='containerDiv'>
            <a href="/" className="navbar-brand">
              <img className='loginLogo' src='imgs/logo4.png'/>
            </a>
          </div>

          <div className='containerDiv'>
            <h1 className="h3 mb-3 fw-normal">Login</h1>
          </div>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="floatingInput">Email address</label>
          </div>


          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setSenha(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>


          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>


          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>

      </form>
    </div>
  );
};

export default Login;




