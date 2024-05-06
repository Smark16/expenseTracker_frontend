import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { Link } from "react-router-dom";
import myimage from './images/img.jpg'
import { userContext } from "./context";
function AppBar(){
  const {checkUser, userName} = useContext(userContext)
  console.log(checkUser)
  const [toggle, setToggle] = useState(false);
  
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
    return (
        <>
        {checkUser && (
          <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light appbar">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">RECEPTO</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     
      <ul className="navbar-nav d-flex justify-content-between ms-auto creds">

      <li>
        <img src={myimage} alt="image" className="img"/>
        <span>{userName}</span>
    </li>

    <li>
    <input type='checkbox' className='check' onClick={toggleButton} />
    </li>

    <li className='logout'>
            <Link to='/logout'><span>Logout</span></Link>
          </li>
        </ul>

    </div>
  </div>
</nav>
          </>
        )}

        {!checkUser && (
          <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light appbar">
  <div className="container-fluid">
    <Link to="/" className="text-black">RECEPTO</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
    <ul className="navbar-nav d-flex justify-content-between ms-auto creds">
    <li className="bg-success login">
      <Link to='/login'>Login</Link>
    </li>

    <li className="signup">
      <Link to='/signup'>Signup</Link>
    </li>
    </ul>

    </div>
  </div>
</nav>
          </>
        )}
        </>
    )
}
export default AppBar