import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import {closeSignupModal} from '../../features/modal/signupModalSlice';
import {openLoginModal} from '../../features/modal/loginModalSlice';
import { openNotification } from '../../features/modal/notificationSlice';

export default function SignupComponent() {

    const dispatch = useDispatch();

    const signupUrl = 'http://localhost:5000/signup';

    useEffect(() => {

    },[])

    const [currRef , setCurrRef] = useState('');
    const [regDetails , setRegDetails] = useState({'username' : null,
                                                    'email' : null,
                                                    'password' : null,
                                                    'fName' : null,
                                                    'number' : null});
    const [validateDetails , setValidateDetails] = useState({'username' : 'valid',
                                                            'email' : 'valid',
                                                            'password' : 'valid',
                                                            'fName' : 'valid',
                                                            'number' : 'valid'});

    const changeHandler = (e) => {
        const temp = regDetails;
        temp[e.target.name] = e.target.value
        setRegDetails(temp);
    }

    const validateUsername = (e) => {
        console.log("username null:",regDetails.username);
        const temp = validateDetails;
        temp.username = 'empty';
        setValidateDetails(temp);
    }

    const validatePassword = (e) => {
        console.log("password : ",regDetails.password);
        const temp = validateDetails;
        temp.password = 'empty';
        setValidateDetails(temp);
    }

    const validateEmail = (e) => {
        console.log("email : ",regDetails.email);
        const temp = validateDetails;
        temp.email = 'empty';
        setValidateDetails(temp);
    }

    const validateFName = (e) => {
        console.log("fName : ",regDetails.fName);
        const temp = validateDetails;
        temp.fName = 'empty';
        setValidateDetails(temp);
    }

    const signupHandler = async (e) => {
        console.log(regDetails);
        if( regDetails.username ===  null || regDetails.username === '' || regDetails.email === null || regDetails.email === '' || regDetails.password === null || regDetails.password === '' || regDetails.fName === null || regDetails.fName === '')
        {
            if(regDetails.username ===  null || regDetails.username === '')
                validateUsername(e);
            if(regDetails.email === null || regDetails.email === '')
                validateEmail(e);
            if (regDetails.password === null || regDetails.password === '' )
                validatePassword(e);
            if(regDetails.fName === null || regDetails.fName === '')
                validateFName(e);
        }
        else
        {
            const temp = validateDetails;
            temp.username = 'valid';
            temp.password = 'valid';
            temp.email = 'valid';
            temp.fName = 'valid';
            setValidateDetails(temp);
            
            const response = await fetch( signupUrl , {
                method : 'POST',
                body : JSON.stringify({
                    regDetails : regDetails
                }),
                headers : {
                    "Content-Type" : "application/json",
                }
            })
            .then(res => res.json())
            .then(JSON => {
                console.log(JSON);
                if(JSON === 'User saved successfully')
                {
                    dispatch(openLoginModal());
                    dispatch(closeSignupModal());
                }
                if(JSON === 'The user already exists')
                {
                    console.log('The user already exists');
                    // dispatch(openNotification());
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className={styles.wholeCont} onClick={e => dispatch(closeSignupModal())}>
            <div className={styles.cont} onClick={e => {e.stopPropagation() , setCurrRef('')}}>
                <h3 className={styles.registerText}>Registration</h3>
                <div className={styles.midCont}>
                    <div className={styles.midLCont}>
                        <label className={styles.usernameCont} onClick={e => {e.stopPropagation(),setCurrRef('curRefName')}} >
                            <input className={styles.usernameInput} name='fName' onChange={e => changeHandler(e)}
                                placeholder = {currRef === 'curRefName' ? null : 'full name'}
                            />
                            {validateDetails.fName === 'empty' ? <p className={styles.redWarningText}>Please enter full name</p> : null}
                            {currRef === 'curRefName' ? <h4 className={styles.usernameTitle}>full name</h4> : null}
                        </label>
                        <label className={styles.usernameCont} onClick={e => {e.stopPropagation(),setCurrRef('curRefUsername')}} >
                            <input className={styles.usernameInput} name='username' onChange={e => changeHandler(e)}
                                placeholder = {currRef === 'curRefUsername' ? null : 'username'}
                            />
                            {validateDetails.username === 'empty' ? <p className={styles.redWarningText}>Please enter username</p> : null}
                            {currRef ==='curRefUsername' ? <h4 className={styles.usernameTitle}>username</h4> : null}
                        </label>
                        <label className={styles.usernameCont} onClick={e => {e.stopPropagation(),setCurrRef('curRefEmail')}} >
                            <input className={styles.usernameInput} name='email' onChange={e => changeHandler(e)}
                                placeholder = {currRef === 'curRefEmail' ? null : 'email'}
                            />
                            {validateDetails.email === 'empty' ? <p className={styles.redWarningText}>Please enter email</p> : null}
                            {currRef === 'curRefEmail' ? <h4 className={styles.usernameTitle}>email</h4> : null}
                        </label>
                        <label className={styles.usernameCont} onClick={e => {e.stopPropagation(),setCurrRef('curRefPassword')}} >
                            <input  className={styles.usernameInput} name='password' onChange={e => changeHandler(e)}
                                placeholder = {currRef === 'curRefPassword' ? null : 'password'}
                            />
                            {validateDetails.password === 'empty' ? <p className={styles.redWarningText}>Please enter password</p> : null}
                            {currRef === 'curRefPassword' ? <h4 className={styles.usernameTitle}>password</h4> : null}
                        </label>
                        <label className={styles.usernameCont} onClick={e => {e.stopPropagation(),setCurrRef('curRefNumber')}} >
                            <input  className={styles.usernameInput} name='number' onChange={e => changeHandler(e)}
                                placeholder = {currRef === 'curRefNumber' ? null : 'number'}
                            />
                            {currRef === 'curRefNumber' /* || regDetails.number.number !== '' */
                                ? <h4 className={styles.usernameTitle}>number</h4> : null}
                        </label>
                    </div>
                    <p className={styles.orText}>--OR--</p>
                    <div className={styles.midRCont}>
                        {/* <h4 className={styles.authTitle}>Authentication</h4> */}
                        <div className={styles.eachAuthCont}>
                            <img src='/demoDpImg.png' className={styles.authImg}/>
                            <p className={styles.eachAuthText}>Google</p>
                        </div>
                        <div className={styles.eachAuthCont}>
                            <img src='/demoDpImg.png' className={styles.authImg}/>
                            <p className={styles.eachAuthText}>facebook</p>
                        </div>
                        {/* <div className={styles.eachAuthCont}>
                            <img src='/demoDpImg.png' className={styles.authImg}/>
                            <p className={styles.eachAuthText}>email</p>
                        </div> */}
                        <p className={styles.alreadyRegText}>Already registered?</p>
                        <div className={styles.loginCont}>
                            <p className={styles.loginContText} onClick={e => {dispatch(closeSignupModal()), dispatch(openLoginModal())}}>Login</p>
                        </div>
                    </div>
                </div>
                <button className={styles.submitButton} onClick={e => signupHandler(e)}>Submit</button>
            </div>
        </div>
    )
}