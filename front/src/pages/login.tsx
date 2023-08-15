import React from 'react';


const Login: React.FC = () => {
  return (

    < div className="containerDiv">
      <form className="loginForm" data-bitwarden-watching="1">

          
          <div className='containerDiv'>
            <a href="/" className="navbar-brand">
              <img className='loginLogo' src='imgs/logo4.png'/>
            </a>
          </div>

          <div className='containerDiv'>
            <h1 className="h3 mb-3 fw-normal">Login</h1>
          </div>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>


          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>


          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>


          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>

          <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>

      </form>
    </div>
  );
};

export default Login;