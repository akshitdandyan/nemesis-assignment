import './styles.scss';
import decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import TabA from './TabA';
import TabB from './TabB';
import { getAllUsers } from '../../api';


const Dashboard = ({ setPopUpState }) => {
    const history = useHistory();
    const [ currTabIsA,setCurrTabIsA ] = useState(true); // helps to detect what to show on dashboard
    const [ users, setUsers ] = useState("notFetched"); // helps to show what to show on second tab

    // function to log out user
    const logout = () => {
        localStorage.clear()
        history.push("/");
    }

    // function to fetch users info from backend
    const initUsers = async()=>{
        const fetchedData = await getAllUsers();
        if(fetchedData.message) return setPopUpState({ message: fetchedData.message, type: "error"});
        return setUsers(fetchedData)
    }

    useEffect(()=>{
        const token = localStorage.getItem('admin')
        // if there is token in browser's storage, check it's expiration period
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()){
              //if token is expired, delete token and redirect user to login page
              localStorage.clear();
              history.push('/')
              return setPopUpState({ message:"Session Expired. Log In again.", type:"error"})
            }
            // if everything is fine with token, fetch users information
            return initUsers()
        }
        return (() => history.push('/'))
      },[])

    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-header'>
                <div>Admin's Dashboard</div>
                <div className='all-center' onClick={logout}><i className="fas fa-sign-in-alt"></i> LOG OUT</div>
            </div>
            <div className='tab-navs'>
                    <div className='each-nav' onClick={() => setCurrTabIsA(true)}>Add New User</div>
                    <div className='divider' />
                    <div className='each-nav' onClick={() => setCurrTabIsA(false)}>Existing Users</div>
                    <div className='tab-indicator-bar' style={{left:currTabIsA?"10%":"60%"}} />
                </div>
            <div className='tab-window-switcher'>
                {
                    currTabIsA
                    ?
                    <TabA users={users} setUsers={setUsers} setPopUpState={setPopUpState} />
                    :
                    <TabB users={users} setUsers={setUsers} setPopUpState={setPopUpState} />
                }
            </div>
        </div>
    )
}

export default Dashboard
