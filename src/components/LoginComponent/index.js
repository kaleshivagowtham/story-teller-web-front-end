import styles from './styles.module.css';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import {openSignupModal} from '../../features/modal/signupModalSlice';
import { useSelector ,useDispatch } from 'react-redux';
import { rememberTheUser } from '../../features/modal/rememberLoginSlice';
import { useState } from 'react';
import {loginAction} from '../../features/modal/loginSlice';
import NotificationComponent from '../NotificationComponent';
import ForgotPasswordComponent from '../ForgotPasswordComponent';
import useLocalStorage from '../../utils/useLocalStorage';

export default function LoginComponent() {


    const loginUrl = 'http://localhost:5000/signin';

    const dispatch = useDispatch();

    const {rememberUser} = useSelector(store => store.rememberLogin);
    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const [loggedIn , setLoggedIn] = useState(isLoggedIn);
    const [forgotPassword , setForgotPassword] = useState(false);

    const [username , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const [loginFailedCount, setLoginFailedCount] = useState(0);

    const submitHandler = async () => {
        const response = await fetch(loginUrl , {
            method : 'POST',
            body : JSON.stringify({
                username : username,
                password : password
            }),
            headers :{
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then( json => {
            console.log(json);
            if(json.loginSuccessFul === 'Login successful')
            {
                dispatch(loginAction({username : username , accessToken : json.accessToken}));
                dispatch(closeLoginModal());
                setLoggedIn(true);
            }
            else if(json === 'username or password incorrect')
            {
                const temp = loginFailedCount;
                setLoginFailedCount(temp+1);
            }
        })
        .catch(err => console.log(err))
    }

    const registerHandler = () => {
        dispatch(closeLoginModal());
        dispatch(openSignupModal());
    }
    
    return(
        <div className={styles.wholeCont} onClick={e => dispatch(closeLoginModal())}>
            { loggedIn ? <NotificationComponent message='Login Successful' isNotificationOpen={loggedIn} setIsNotificationOpen={setLoggedIn} /> : null}
            {forgotPassword === false
            ?
            <div className={styles.modalCont} onClick={e => e.stopPropagation()}>
                <input placeholder='Username/Email' className={styles.inputBox} 
                    onChange={e => setUserName(e.target.value)}
                />
                <input placeholder='Password' className={styles.inputBox} 
                    onChange={e => setPassword(e.target.value)}
                />
                {loginFailedCount > 0 ? <p className={styles.loginFailedText} >incorrect username or password</p> : null}
                <div className={styles.forgotCont}>
                    <div className={styles.checkBoxCont} onClick={e => dispatch(rememberTheUser())}>
                        <div className={styles.rememberMeCheckBox}>
                        {
                            rememberUser
                            ?
                                <img src='/tickIcon.png' className={styles.tickImg} />
                            :
                                null
                        }
                        </div>
                        <p className={styles.rememberMeText} >Remember me</p>
                    </div>
                    <p className={styles.forgotPassText} onClick={e => setForgotPassword(true)}>Forgot Password?</p>
                </div>
                <button className={styles.submitBtn} onClick={e => submitHandler()}>SIGN IN</button>

                <p className={styles.rememberMeText}>Not a member?</p>
                <p className={styles.forgotPassText} onClick={e => registerHandler()}>Register</p>
            </div>
            :
            <ForgotPasswordComponent forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} />}
        </div>
    )
}