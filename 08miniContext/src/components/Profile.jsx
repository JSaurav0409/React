import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) return <div className="message">Please Login</div>;

    return <div className="message">Welcome, {user.username} !</div>;
}

export default Profile;
