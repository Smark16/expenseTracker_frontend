import React, { useState, useEffect} from 'react';
import Transactions from './transactions';
import '../App.css';
import useFetch from './customhook';

const catsUrl = 'http://127.0.0.1:8000/expenseApi/'

function Accounts({newAmount, income}) {
  const [account, setAccount] = useState('');
  const [list, setList] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [banks, setBanks] = useState(true);
  const [category, setCategory] = useState(false);
  const [reduce, setReduce] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
 
const {categories, loading} = useFetch(catsUrl)

console.log(categories)
  const showAccount = () => {
    setDisplayForm(true);
  };

  const handleAccount = (e) => {
    if (account) {
      e.preventDefault();
      const newAccount = { id: Date.now(), account };
      setList([...list, newAccount]);
      setAccount('');
      console.log(list);
      setDisplayForm(false);
    }
  };
  const toggleCategories = () => {
    setCategory(!category);
    setReduce(true)
  };
  const Remove = ()=>{
    setReduce(false)
    setCategory(!category)
  }

  useEffect(() => {
    if (list.length === 0) {
      setBanks(true);
    } else {
      setBanks(false);
    
    }
  }, [list]);

 const changeCurrency =()=>{
const selected = document.querySelectorAll('select')
selected.forEach(currency =>{
const value = currency.value
console.log(value)
setSelectedCurrency(value)
})
 }


  return (

    <>

    <div className='row_accounts'>

      <div className='row_main'>
      <div className="accounts">
      <h2>Accounts</h2>

      <h5>Bank Accounts</h5>
      {!displayForm ? (
        <ul>
          {banks ? (
            <h6 className="bg-secondary text-white text-center p-2 tit">No Accounts</h6>
          ) : (
            <div>
              {list.map((mylist) => {
                const { account, id } = mylist;
                return (
                  <li key={id}>
                    <i className="bi bi-bank2"></i>
                    <span>{account}</span>
                  </li>
                );
              })}
            </div>
          )}

          <li className="d-flex text-primary another" onClick={showAccount}>
            <span>+</span>
            <h6>Add Another</h6>
          </li>
        </ul>
      ) : (
        <form className="p-2 accountForm" onSubmit={handleAccount}>
          <h3>Add Account</h3>
          <input
            type="text"
            name="account"
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />

          <button type="submit" className="bg-primary text-white text-center mt-2 m-auto">
            Add Account
          </button>
        </form>
      )}
{/* end of Accounts  */}
</div>

<div className="row_cats">
<h2>Categories</h2>
      <ul>
        {loading ? (<div class="loader"></div>) : (
          <>
           {categories.slice(0, 5).map((categorie) => {
          const { name,image, id } = categorie;
          return (
            <li key={id} className='d-flex li_cat'>
              <img src={`http://127.0.0.1:8000${image}`} alt='image' className='cat_img'></img>
              <span>{name}</span>
            </li>
          );
        })}
        {!category && (
          <li className="d-flex text-primary more" onClick={toggleCategories}>
            <span>+</span>
            <h6>{categories.length - 5} more</h6>
          </li>
        )}

          </>
        )}
       
{/* show the remaining categories */}
{reduce && (
  <>
  {categories.slice(5, 9).map(cat =>{
    const {id, name, image} = cat
    return (
      <>
      <li key={id} className='li_cat'>
      <img src={`http://127.0.0.1:8000${image}`} alt='image' className='cat_img'></img>
       <span>{name}</span>
        </li>
      </>
      
    )
  })}
  </>
)}
{reduce && (
  <>
  <div className='mt-3'>
  <span className='bg-primary text-white p-2 mini' onClick={Remove}>minimize</span>
  </div>
     
  </>
)}
        
      </ul>

      <ul>
        <li>
          <select onChange={changeCurrency}>
            <option value="USD">USD</option>
            <option value="USH">USH</option>
          </select>
        </li>
      </ul>
</div>
      
      </div>

      <div className='dai'>
      <Transactions selectedCurrency={selectedCurrency}/>
      </div>
     </div>
   </>
  );
}

export default Accounts;

