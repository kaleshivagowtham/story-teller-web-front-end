import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import {closeSignupModal} from '../../features/modal/signupModalSlice';
import {openLoginModal} from '../../features/modal/loginModalSlice';
import { openNotification } from '../../features/modal/notificationSlice';
import useLocalStorage from '../../utils/useLocalStorage';

export default function SignupComponent() {

    const dispatch = useDispatch();

    const signupUrl = 'http://localhost:5000/signup';

    useEffect(() => {

    },[])

    const [currRef , setCurrRef] = useState('');
    const [regDetails , setRegDetails] = useState({'username' : '',
                                                    'email' : '',
                                                    'password' : '',
                                                    'fName' : '',
                                                    'number' : ''});
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
                if(JSON.status === 'User saved successfully')
                {
                    dispatch(openLoginModal());
                    dispatch(closeSignupModal());
                    useLocalStorage.setItemInLocalStorage({"key" : "jwt_auth_token",value : JSON.jwt_auth_token})
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
                        <label className={`${styles.inputCont} ${currRef === 'curRefName' || regDetails.fName !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefName')}} >
                            <input className={styles.inputBox} name='fName' onChange={e => changeHandler(e)}/>
                            {validateDetails.fName === 'empty' ? <p className={styles.redWarningText}>Please enter full name</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefName' || regDetails.fName !== '' ? styles.inputTitleClicked : ''}`}>full name</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefUserName' || regDetails.username !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefUserName')}} >
                            <input className={styles.inputBox} name='username' onChange={e => changeHandler(e)}/>
                            {validateDetails.username === 'empty' ? <p className={styles.redWarningText}>Please enter full name</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefUserName' || regDetails.username !== '' ? styles.inputTitleClicked : ''}`}>username</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefEmail' || regDetails.email !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefEmail')}} >
                            <input className={styles.inputBox} name='email' onChange={e => changeHandler(e)}/>
                            {validateDetails.email === 'empty' ? <p className={styles.redWarningText}>Please enter email</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefEmail' || regDetails.email !== '' ? styles.inputTitleClicked : ''}`}>email</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curRefPassword' || regDetails.password !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefPassword')}} >
                            <input  className={styles.inputBox} name='password' onChange={e => changeHandler(e)}/>
                            {validateDetails.password === 'empty' ? <p className={styles.redWarningText}>Please enter password</p> : null}
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefPassword' || regDetails.password !== '' ? styles.inputTitleClicked : ''}`}>password</h4>
                        </label>
                        <label className={`${styles.inputCont} ${currRef === 'curReNumber' || regDetails.number !== '' ? styles.inputContClicked : ''}`} onClick={e => {e.stopPropagation(),setCurrRef('curRefNumber')}} >
                            <input  className={styles.inputBox} name='number' onChange={e => changeHandler(e)}/>
                            <h4 className={`${styles.inputTitle} ${currRef === 'curRefNumber' || regDetails.number !== '' ? styles.inputTitleClicked : ''}`}>number</h4>
                        </label>
                    </div>
                    <p className={styles.orText}>--OR--</p>
                    <div className={styles.midRCont}>
                        {/* <h4 className={styles.authTitle}>Authentication</h4> */}
                        <div className={styles.eachAuthCont}>
                            <img src='/google_auth.png' className={styles.authImg}/>
                            <p className={styles.eachAuthText}>Google</p>
                        </div>
                        <div className={styles.eachAuthCont}>
                            <img src='/facebookLogo.png' className={styles.authImg} style={{backgroundColor:'#4267B2'}}/>
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