import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
