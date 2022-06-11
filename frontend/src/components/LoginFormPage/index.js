// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demo = () =>{
    setCredential('Demo-lition');
    setPassword('password');
    return;
  }

  return (
    <div id='login' className='auth'>
      <form onSubmit={handleSubmit} id="form-login" >
      <h1>Log In</h1>
        <div className='errors'>
            {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
        <label>
          <input
            type="text"
            value={credential}
            placeholder="Email or Username"
            onChange={(e) => setCredential(e.target.value)}

          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
        </label>
        <div>
        <button type="submit" className="demouserbutton" onClick={demo}>Demo Login</button>
        <button type="submit" className='loginbutton'>Log In</button>
        </div>
        <p>Not a Gamingcloud Member? <a href="/signup">Sign up Here.</a></p>
      </form>
    </div>
  );
}

export default LoginFormPage;
