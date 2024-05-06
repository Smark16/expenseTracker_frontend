import React, {useEffect, useState} from 'react'
import '../App.css'
import useFetch from './customhook';

const url = 'http://127.0.0.1:8000/expenseApi/'
function Monthly({newAmount, expensesByCategory, monthly}) {
const [currentMonth, setCurrentMonth] = useState('')
const {loading} = useFetch(url)

const combine = '0123456789abcdef'.split('')
// const randomColor =()=>{
//   let color = '#'
//   for(let i=0; i<6;i++){
//     let randomColor = Math.floor(Math.random() * combine.length)
//     let generated = combine[randomColor]
//     color += generated
//   } 
//   return color
// }
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

useEffect(() => {
  const currMonthIndex = new Date().getMonth();
  const currMonth = months[currMonthIndex];

  setCurrentMonth(currMonth);
}, []);

  return (
    <>
    <div className='th text-center'>

    <div className='bg-primary text-white text-center p-2 month mt-3'>
      <h2>set up monthly budget</h2>
    </div>

    <h5>Monthly overView for <span className='cuu'>({currentMonth})</span></h5>

    <div className='row mt-3 bugdet text-center p-2'>
        <div className='col-md-12 col-sm-12 text-center mexp'>
            <h4>Expenses</h4>
            <div className='d-block rappper'>
              <div>
              <i className="bi bi-bar-chart-line-fill text-success"></i>
              </div>
           <div className="text-center text-secondary">
           <span className='money'>UGX {monthly}</span>
           </div>
          
            </div>
           
        </div>

    </div>

    <h4 className='mt-5 text-center'>Expenses by category</h4>
    <ul className='mt-3 expensesByCategory'>
    {loading ? (
  <div className="loader"></div>
) : (
  Object.keys(expensesByCategory).map((cat_expense) => (
    <li key={cat_expense} className='d-flex justify-content-between p-2 mt-3 catExpense'>
      {/* style={{backgroundColor:randomColor()}}     */}
      <div>
        <h5>{cat_expense}</h5>
        <span>UGX {expensesByCategory[cat_expense].toFixed(2)}</span>
      </div>
      <div className="percentage">
      <h5>{((expensesByCategory[cat_expense] / newAmount) * 100).toFixed(2)}%</h5>
      </div>
    </li>
  ))
)}   
    </ul>
    </div>
    
    </>
   
  )
}

export default Monthly
