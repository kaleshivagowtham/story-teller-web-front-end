import { useEffect, useState, useMemo } from 'react';
import styles from '../../../styles/Home.module.css';
import FooterComponent from "../FooterComponent";
import {closeNotification, openNotification} from '../../features/modal/notificationSlice';
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
import axios from 'axios';
import { routes } from '../../utils/routes';

export default function Layout({children}) {

    const checkLoginURL = `${routes.baseUrl}${routes.api.checkLogin}`;

    const dispatch = useDispatch();

    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isNotificationOpen} = useSelector(store => store.notificationModel);
    const {isSignupModalOpen} = useSelector(store => store.signupModal);
    const {isLoggedIn, jwt_auth_token} = useSelector(store => store.loggedIn);

    const [loggedIn , setLoggedIn] = useState(isLoggedIn);
    const [scrolled, setScrolled] = useState(0);
    const [jwt, setJwt] = useState();

    useEffect(() => {
        setJwt(useLocalStorage.getItemFromLocalStorage("jwt_auth_token"));
    },[jwt_auth_token]);

    useEffect(() => {
        const scrollListener = (e) => {
                setScrolled(window.scrollY);
        }

        document.addEventListener("scroll", scrollListener);
        return(() => {
            document.removeEventListener("scroll", scrollListener);
        })   
    })

    useEffect(() => {
        if(window !== undefined) {
            console.log(window.innerWidth)
        }
            
    },[])

    useMemo(() => {
        if(jwt === undefined)
            return;

        if(isLoggedIn === false) {
            axios.get(checkLoginURL , {
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
            }
            })
            .then(resp => {
                if(resp.data.message === 'loggedIn'){
                        dispatch(loginAction({username : resp.data.username}));
                        console.log("RESP: ",resp.data)
                    }
            })
            .catch(err => 
                console.log(err)
            );
        }
    },[jwt])

    const allHandlers = () => {
        dispatch(closeSearchModal());
    }

    useEffect(() => {
        return () => {
            <NotificationComponent message='Login Successful' />
        } 
    },[])

    return(
        <div onClick={e => allHandlers(e)} styles={{border:'3px solid red'}}>
            <Head>
                <title>StoryTeller</title>
                <link rel="logo icon" href="/logo.png" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Story Teller" />
                <meta name="keywords" content="blogs, creative, write, income, passive, novel, story, " />
                <meta name="author" content="Shiva Gowtham Kale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {/* <LoadingComponent /> */}
            <NavBarTop scrolled={scrolled}/>
            <NavBarSide />
            <NavBarShare />
            {   isLoginModalOpen && <LoginComponent />    }
            {   isSignupModalOpen && <SignupComponent />    }
            <div className={styles.layoutCont}>
                <main>{children}</main>
                {/* <main></main> */}
            </div>
            <FooterComponent />
        </div>
    )
}