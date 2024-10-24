import React, { useId } from 'react';

function InputBox({
    // Step 1: Props that the component will receive
    label,                    // Label for the input field
    amount,                   // Current amount value for the input
    onAmountChange,           // Function to handle amount changes
    onCurrencyChange,         // Function to handle currency selection changes
    currencyOptions = [],     // List of currency options for the dropdown
    selectCurrency = "usd",   // The default selected currency
    amountDisabled = false,   // Whether the amount input is disabled or not
    currencyDisabled = false, // Whether the currency dropdown is disabled or not
    className = "",           // Optional className for additional styling
}) {
    //* Step 2: Generate a unique ID for the input field using `useId` (useful for accessibility)
    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            {/* Step 3: Input section for the amount */}
            <div className="w-1/2">
                {/* Step 3.1: Display the label and link it to the input using htmlFor and the unique ID */}
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                {/* Step 3.2: Input field to enter the amount */}
                <input
                    id={amountInputId}               // Associates label with input for accessibility
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}        // Disable the input if `amountDisabled` is true
                    value={amount}                   // The current value of the amount
                    // Step 3.3: Handle changes, call `onAmountChange` if it exists
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>

            {/* Step 4: Currency selection dropdown */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                {/* Step 4.1: Label for the currency dropdown */}
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                {/* Step 4.2: Dropdown to select the currency */}
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}            // Set the currently selected currency
                    disabled={currencyDisabled}       // Disable the dropdown if `currencyDisabled` is true
                    // Step 4.3: Handle currency selection change, call `onCurrencyChange` if it exists
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {/* Step 4.4: Map through the currency options and render them */}
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
