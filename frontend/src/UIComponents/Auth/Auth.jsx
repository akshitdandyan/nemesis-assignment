import { useEffect, useState } from 'react';
import './styles.scss';
import Spinner from '../Spinner/Spinner';
import { adminSignIn, isEmailCorrect } from '../../api';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

const Auth = ({ setPopUpState }) => {
    const history = useHistory();
    const [ credentials, setCredentials ] = useState({ email: "", password: "" });
    const [ loading, setLoading ] = useState(false);

    // checking JWT token's expiration time before component loads
    useEffect(()=>{
        const token = localStorage.getItem('admin')
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 > new Date().getTime()){
                // redirect user to dashboard page if token is not expired yet
                return history.push('/dashboard')
            }
            // if token expires, user will stay on auth page
            else return localStorage.clear()
        }
      },[history])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(loading) return

        // validate credentials
        if(!isEmailCorrect(credentials.email)) return setPopUpState({ message:"Please enter a valid email", type:"error"})
        if(!credentials.password) return setPopUpState({ message:"Please enter your password correctly", type:"error"})

        // send credentials via api to server to authenticate user
        setLoading(true);
        const res = await adminSignIn(credentials);
        if(res.type === 'error') return setPopUpState({ message: res.message, type:"error"})
        if(res.type==='success'){
            setPopUpState({ message: res.message, type: 'success'});
            localStorage.setItem('admin',res.token);
            return history.push("/dashboard");
        }
    }

    return (
        <div className='auth-wrapper all-center'>
            <div className='auth-form-container'>
                <form className='all-center' onSubmit={(e)=>handleSubmit(e)}>
                    <input value={credentials.email} placeholder='Email' onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
                    <input value={credentials.password} placeholder='Password' type='password' onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                    <button type='submit'>{loading ? <Spinner /> : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default Auth
