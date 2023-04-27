import styles from './styles.module.css';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import { useSelector ,useDispatch } from 'react-redux';
import { rememberTheUser } from '../../features/modal/rememberLoginSlice';
import { useState } from 'react';

export default function LoginComponent() {


    const loginUrl = '';

    const dispatch = useDispatch();

    const {rememberUser} = useSelector(store => store.rememberLogin);

    const [username , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const submitHandler = async (e) => {
        const response = await fetch(loginUrl , {
            method : 'POST',
            body : JSON.stringify({
                username : username,
                password : password
            }),
            headers :{
                "content-type" : "application/json"
            }
        })
        .then(res => {
            res.json();
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.wholeCont} onClick={e => dispatch(closeLoginModal())}>
            <div className={styles.modalCont} onClick={e => e.stopPropagation()}>
                <input placeholder='Username/Email' className={styles.inputBox} 
                    onChange={e => setUserName(e.target.value)}
                />
                <input placeholder='Password' className={styles.inputBox} 
                    onChange={e => setPassword(e.target.value)}
                />
                <div className={styles.forgotCont}>
                    <div className={styles.checkBoxCont} onClick={e => dispatch(rememberTheUser())}>
                        <div className={styles.rememberMeCheckBox}>
                        {
                            rememberUser
                            ?
                                <img src='/tickIcon.png' className={styles.tickImg}s />
                            :
                                null
                        }
                        </div>
                        <p className={styles.rememberMeText}>Remember me</p>
                    </div>
                    <p className={styles.forgotPassText}>Forgot Password?</p>
                </div>
                <button className={styles.submitBtn} onCLick={e => submitHandler}>SIGN IN</button>

                <p className={styles.rememberMeText}>Not a member?</p>
                <p className={styles.forgotPassText}>Register</p>
            </div>
        </div>
    )
}