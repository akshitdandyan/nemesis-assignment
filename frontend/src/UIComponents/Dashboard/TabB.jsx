import Spinner from '../Spinner/Spinner';
import EachUser from './EachUser';
import './styles.scss';

const TabB = ({ users, setUsers, setPopUpState }) => {

    // tabB component shows according to what's present in our users state

    return (
        <div className='dashboard-tab-wrapper all-center'>
            <div className='user-account-container'>
                {
                    users === 'notFetched'
                        ?
                        <div className='loading-state all-center'>
                            <h3>Fetching User Accounts</h3>
                            <Spinner />
                        </div>
                        :
                        !users.length
                            ?
                            <div className='loading-state all-center'>
                                <h3>Users that you will add, will appear here</h3>
                            </div>
                            :
                            users.length
                            &&
                            users.map(user => <EachUser key={user._id} user={user} users={users} setUsers={setUsers} setPopUpState={setPopUpState} /> )
                }
            </div>
        </div>
    )
}

export default TabB
