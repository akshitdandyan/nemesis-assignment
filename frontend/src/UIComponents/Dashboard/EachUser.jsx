import './styles.scss';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { deleteUser } from '../../api';

const EachUser = ({ users, user, setUsers, setPopUpState }) => {

    const [loading, setLoading] = useState(false);

    // function for deleting user from our database and from state also
    const delete_user = async (id) => {
        if(loading) return
        setLoading(true);
        const response = await deleteUser({ userID: id });
        if (response.type === 'error')return setPopUpState({ message: response.message, type: "error" });
        setPopUpState({ message: response.message, type: "success" });
        const updatedList = users.filter(user => user._id !== id);
        setUsers(updatedList);
        return setLoading(false);
    }

    return (
        <div className='eachUser' key={user._id}>
        <div className='user-info'>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
        </div>
        <div className='delete-btn' onClick={()=>delete_user(user._id)}>
            {loading ? <Spinner /> :
                <>
                    <i className="fas fa-trash-alt"></i><p>Delete User</p>
                </>
            }
        </div>
    </div>
    )
}

export default EachUser
