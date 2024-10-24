# Currency Converter Project Notes

## Project Overview
The Currency Converter is a React-based application that allows users to convert amounts from one currency to another using live exchange rates. The application features a user-friendly interface and supports various currencies.

## Key Features
- **Currency Selection:** Users can select the "from" and "to" currencies from a dropdown list.
- **Amount Input:** Users can input the amount they wish to convert.
- **Conversion Calculation:** The application calculates the converted amount based on the selected currencies and displays the result.
- **Loading Indicator:** A spinner is shown while the conversion is being processed.
- **Swap Functionality:** Users can easily swap the "from" and "to" currencies with a click of a button.

## Technology Stack
- **Frontend:** React.js
- **Custom Hooks:** `useCurrencyInfo` for fetching currency data
- **CSS Framework:** Tailwind CSS for styling
- **SVG Icons:** Used for visual elements (e.g., swap button)

## Application Structure
- **Components:**
  - `App`: Main component that manages the state and handles currency conversion logic.
  - `InputBox`: A reusable component for input fields that allows users to select currencies and input amounts.

## State Management
- **State Variables:**
  - `amount`: Stores the amount entered by the user.
  - `from`: Stores the selected "from" currency.
  - `to`: Stores the selected "to" currency.
  - `convertedAmount`: Stores the result of the conversion.
  - `loading`: Boolean state indicating whether the conversion is in progress.

## Functionality
- **Currency Info Retrieval:** 
  - The `useCurrencyInfo` custom hook fetches the latest exchange rates for the selected "from" currency.
  
- **Conversion Logic:**
  - The `convert` function calculates the converted amount by multiplying the input amount by the exchange rate of the selected "to" currency.
  
- **Swap Logic:**
  - The `swap` function exchanges the "from" and "to" currencies and updates the amount accordingly.

## User Interface
- The UI is designed to be responsive and visually appealing, with a background image and rounded card layout.
- Form elements are styled using Tailwind CSS classes for a clean and modern look.

## Potential Enhancements
- Implement error handling for API requests to manage failed conversions or invalid currency codes.
- Add features to allow users to save favorite currency pairs for quick access.
- Integrate live currency rates update functionality for real-time conversions.
- Enhance the UI/UX with animations and transitions for a smoother user experience.

## How to Run the Project
1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Start the application with `npm start`.
