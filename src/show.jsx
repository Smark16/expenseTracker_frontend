import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import AppBar from './appbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Expense from './components/Expense';
import { userContext } from "./context";

// Authentication
import Signup from './authentication/signup';
import Login from './authentication/login';
import Logout from './components/logout';


function Show() {
  return (
    <Router>
      <div className='appbar'>
        <AppBar />
      </div>
      <Content />
    </Router>
  );
}

function Content() {
  const navigate = useNavigate();
  const {checkUser} = useContext(userContext)
  const location = window.location.pathname;

  return (
    <>
      {checkUser ? (<>
        <div className="container-fluid">
          <div className="high_table mt-4">
            <div className="link">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/logout' element={<Logout/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </>
       ) : (<>
        <Routes>
        <Route path='/' element={<Expense/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
       </>)}

     
    </>
  );
}

export default Show;
