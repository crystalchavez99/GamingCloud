// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
// import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("")

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      dispatch(sessionActions.signup({ email, username, password,image }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
      });
    }else{
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  return (
    <div id='signup' className="p-5">
      <form onSubmit={handleSubmit} id="form-signup" className='text-center d-flex flex-column justify-content-around'>
        <h1>Sign Up</h1>
        <div className='errors'>
        {errors.map((error, idx) => <div key={idx}><p style={{color:"red", fontWeight: "bold"}}>{error}</p></div>)}
        </div>
        <label className='d-flex justify-content-center align-items-center'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label className='d-flex justify-content-center align-items-center'>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        <label id="upload-profile" className='d-flex justify-content-center align-items-center'>
          <p>Profile Picture</p>
        <input className="url-input" type="file" onChange={updateFile} placeholder="Profile Picture" />
        </label>
        <label className='d-flex justify-content-center align-items-center'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
        </label>
        <label className='d-flex justify-content-center align-items-center'>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat Password"
          />
        </label>
        <button type="submit" className="signupbutton" style={{background: "#f50", color: "white", fontWeight: "bold"}}>Sign Up</button>
        <p>Already a Gamingcloud Member? <a href="/login">Log In Here.</a></p>
      </form>
    </div>
  );
}

export default SignupFormPage;
