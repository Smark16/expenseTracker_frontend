
function Logout() {
  localStorage.removeItem('user_login')
  localStorage.removeItem('user_name')
  window.location.href = '/login'
}

export default Logout
