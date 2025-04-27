import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convAmount, setConvAmount] = useState(82.98)
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = response.data;
      let rate = data.rates[to];
      let curr = amount === "" ? 0 : parseFloat(amount);
      setConvAmount((parseFloat(rate) * parseFloat(curr)).toFixed(2));
    })();
  }, [amount, from, to])

  function handleChange(e) {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      if (value === "") setError(true);
      else {
        setError(false);
      }
      setAmount(value);

    }
  }

  return (
    <>
      <div className='bg-gray-900 h-screen flex justify-center items-center flex-col'>
        <img src="exchange.png" alt="" className='w-90' />
        <div className="w-95 bg-white rounded-md px-6 py-2">
          <div className='flex justify-center pt-2 pb-6'>
            <img src="logo.webp" alt="currency convertor" className='w-2/5 rounded-lg ' />
          </div>
          <div className='text-sky-500 border-y-2 border-gray-200 border-dashed text-center p-2 font-semibold'>
            CURRENCY CONVERTER
          </div>



          <div>
            <div className='py-2'>
              <label htmlFor="amount" className='text-gray-400 text-lg'>Amount:</label><br />
              <input type="text" value={amount} onChange={e => handleChange(e)} className='border-2 border-solid border-gray-200 rounded-md p-1.5 w-full mt-2 focus:outline-sky-400' />
              {error && <label htmlFor="" className='text-red-600 relative'>Enter the value for currency</label>}
            </div>
            <div>
              <label htmlFor="from" className='text-gray-400 text-lg'>From Currency:</label><br />
              <select name="" id="" className='border-2 border-solid border-gray-200 rounded-md p-1.5 w-full mt-2 focus:outline-sky-400 text-gray-700' onChange={e => setFrom(e.target.value)}>
                <option value="USD" >USD - UNITED STATES DOLLAR</option>
                <option value="INR">INR - INDIAN NATIONAL RUPEE</option>
                <option value="AED">AED - ARAB EMIRATES DIRHAM</option>
                <option value="JPY">JPY - JAPANESE YEN</option>
                <option value="EUR">EUR - EURO</option>
                <option value="GBP">GBP - GREAT BRITAIN POUND</option>
              </select>
            </div>
            <div className='py-2'>
              <label htmlFor="to" className='text-gray-400 text-lg'>To Currency:</label><br />
              <select name="" id="" className='border-2 border-solid border-gray-200 rounded-md p-1.5 w-full mt-2 focus:outline-sky-400 text-gray-700 ' onChange={e => setTo(e.target.value)}>
                <option value="INR" >INR - INDIAN NATIONAL RUPEE</option>
                <option value="USD">USD - UNITED STATES DOLLAR</option>
                <option value="AED">AED - ARAB EMIRATES DIRHAM</option>
                <option value="JPY">JPY - JAPANESE YEN</option>
                <option value="EUR">EUR - EURO</option>
                <option value="GBP">GBP - GREAT BRITAIN POUND</option>
              </select>
            </div>
          </div>
          <div className='mt-3 border-dashed border-sky-400 border-2 px-5 py-3 text-center rounded-sm'>
            <h2 className='text-sky-500 text-md font-semibold'>{amount} {from} is equal to {convAmount} {to}</h2>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
