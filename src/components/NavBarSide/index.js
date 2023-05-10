import {useEffect, useState , useRef} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import NavBarHome from '../NavBarHome';
import NavBarSearch from '../NavBarSearch';
import NavBarDashboard from '../NavBarDashboard';
import NavBarDp from '../NavBarDp';
import NavBarWriteBlog from '../NavBarWriteBlog';
import HoverToSeeName from '../HoverToSeeName';
import { useDispatch , useSelector } from 'react-redux';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import {setSelected , setHovered} from '../../features/modal/navbarSideSlice';
import { useRouter } from 'next/router';

export default function NavBarSide() {

    const dispatch = useDispatch();

    const {asPath} = useRouter();
    
    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {selected , hovered} = useSelector(store => store.navbarSideSlice);

    const [searchRes , setSearchRes] = useState([]);
    const [searchText , setSearchText] = useState('');

    const [dpHover , setDpHover] = useState(false);

    useEffect(() => {

        //for home icon
        if(asPath === ('/') || asPath.includes('/profile'))
        {
            dispatch(setSelected('home'));
            dispatch(setHovered('home'));
        }

        // if(asPath.includes('/profile'))
        // {
        //     dispatch(setSelected('home'));
        //     dispatch(setHovered('home'));
        // }

        //blog icon
        if(asPath.includes('/newblog') || asPath.includes('/myblogs'))
        {
            dispatch(setSelected('writeBlog'));
            dispatch(setHovered('writeBlog'));
        }

        // if(asPath.includes('/myblogs'))
        // {
        //     dispatch(setSelected('writeBlog'));
        //     dispatch(setHovered('writeBlog'));
        // }
    },[]);

    return (
        <div className={styles.sideCont} onMouseLeave={e => dispatch(setHovered(selected))}>
            <div className={styles.closed}>
                <Link href='/' className={`${selected === 'home' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                    onClick={e => dispatch(setSelected('home'))} 
                    onMouseEnter={e => dispatch(setHovered('home'))}>
                    <img src={selected === 'home' ?'/homeIcon-green.png' : '/homeIcon.png'} className={styles.eachMenuOptionImg} />
                    <HoverToSeeName name='Home'/>
                </Link>
                <div className={`${selected === 'dashboard' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                    onClick={e => dispatch(setSelected('dashboard'))} 
                    onMouseEnter={e => dispatch(setHovered('dashboard'))}>
                    <img src={selected === 'dashboard' ?'/dashboardIcon-green.png' : '/dashboardIcon.png'} className={styles.eachMenuOptionImg} />
                    <HoverToSeeName name='Dashboard'/>
                </div>
                <div className={`${selected === 'search' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                    onClick={e => dispatch(setSelected('search'))} 
                    onMouseEnter={e => dispatch(setHovered('search'))}>
                    <img src={selected === 'search' ?'/searchIcon-green.png' : '/searchIcon.png'} className={styles.eachMenuOptionImg} />
                    <HoverToSeeName name='Search'/>
                </div>
                <Link href='/mystories' className={`${selected === 'writeBlog' ? styles.eachMenuOptionContSelected : styles.eachMenuOptionContUnselected}`}
                    onClick={e => dispatch(setSelected('writeBlog'))} 
                    onMouseEnter={e => dispatch(setHovered('writeBlog'))}>
                    <img src={selected === 'writeBlog' ?'/writeBlogIcon-green.png' : '/writeBlogIcon.png'} className={styles.eachMenuOptionImg} />
                    <HoverToSeeName name='writeBlog'/>
                </Link>
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
                {hovered === 'home' && <NavBarHome />}
                {hovered === 'dashboard' && <NavBarDashboard />}
                {hovered === 'search' && <NavBarSearch setSearchRes={setSearchRes} setSearchText={setSearchText} 
                                                        searchRes={searchRes} searchText={searchText}/>}
                {hovered === 'writeBlog' && <NavBarWriteBlog />}
            </div>
        </div>
    )
}