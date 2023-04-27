import {useEffect, useState , useRef} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import SearchComponent from '../SearchComponent/indix';
import NavBarShare from '../NavBarShare';
import NavBarHome from '../NavBarHome';
import NavBarDashboard from '../NavBarDashboard';
import NavBarDp from '../NavBarDp';
import HoverToSeeName from '../HoverToSeeName';
import { useDispatch , useSelector } from 'react-redux';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import {openNotification ,closeNotification } from '../../features/modal/notificationSlice';
import LoginComponent from '../LoginComponent';
import NotificationComponent from '../NotificationComponent';

export default function NavBar() {

    const dispatch = useDispatch();
    
    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isNotificationOpen} = useSelector(store => store.notificationModel);

    const [scrolled , setScrolled] = useState(false);
    const [openSearchModal , setOpenSearchModal] = useState(false);
    const [searchText , setSearchText] = useState('');
    const [selected , setSelected] = useState('home');

    const [dpHover , setDpHover] = useState(false);

    useEffect(() => {
        // dispatch(openNotification());
        
    },[]);

    if(typeof window !== undefined && window.scrollY > 100)
        setScrolled(true);

    return (
        <div className={styles.wholeCont} onClick={e => setOpenSearchModal(false)}>
            { isNotificationOpen && <NotificationComponent message='abcaaaaa aaaaaa aaaaaa aaaaaa aaa aaa' />}
            <NavBarShare />
            {   isLoginModalOpen && <LoginComponent />    }
            <div className={styles.topCont} style={{backgroundColor : scrolled ? "#ffffff" :"transparent"}}>
                <Link href='/' className={styles.logoCont}>
                    <img src='/logo.png' alt='logo'  className={styles.logoImg} />
                </Link>
                <Link href='/' className={styles.nameCont}>
                    <div className={styles.nameCont}>
                        <p className={styles.logoName}>StoryTeller</p>
                        <p className={styles.logoSlogan}>Show us what you got</p>
                    </div>
                </Link>

                <SearchComponent 
                    setOpenSearchModal={setOpenSearchModal}
                    openSearchModal={openSearchModal}
                    setSearchText={setSearchText}
                    searchText={searchText}
                />

            </div>
            <div className={styles.sideCont}>
                <div className={styles.closed}>
                    <div className={`${selected === 'home' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('home')}>
                        <img src={selected === 'home' ?'/homeIcon-green.png' : '/homeIcon.png'} className={styles.eachMenuOptionImg} />
                        <HoverToSeeName name='Home'/>
                    </div>
                    <div className={`${selected === 'dashboard' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('dashboard')}>
                        <img src={selected === 'dashboard' ?'/homeIcon-green.png' : '/homeIcon.png'} className={styles.eachMenuOptionImg} />
                        <HoverToSeeName name='Dashboard'/>
                    </div>
                    <div className={`${selected === 'search' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                        onClick={e => setSelected('search')}>
                        <img src={selected === 'search' ?'/searchIcon-green.png' : '/searchIcon.png'} className={styles.eachMenuOptionImg} />
                        <HoverToSeeName name='Search'/>
                    </div>
                    { 
                        isLoggedIn
                        ?
                            <div className={styles.bottomDpCont} onMouseEnter={e => setDpHover(true)}
                                        onMouseLeave={e => setDpHover(false)} >
                                <Link href="/profile" >
                                    <div className={styles.dpImgCont}>
                                        <img src='/demoDpImg.png' className={styles.dpImg} />
                                    </div>
                                </Link>
                                { dpHover && <NavBarDp /> }
                            </div>
                        :
                            <div className={styles.bottomDpCont} onClick={e => {e.stopPropagation();dispatch(openLoginModal())}} >
                                <img src='/loginIcon.png' className={styles.dpImg} />
                                <HoverToSeeName name='login/signup' />
                            </div>
                    }
                    
                </div>
                <div className={styles.opened}>
                    {selected === 'home' && <NavBarHome />}
                    {selected === 'dashboard' && <NavBarDashboard />}
                    {selected === 'search' && <NavBarHome />}
                </div>
            </div>
        </div>
    )
}