import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {

  //* Step 1 : Create Custom Hook 
  //* Step 2 : Create components like Input Box
  //* Step 3 : Collect the data in useState
  //* Step 4 : Pass the state in custom hook
  //* Step 5 : Extracting the key of data and holding it in value
  //* Step 6 : Creating the swap functionality
  //* Step 7 : Creating the convert button functionality with loading state

  // Step 3: Initialize state for amount, from/to currencies, converted amount, and loading state
  const [amount, setAmount] = useState();              // Currency amount to convert
  const [from, setFrom] = useState('usd');              // "From" currency
  const [to, setTo] = useState('inr');                  // "To" currency
  const [convertedAmount, setConvertedAmount] = useState();  // Converted currency amount
  const [loading, setLoading] = useState(false);        // Loading state for conversion

  // Step 4: Fetch currency info using custom hook based on "from" currency
  const currencyInfo = useCurrencyInfo(from);

  // Step 5: Get list of currency options from the fetched data
  const options = Object.keys(currencyInfo);

  // Step 6: Swap functionality to exchange "from" and "to" currencies
  const swap = () => {
    setFrom(to);                        // Swap 'from' and 'to' currencies
    setTo(from);
    setConvertedAmount(amount);         // Keep the amounts in sync during the swap
    setAmount(convertedAmount);
  };

  // Step 7: Convert functionality to calculate the converted amount based on exchange rate
  const convert = () => {
    setLoading(true);  // Start loading before API request or calculation
    
    // Simulate an API request delay (replace with actual API logic)
    setTimeout(() => {
      setConvertedAmount(amount * currencyInfo[to]);  // Calculate the converted amount
      setLoading(false);   // End loading after conversion
    }, 1000);  // Simulating a 1 second delay
  };

  return (
<div
  className="w-full h-screen flex flex-wrap justify-center items-center bg-contain bg-center bg-repeat"
  style={{
    backgroundImage: `url('https://i.pinimg.com/564x/3c/b8/0a/3cb80a79c38be1d9b73a16c463e98736.jpg')`,
  }}
>

      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 relative">

          {/* Step 7.2: Centered Spinner while loading */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/70 rounded-lg">
              <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                />
              </svg>
            </div>
          )}

          {/* Step 7: Form to submit conversion request */}
          <form
            className={`${loading ? 'opacity-50 pointer-events-none' : ''}`}  // Disable form when loading
            onSubmit={(e) => {
              e.preventDefault();
              convert();  // Call conversion on form submit
            }}
          >
            {/* Step 5: Input box for "From" currency */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)} // Update "from" currency
                selectCurrency={from}
                onAmountChange={setAmount}  // Update amount
              />
            </div>

            {/* Step 6.1: Swap Button - Centered between Input Boxes */}
            <div className="relative w-full flex justify-center mb-4 mt-4">
              <button
                type="button"
                className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-lg"
                onClick={swap}  // Call swap functionality on click
                aria-label="Swap"
              >
                {/* Swap Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Step 5: Input box for "To" currency */}
            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}  // Update "to" currency
                selectCurrency={to}
                amountDisabled={true}  // Disable the amount input for the "To" field
              />
            </div>

            {/* Step 7.1: Convert Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white px-4 py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}  // Disable button while loading
            >
              {loading ? 'Converting...' : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}  {/* Show loading state */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
