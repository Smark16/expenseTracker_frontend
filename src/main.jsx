import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { userContext } from './context.jsx'

const checkUser = localStorage.getItem('user_login')
const userName = localStorage.getItem('user_name')
const user_id = localStorage.getItem('user_id')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <userContext.Provider value={{checkUser, userName, user_id}}>
      <App />
    </userContext.Provider>
   
  </React.StrictMode>,
)
