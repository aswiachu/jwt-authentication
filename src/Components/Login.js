import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightToBracket, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission

    axios.post("http://localhost:5000/login", { username, password })
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: response.data.token
        });

        localStorage.setItem('token', response.data.token);

         navigate('/home', { state: { username } });
      })
      .catch((error) => {
        alert("Login failed");
      });
  }

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed); 
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center p-2">
      <form className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 border border-1 p-3 rounded shadow-lg" onSubmit={handleSubmit}>
        <div className="text-center m-3 mb-5">
          <FontAwesomeIcon icon={faArrowRightToBracket} size='3x' />
        </div>

        <div className="my-3 border border-2 rounded px-3 py-1 border-dark d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            className="form-control border-0"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="User name"
          />
        </div>

        <div className="mb-3 border border-2 rounded px-3 py-1 border-dark d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            className="form-control border-0"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>

        <label>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          <span> I agree to the{" "}</span>
          <a href="/terms-and-conditions" target="_blank" className='text-decoration-none'>
            terms and conditions
          </a>
        </label>

        <div className="text-center mt-4 mb-2">
          <button type="submit" className="btn btn-primary px-5 login w-100 fw-bold py-2" disabled={!isAgreed}>Login</button>
        </div>

        <div className='text-center'>
          <p className='fw-bold m-1 mt-4'>Sign in using</p>
          <ul className="list-unstyled d-flex gap-2 justify-content-center">
            <li><FontAwesomeIcon icon={faGoogle} size="2x" /></li>
            <li><FontAwesomeIcon icon={faLinkedin} size="2x" /></li>
            <li><FontAwesomeIcon icon={faGithub} size="2x" /></li>
          </ul>
        </div>

        <div className='text-center'>
          <span>Don&apos;t have an account ? <Link to="/signup" className='text-decoration-none fw-bold'>Sign up</Link></span>
        </div>

      </form>
    </section>
  );
};

export default Login;
