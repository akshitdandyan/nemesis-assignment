import { useState } from 'react';
import { addNewUser, isEmailCorrect, isUsernameCorrect } from '../../api';
import Spinner from '../Spinner/Spinner';
import './styles.scss';

const TabA = ({ users, setUsers, setPopUpState }) => {
    const [newUserData, setNewUserData] = useState({ username: "", email: "", phone: "", address: "" });
    const [loading, setLoading] = useState(false)

    // function for adding new user
    const addUser = async () => {
        // checking validations
        if (newUserData.username === "" || newUserData.email === "" || newUserData.phone === "" || newUserData.address === "") {
            return setPopUpState({ message: "Please fill all input fields", type: "error" });
        }
        if (!isUsernameCorrect(newUserData.username))return setPopUpState({ message: "Please enter an alphanumeric username only", type: "error" });
        if (isNaN(newUserData.phone) || newUserData.phone.length!==10) return setPopUpState({ message: "Please enter a valid 10 digit mobile number only", type: "error" });
        if (!isEmailCorrect(newUserData.email)) return setPopUpState({ message: "Please enter a valid email", type: "error" });
        if (isNaN(newUserData.phone)) return setPopUpState({ message: "Please enter a valid 10 digit mobile number only", type: "error" });

    // if all eneterd details are correct, try addding new user
        setLoading(true)
        const response = await addNewUser(newUserData);
        if (response.type === 'error') return setPopUpState({ message: response.message, type: "error" })
        setPopUpState({ message: response.message, type: response.type })

        // if response is all good from our api, add user to our state, so we won't need to refresh page to see changes
        if (users.length) setUsers([...users, response.user]);
        else setUsers([response.user]);
        return setLoading(false)
    }

    return (
        <div className='dashboard-tab-wrapper all-center'>
            <div className='new-user-form-container'>
                <label>Username</label>
                <input value={newUserData.username} onChange={e => setNewUserData({ ...newUserData, username: e.target.value })} />
                <label>Email Id</label>
                <input value={newUserData.email} onChange={e => setNewUserData({ ...newUserData, email: e.target.value })} />
                <label>Phone Number</label>
                <input value={newUserData.phone} onChange={e => setNewUserData({ ...newUserData, phone: e.target.value })} />
                <label>Address</label>
                <input value={newUserData.address} onChange={e => setNewUserData({ ...newUserData, address: e.target.value })} />
                <button onClick={addUser}>{loading ? <Spinner /> : "Add User"}</button>
            </div>
        </div>
    )
}

export default TabA
