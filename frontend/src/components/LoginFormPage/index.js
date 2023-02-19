// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import {  Redirect } from 'react-router-dom';
import { Modal } from '../../context/Modal';
// import './LoginForm.css';

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
    <div id='login' className="p-5">
      <form onSubmit={handleSubmit} id="form-login" className='text-center'>
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
        <button type="submit" className="demouserbutton" onClick={demo} style={{background: "#f50", color: "white", fontWeight: "bold"}}>Demo Login</button>
        <button type="submit" className='loginbutton' style={{background: "#f50", color: "white", fontWeight: "bold"}}>Log In</button>
        </div>
        <p>Not a Gamingcloud Member? <a href="/signup" className="text-decoration-none">Sign up Here.</a></p>
      </form>
    </div>
  );
}

export default LoginFormPage;
