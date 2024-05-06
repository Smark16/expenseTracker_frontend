import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { userContext } from '../context';
import '../App.css';

function Navbar() {
  const {checkUser} = useContext(userContext)
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); 
  

  const toggleButton = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const body = document.body;

    if (toggle) {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    } else {
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
    }
  }, [toggle]);

  const data = useContext(userContext)

  return (
    <>
      <div className='linkContainer'>
        <ul className='links'>
          <li className={location.pathname === '/' ? 'activeLink' : ''}>
            <Link to='/'>
              <i className="bi bi-house-door-fill"></i> <span>Home</span>
            </Link>
          </li>

          <li className='logout'>
            <Link to='/logout'><span>Logout</span></Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
