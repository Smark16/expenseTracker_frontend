import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = 'http://127.0.0.1:8000/expenseApi/user_register'
function Signup() {
const [user, setUser] = useState({first:"", last:"", username:"", email:"", password:"", mobile:""})
const [formMsg, setFormMsg] = useState('')


const handleChange=(e)=>{
const {name, value} = e.target
setUser({...user, [name]:value})
}

const handleSubmit = async (e)=>{
e.preventDefault()
const form = new FormData()
form.append('first', user.first)
form.append('last', user.last)
form.append('username', user.username)
form.append('email', user.email)
form.append('password', user.password)
form.append('mobile', user.mobile)

axios.post(url, form)
.then(response =>{
  if(response.data.bool === true){
    setFormMsg(response.data.msg)
    window.location.href = '/login'
  }else{
    window.location.href='/signup'
  }

})
.catch(err =>console.log(err.response))
}
  return (
    <>
     <div className='mt-5'>
      <h2>Signup  <span className='text-danger'>All fields *</span></h2>
    </div>
    
<span className='text-success'>{formMsg}</span>

    <form className="row g-3">
  <div className="col-md-4">
    <label htmlFor="validationServer01" className="form-label">First name</label>
    <input 
    type="text" 
    className="form-control"
     id="validationServer01"  
     name='first'
     value={user.first}
     onChange={handleChange}
     required/>
    {/* <div className="valid-feedback">
      Looks good!
    </div> */}
  </div>
  <div className="col-md-4">
    <label htmlFor="validationServer02" className="form-label">Last name</label>
    <input 
    type="text" 
    className="form-control" 
    id="validationServer02" 
    name='last'
    value={user.last}
    onChange={handleChange}
    required/>
    {/* <div className="valid-feedback">
      Looks good!
    </div> */}
  </div>
  <div className="col-md-4">
    <label htmlFor="validationServerUsername" className="form-label">Username</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend3">@</span>
      <input 
      type="text" 
      class="form-control"
       id="validationServerUsername" 
       aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" 
       name='username'
       value={user.username}
       onChange={handleChange}
       required/>
      {/* <div id="validationServerUsernameFeedback" class="invalid-feedback">
        Please choose a username.
      </div> */}
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationServer03" className="form-label">Email</label>
    <input 
    type="Email" 
    class="form-control" 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name='email'
    value={user.email}
    onChange={handleChange}
    required/>
    {/* <div id="validationServer03Feedback" class="invalid-feedback">
      Please provide a valid city.
    </div> */}
  </div>
 
  <div className="col-md-3">
    <label htmlFor="validationServer05" className="form-label">Password</label>
    <input 
    type="Password" 
    class="form-control" 
    id="validationServer05"
     aria-describedby="validationServer05Feedback" 
     name='password'
     value={user.password}
     onChange={handleChange}
     required/>
    {/* <div id="validationServer05Feedback" class="invalid-feedback">
      Please provide a valid zip.
    </div> */}
  </div>

  <div className="col-md-3">
    <label htmlFor="validationServer06" className="form-label">mobile</label>
    <input 
    type="number" 
    class="form-control" 
    id="validationServer06" 
    aria-describedby="validationServer05Feedback" 
    name='mobile'
    value={user.mobile}
    onChange={handleChange}
    required/>
    {/* <div id="validationServer05Feedback" class="invalid-feedback">
      Please provide a valid zip.
    </div> */}
  </div>

  <div className="col-12">
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit form</button>
  </div>
</form>

<p>Already have an account? <span><Link to='/login'>login to your account</Link></span></p>
    </>
   
  )
}

export default Signup
