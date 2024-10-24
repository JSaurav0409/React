// Custom Hook for returning currency information
//? Standard convention: use 'use' as a prefix for custom hooks

import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {

    //* Step 1: Initialize state to store the currency data
    // 'data' will hold the fetched currency information
    const [data, setData] = useState({});

    //* Step 2: Fetch currency data from the API whenever the 'currency' changes
    useEffect(() => {
        //? Step 2.1: Fetch data from the currency API using the provided 'currency' parameter
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
            //* Step 2.2: Convert the API response to JSON format
            .then((response) => response.json())
            //* Step 2.3: Extract the relevant currency data and update the 'data' state
            .then((response) => setData(response[currency]))
            //* Optional: You can add error handling here if needed using .catch()
    }, [currency]); // Dependency: API call will trigger whenever 'currency' changes

    //* Step 3: Optionally log the fetched data for debugging purposes
    console.log(data);

    //* Step 4: Return the currency data to be used by the component
    return data;
}

export default useCurrencyInfo;
