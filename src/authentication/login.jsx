import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import '../App.css'
const url = 'http://127.0.0.1:8000/expenseApi/user_login'
function Login() {
  const [showPassword, setShowPassword] = useState(false);
 const [user, setUser] = useState({username:"", password:""})
 const [errMsg, setErrMsg] = useState('')

 const handleSubmit =(e)=>{
e.preventDefault()
const formData = new FormData()
formData.append("username", user.username)
formData.append("password", user.password)
console.log(formData)

axios.post(url, formData)
.then(response => {
  console.log(response)
 if(response.data.bool === false){
  setErrMsg(response.data.msg)
  window.location.href = '/login'
 }
 if(response.data.bool === true){
  localStorage.setItem('user_login', true)
  localStorage.setItem('user_name', response.data.user)
  localStorage.setItem('user_id', response.data.user_id)
  window.location.href = '/'
 }
})
.catch(err => console.log(err.response))
 }

 const handleChange =(e)=>{
const {name, value} = e.target
setUser({...user, [name]:value})
 }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='mt-5 text-center container-fluid loginForm'>
     <h2 className='text-info'>Login to your Account</h2>
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <span className='text-danger'>{errMsg}</span>
         <form className='text-center w-100'>
         <div className='mt-3'>   
        <TextField 
      id="outlined-basic" 
      label="username" 
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      variant="outlined" 
      name='username'
      value={user.username}
      onChange={handleChange}/>

        </div>
      
      {/* password */}
      <div className='mt-4'>
      <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            label="Password"
            name='password'
            value={user.password}
            onChange={handleChange}
          />
      </div>
         
         <Button className='mt-3' variant='contained' type='submit' onClick={handleSubmit}>LOGIN</Button>
        </form>

        <p className='text-center w-100'>No account? <Link to='/signup'>Create one</Link></p>
       
    </Box>

 
    </div>
  )
}

export default Login
