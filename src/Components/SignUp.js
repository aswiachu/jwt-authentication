import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons';  // Import solid icons here
import { 
  faGoogle, 
  faLinkedin, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';  // Import brand icons here
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    axios.post("http://localhost:5000/SignUp", { username: username, password: password })
      .then(res => {
        alert(res.data);
        navigate('/login');
      })
      .catch(err => {
        alert("Error signing up");
        console.error(err);
      });

    setUsername("");
    setPassword("");
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <form onSubmit={handleSubmit} className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 my-5 text-center border border-1 rounded shadow-sm p-4">
        <div className="text-center mb-4">
          <FontAwesomeIcon icon={faUserPlus} size="3x" />
        </div>

        <div className="mb-3 border border-1 rounded px-3 py-1 border-dark d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            type="text"
            className="form-control border-0"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        <div className="mb-3 border border-1 rounded px-3 py-1 border-dark d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type="password"
            className="form-control border-0"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div className="text-center mt-4 mb-2">
          <button type="submit" className="btn btn-primary px-4 w-100 py-2 fw-bold">Sign Up</button>
        </div>

        <div className="text-center">
          <p className="fw-bold m-1 mt-4">Or sign in using</p>
          <ul className="list-unstyled d-flex gap-2 justify-content-center">
            <li><FontAwesomeIcon icon={faGoogle} size="2x" /></li>
            <li><FontAwesomeIcon icon={faLinkedin} size="2x" /></li>
            <li><FontAwesomeIcon icon={faGithub} size="2x" /></li>
          </ul>
        </div>

        <div className="mb-2 text-center">
          <span className="form-text mt-0">
            Already have an account? <Link to="/login" className="fw-bold text-decoration-none">Sign in</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
