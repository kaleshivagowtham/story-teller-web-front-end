import {useEffect, useState , useRef} from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import SearchComponent from '../SearchComponent/indix';
import NavBarShare from '../NavBarShare';
import { useDispatch , useSelector } from 'react-redux';

export default function NavBarTop({scrolled}) {

    const dispatch = useDispatch();
    
    const [openSearchModal , setOpenSearchModal] = useState(false);
    const [searchText , setSearchText] = useState('');

    return (
        <div className={`${styles.wholeCont}`} onClick={e => setOpenSearchModal(false)} >
            {/* style={{backgroundColor : scrolled ? "#ffffff" :"transparent"}} */}
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
            <div className={styles.block}></div>
        </div>
    )
}