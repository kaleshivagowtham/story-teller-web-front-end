import styles from './styles.module.css';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import {openSignupModal} from '../../features/modal/signupModalSlice';
import { useSelector ,useDispatch } from 'react-redux';
import { rememberTheUser } from '../../features/modal/rememberLoginSlice';
import { useState, useEffect } from 'react';
import {loginAction, tokenAction} from '../../features/modal/loginSlice';
import NotificationComponent from '../NotificationComponent';
import ForgotPasswordComponent from '../ForgotPasswordComponent';
import useLocalStorage from '../../utils/useLocalStorage';
import axios from 'axios';
import {routes} from '../../utils/routes';
import { useMemo } from 'react';

export default function LoginComponent() {


    const loginUrl = `${routes.baseUrl}${routes.api.login}`;

    const dispatch = useDispatch();

    const {rememberUser} = useSelector(store => store.rememberLogin);
    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const [loggedIn , setLoggedIn] = useState(isLoggedIn);
    const [forgotPassword , setForgotPassword] = useState(false);

    const [username , setUserName] = useState('');
    const [password , setPassword] = useState('');
    const [loginFailedCount, setLoginFailedCount] = useState(0);
    // const [isStrongPass, setIsStrongPass] = useState({
    //                                             passLength : false,
    //                                             specialChar : false,
    //                                             numberInPass : false,
    //                                             capitalInPass : false
    //                                         });
    // const [isStrongPass, setIsStrongPass] = useState(false)

    // useEffect(() => {
    //     setJwt(useLocalStorage.getItemFromLocalStorage("jwt_auth_token"));
    // },[jwt_auth_token]);

    // useMemo(() => {

        // const specialPassFormat = /[!@#$%^&*]/gm;
        // const capitalPassFormat = /[A-Z]/gm;
        // const numPassFormat = /[0-9]/gm;

        // if(password.length >= 12)
        //     setIsStrongPass({...isStrongPass, passLength : true});
        // else 
        //     setIsStrongPass({...isStrongPass, passLength : false});

        // if(specialPassFormat.test(password))
        //     setIsStrongPass({...isStrongPass, specialChar : true});
        // else 
        //     setIsStrongPass({...isStrongPass, specialChar : false});
    
        // if(capitalPassFormat.test(password))
        //     setIsStrongPass({...isStrongPass, capitalInPass : true});
        // else 
        //     setIsStrongPass({...isStrongPass, capitalInPass : false});
        
        // if(numPassFormat.test(password))
        //     setIsStrongPass({...isStrongPass, numberInPass : true});
        // else 
        //     setIsStrongPass({...isStrongPass, numberInPass : false});

    //     const strongPassFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/;

    //     if(strongPassFormat.test(password))
    //         setIsStrongPass(true);
    //     else
    //         setIsStrongPass(false);

    // },[password])

    // console.log("Password: ", isStrongPass);

    // console.log("Length: ", isStrongPass.passLength);
    // console.log("special: ", isStrongPass.specialChar);
    // console.log("number: ", isStrongPass.numberInPass);
    // console.log("capital: ", isStrongPass.capitalInPass);

    const submitHandler = async () => {

        // if(!isStrongPass.passLength|| !isStrongPass.specialChar || !isStrongPass.numberInPass || !isStrongPass.capitalInPass)
        //     return;
    
        // if(!isStrongPass)
        //     return;

        const response = await axios.post(loginUrl , {
                username : username,
                password : password
        })
        .then( resp => {
            console.log("Resp: ",resp.data);
            if(resp.data.loginSuccessFul === 'Login successful')
            {
                // console.log('username: ', resp.data.username);
                dispatch(loginAction({username : resp.data.username}));
                dispatch(tokenAction(resp.data.accessToken));
                dispatch(closeLoginModal());
                setLoggedIn(true);
            }
            else if(resp.data === 'username or password incorrect')
            {
                console.log(resp.data);
                const temp = loginFailedCount;
                setLoginFailedCount(temp+1);
            }
        })
        .catch(err => console.log(err.message))
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
                {/* {password.length > 0 && password.length < 12 && !isStrongPass ? <p className={styles.loginFailedText} >Password is too weak</p> : null} */}
                {loginFailedCount > 0 ? <p className={styles.loginFailedText} >incorrect username or password</p> : null}
                {/* {password.length > 0 && password.length<12 ? <p className={styles.loginFailedText} >Password should have a min of 12 characters</p> : null} */}
                {/* {password.length > 0 && !isStrongPass.specialChar ? <p className={styles.loginFailedText} >Password should have either of !,@,#,$,%,^,&,*</p> : null} */}
                {/* {password.length > 0 && !isStrongPass.numberInPass ? <p className={styles.loginFailedText} >Password should have at least 1 number</p> : null} */}
                {/* {password.length > 0 && !isStrongPass.capitalInPass ? <p className={styles.loginFailedText} >Password should have at least 1 capital letter</p> : null} */}
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