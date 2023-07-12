import { useState } from 'react';
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

export default function Layout({children}) {

    const dispatch = useDispatch();

    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isNotificationOpen} = useSelector(store => store.notificationModel);
    const {isSignupModalOpen} = useSelector(store => store.signupModal);
    const {isLoggedIn} = useSelector(store => store.loggedIn);

    const [loggedIn , setLoggedIn] = useState(isLoggedIn);

    const allHandlers = (e) => {
        dispatch(closeNotification());
        dispatch(closeSearchModal());
    }
    return(
        <div onClick={e => allHandlers(e)}>
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