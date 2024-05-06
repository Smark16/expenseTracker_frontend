import React, {useState, useEffect, useContext} from 'react'
import Calendar from './calendar'
import Monthly from './monthly'
import noTrans from '../images/notrans.jpg'
import { userContext } from '../context';
import '../App.css'
import axios from 'axios'
const PostExpenseUrl = 'http://127.0.0.1:8000/expenseApi/post_expense'
const catsUrl = 'http://127.0.0.1:8000/expenseApi/'

function Transactions({selectedCurrency}) {
    const {user_id} = useContext(userContext)
    const expensesURL = `http://127.0.0.1:8000/expenseApi/user_expense/${user_id}`
    const [form, setForm] = useState(false)
    const [enteredItems, setEnteredItems] = useState({item:"", amount:"", category:"Choose Category"})
    const [newAmount, setNewAmount] = useState(0)
    const [shillings, setShillings] = useState('')
    const [dollars, setDollars] = useState('')
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [monthly, setMonthly] = useState('')

const FecthCats = async ()=>{
try{
 const response = await axios(catsUrl)
 const data = response.data
 setCategories(data)
}catch(err){
    console.log(err)
}
}
const displayForm =()=>{
setForm(!form)
}


const handleForm = async (e) => {
    e.preventDefault();
    const categoryObject = categories.find(cat => cat.name === enteredItems.category);
    if (!categoryObject) {
        console.log('Category not found');
        return; // Exit the function if the category is not found
    }

    const formdata = new FormData();
    formdata.append('user', user_id);
    formdata.append('item', enteredItems.item);
    formdata.append('Amount', enteredItems.amount);
    formdata.append('category', enteredItems.category);

    if (categoryObject.image && typeof categoryObject.image === 'string') {
        try {
            // Download the image from the URL
            const imageResponse = await axios.get(`http://127.0.0.1:8000${categoryObject.image}`, { responseType: 'blob' });
            const imageBlob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
            const imageFile = new File([imageBlob], 'image.jpg'); 

            formdata.append('image', imageFile);
axios.post(PostExpenseUrl, formdata)
.then(res =>{
    console.log(res)
    setEnteredItems({item:"", amount:""})

    // correct this code
    setTransactions(prevTransactions => {
        const updatedTransactions = [...prevTransactions, res.data];
        const amount = updatedTransactions.reduce((total, transaction) => {
            return total + parseFloat(transaction.Amount); 
        }, 0);
        setNewAmount(amount.toFixed(2)); 
        return updatedTransactions; 
    });
    setForm(false)
}).catch (err=>{
    console.log('There is server err', err)
})
        } catch (err) {
            console.log(err);
        }
    }
};

const fetchExpenses = async ()=>{
    try{
  const response = await axios(expensesURL)
  const data = response.data
  setTransactions(data)
    }catch(err){
        console.log(err)
    }
}

console.log(transactions)
const handleChange=(e)=>{
    const {name, value} = e.target
 
    setEnteredItems({...enteredItems, [name]:value})
}

const date = new Date()

const expensesByCategory = transactions.reduce((categoryMap, transaction) => {
    const { category, Amount } = transaction;
    
    const total_Expense = parseFloat(Amount)
 
    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += total_Expense
    return categoryMap;
  }, {});
 
//changing currency
const convertCurrency = (amount, rate) => {
    return (amount * rate).toFixed(2);
  };

const handleDelete = async (id)=>{
 try{
  await axios.delete(`http://127.0.0.1:8000/expenseApi/delete/${id}`)
        setTransactions(prevTransactions => {
            const updatedTransactions = prevTransactions.filter(transaction => transaction.id !== id);
            const amount = updatedTransactions.reduce((total, transaction) => {
                return total + parseFloat(transaction.Amount); 
            }, 0);
            setNewAmount(amount.toFixed(2)); 
            return updatedTransactions; 
        });
        
 }catch (err){
    console.log(err)
 }
}

const calculateMonthlyExpenses = (transactions) => {
    const currentMonth = new Date().getMonth();
    return transactions.reduce((total, transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate.getMonth() === currentMonth) {
            return total + parseFloat(transaction.Amount);
        }
        return total;
    }, 0).toFixed(2);
};

useEffect(()=>{
    fetchExpenses()
    FecthCats()
}, [])

useEffect(() => {
    const monthlyExpenses = calculateMonthlyExpenses(transactions);
    setMonthly(monthlyExpenses);
}, [transactions]);



useEffect(()=>{
    if (selectedCurrency === 'USH') {
        setShillings(convertCurrency(newAmount, 3765));
      } else if (selectedCurrency === 'USD') {
        setDollars(convertCurrency(newAmount, 0.00026));
      }
}, [selectedCurrency, newAmount])


  return (
    <>

    <div className='row_transit'>
        <div className='row_dai'>
        <div className='tr'>

<div className='d-flex justify-content-between'>
    <div>
    <h2>Daily Transactions</h2>
    </div>
 
 <div className='cal'>
 <i class="bi bi-calendar"></i>
 <button className='bg-primary traBtn' onClick={displayForm}>+</button>
 </div>
</div>

<div>
   <Calendar/>
   
    <div className='text-center cover'>
        <div className="expen text-center text-secondary">
            <h4>Total Expenses</h4>
            <span className='money'>
                UGX {newAmount}
            </span>
          
        </div>

      
    </div>
</div>


{/* the form */}
{form && (
<form onSubmit={handleForm}>
<h4>Add Transaction</h4>
<div className="mb-3">
<label for="formGroupExampleInput" className="form-label">Item</label>
<input 
type="text" 
class="form-control" 
name='item'
value={enteredItems.item}
id="formGroupExampleInput" 
onChange={handleChange}
required/>
</div>
<div className="mb-3">
<label for="formGroupExampleInput2" className="form-label">Amount</label>
<input 
type="number" 
className="form-control" 
name='amount'
value={enteredItems.amount}
id="formGroupExampleInput2" 
onChange={handleChange}
required/>
</div>

<div className='mb-3'>
    <h6>choose Category</h6>
    <select name='category' onChange={handleChange}>
        {categories.map(cat =>{
            const {name, id} = cat
            return (
                <>
                  <option value={name}>{name}</option>
                </>
            )
        })}
      
    </select>
</div>
<div className='mb-3'>
<button type='submit'className='bg-primary'>Submit</button>
</div>

</form>

)}

{/* Transactions */}
<div>
    {transactions.length === 0 ? (<>
        <h4 className='text-center text-white bg-primary p-2 mt-3'>No Transactions</h4>
      <img src={noTrans} alt='notrans' className='text-cente'></img>
    </>
) : (
        <ul className='items'>
            {transactions.map(transit =>{
                const {item, Amount, id, image} = transit
                return (
                    <>
                      <li className='d-flex justify-content-between' key={id}>
            <div className='d-flex item'>
            <img src={`http://127.0.0.1:8000/${image}`} alt='image' className='cat_img'></img>
        <div>
            <h6>{item}</h6>
            <span>{date.toDateString()}</span>
        </div>
            </div>

            <div className='buju'>
                <h6>UGX {Amount}</h6>
                <i class="bi bi-archive" onClick={()=>handleDelete(id)}></i>
            </div>
        </li>
                    </>
                )
            })}
        </ul>
    )}
   
</div>
</div>
        </div>


        <div className='mon'>
        <Monthly newAmount={newAmount} expensesByCategory={expensesByCategory} monthly={monthly}/>
      </div>
    </div>
   

    
    </>
   
  )
}

export default Transactions
