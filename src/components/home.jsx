import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Accounts from '../homecomps/accounts'
import Transactions from '../homecomps/transactions';
import Monthly from '../homecomps/monthly';
import '../App.css'
function Home() {
  return (
    <>
    <div className='row all'>
    <div className='col-md-12 col-sm-12'>
      <Accounts/>
      </div>
    </div>
   
    </>
   
  )
}

export default Home
