import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';
import UserContextProvider from './context/UserContextProvider';

function App() {
    return (
        <UserContextProvider>
            <div className="container">
                <h1>Context API Demo</h1>
                <Login />
                <Profile />
            </div>
        </UserContextProvider>
    );
}

export default App;
