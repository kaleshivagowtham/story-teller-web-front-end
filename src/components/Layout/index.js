import { useEffect, useState } from 'react';
import styles from '../../../styles/Home.module.css';
import FooterComponent from "../FooterComponent";
import {closeNotification} from '../../features/modal/notificationSlice';
import NavBarTop from '../NavBarTop';
import NavBarSide from '../NavBarSide';
import NavBarShare from '../NavBarShare';
import NotificationComponent from '../NotificationComponent';
import LoginComponent from '../../components/LoginComponent';
import { closeSearchModal } from '../../features/modal/searchModalSlice';
import SignupComponent from '../SignupComponent';
import { useDispatch , useSelector } from 'react-redux';
import LoadingComponent from '../LoadingComponent';
import Head from 'next/head';
import useLocalStorage from '../../utils/useLocalStorage';
import {loginAction, logoutAction} from '../../features/modal/loginSlice'

export default function Layout({children}) {

    const dispatch = useDispatch();

    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isNotificationOpen} = useSelector(store => store.notificationModel);
    const {isSignupModalOpen} = useSelector(store => store.signupModal);
    const {isLoggedIn} = useSelector(store => store.loggedIn);

    const [loggedIn , setLoggedIn] = useState(isLoggedIn);

    // console.log("Testing : ",useLocalStorage.getItemFromLocalStorage('jwt_auth_token'));

    useEffect(() => {
        const response = fetch( 'http://localhost:5000/checklogin' , {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                // "jwt_auth_token" : `${useLocalStorage.getItemFromLocalStorage('jwt_auth_token')}`,
                "jwt_auth_token" : 'eyJhbGciOiJIUzI1NiJ9.YWJjZA.NO9zN0CwFLP_MjtoPgqVnID8djMGGaXJhUcyZFxB8U8',
            }),
        })
        .then(res => res.json())
        .then((JSON) => {
            console.log(JSON.response);
            JSON.response === 'loggedIn'
            ? 
              dispatch(loginAction({'accessToken' : `${useLocalStorage.getItemFromLocalStorage('jwt_auth_token')}`}))
            :
              dispatch(logoutAction());
        })
    },[])

    const allHandlers = (e) => {
        dispatch(closeNotification());
        dispatch(closeSearchModal());
    }

    return(
        <div onClick={e => allHandlers(e)}>
            <Head>
                <title>StoryTeller</title>
                <link rel="logo icon" href="/logo.png" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Story Teller" />
                <meta name="keywords" content="HTML, CSS, JavaScript, 
                    ReactJs, NextJs, NodeJs, ExpressJs, MongoDb" />
                <meta name="author" content="Shiva Gowtham Kale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {/* <LoadingComponent /> */}
            <NavBarTop />
            <NavBarSide />
            <NavBarShare />
            { loggedIn ? <NotificationComponent message='Login Successful' isNotificationOpen={loggedIn} setIsNotificationOpen={setLoggedIn} /> : null}
            { isNotificationOpen && <NotificationComponent message='abcaaaaa aaaaaa aaaaaa aaaaaa aaa aaa' />}
            {   isLoginModalOpen && <LoginComponent />    }
            {   isSignupModalOpen && <SignupComponent />    }
            <div className={styles.layoutCont}>
                <main>{children}</main>
            </div>
            <FooterComponent />
        </div>
    )
}